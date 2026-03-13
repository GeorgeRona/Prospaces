import { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import {
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  FileSpreadsheet,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getServerHeaders } from '../utils/server-headers';
import { filterFigmaProps } from './ui/utils';
// We will load ExcelJS from CDN
// import ExcelJS from 'exceljs';
declare global {
  interface Window {
    ExcelJS: any;
  }
}

interface UploadResult {
  sku: string;
  status: 'success' | 'error' | 'skipped';
  message: string;
  imageUrl?: string;
}

interface ExtractedImage {
  sku: string;
  blob: Blob;
  extension: string;
  rowIndex: number;
}

interface BulkUploadProps {
  organizationId: string;
  onComplete: () => void;
}

export function InventoryImageBulkUpload({ organizationId, onComplete }: BulkUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageColumn, setImageColumn] = useState('B'); // Default to column B
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [extractedImages, setExtractedImages] = useState<ExtractedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load ExcelJS from CDN to bypass Vite bundler Node.js polyfill issues
  useEffect(() => {
    if (!window.ExcelJS) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.name.match(/\.(xlsx|xlsm)$/i)) {
      toast.error('Please upload a valid Excel file (.xlsx, .xlsm)');
      return;
    }
    
    setSelectedFile(file);
    setResults([]);
    setShowResults(false);
    setExtractedImages([]);
  }, []);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setResults([]);
    setShowResults(false);
    setUploadProgress(0);
    setExtractedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const processExcelFile = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setExtractedImages([]);
    
    try {
      if (!window.ExcelJS) {
        throw new Error('ExcelJS library is still loading. Please try again in a moment.');
      }
      
      const buffer = await selectedFile.arrayBuffer();
      const workbook = new window.ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      
      const worksheet = workbook.worksheets[0]; // Assume first sheet
      if (!worksheet) {
        throw new Error('No worksheets found in the Excel file.');
      }

      const images = worksheet.getImages();
      const newExtractedImages: ExtractedImage[] = [];
      const targetColIdx = imageColumn.toUpperCase().charCodeAt(0) - 65; // A=0, B=1, etc.

      // Look through all images embedded in the sheet
      for (const image of images) {
        try {
          // Find the cell where this image is located
          if (!image.range || !image.range.tl) continue;
          
          const rowIdx = Math.floor(image.range.tl.nativeRow);
          const colIdx = Math.floor(image.range.tl.nativeCol);
          
          // Only process images in the specified column
          if (colIdx !== targetColIdx) continue;
          
          // Let's assume SKU is always in Column A (col index 1)
          const row = worksheet.getRow(rowIdx + 1); // exceljs rows are 1-based, nativeRow is 0-based
          const skuCell = row.getCell(1);
          let sku = skuCell.text || skuCell.value?.toString() || '';
          sku = sku.trim();
          
          if (!sku) continue;

          // Get actual image data
          const imgMedia = workbook.model.media?.find((m: any) => m.index === image.imageId);
          
          if (imgMedia && imgMedia.buffer) {
            const uint8Array = new Uint8Array(imgMedia.buffer);
            const extension = imgMedia.extension || 'png';
            let mimeType = `image/${extension}`;
            if (extension === 'jpg') mimeType = 'image/jpeg';
            
            const blob = new Blob([uint8Array], { type: mimeType });
            
            newExtractedImages.push({
              sku,
              blob,
              extension,
              rowIndex: rowIdx + 1
            });
          }
        } catch (err) {
          // Keep processing if one image fails
        }
      }

      setExtractedImages(newExtractedImages);
      if (newExtractedImages.length === 0) {
        toast.warning('No embedded images with SKUs found in Column A.');
      } else {
        toast.success(`Found ${newExtractedImages.length} images matching with SKUs.`);
      }

    } catch (error) {
      toast.error('Failed to parse Excel file. Ensure it contains embedded images.');
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadImages = async () => {
    if (extractedImages.length === 0) {
      toast.error('No images extracted to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setResults([]);
    
    const uploadResults: UploadResult[] = [];
    const totalFiles = extractedImages.length;
    let completed = 0;
    const CONCURRENCY = 5; // Process 5 uploads at a time

    for (let i = 0; i < extractedImages.length; i += CONCURRENCY) {
      const batch = extractedImages.slice(i, i + CONCURRENCY);
      
      const batchPromises = batch.map(async (imgData) => {
        const { sku, blob, extension } = imgData;
        
        try {
          const formData = new FormData();
          formData.append('file', blob, `${sku}.${extension}`);
          formData.append('sku', sku);
          formData.append('organizationId', organizationId);

          const headers = await getServerHeaders();
          delete headers['Content-Type']; // Let browser set multipart/form-data with boundary

          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-8405be07/inventory-image-upload`,
            {
              method: 'POST',
              headers,
              body: formData,
            }
          );

          const result = await response.json();

          if (response.ok && result.success) {
            uploadResults.push({
              sku,
              status: 'success',
              message: result.message || 'Image uploaded successfully',
              imageUrl: result.imageUrl,
            });
          } else {
            uploadResults.push({
              sku,
              status: 'error',
              message: result.error || 'Upload failed',
            });
          }
        } catch (error) {
          uploadResults.push({
            sku,
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error',
          });
        }
        
        completed++;
      });

      await Promise.all(batchPromises);
      setUploadProgress(Math.round((completed / totalFiles) * 100));
      setResults([...uploadResults]);
    }

    setIsUploading(false);
    setShowResults(true);

    const successCount = uploadResults.filter(r => r.status === 'success').length;
    const errorCount = uploadResults.filter(r => r.status === 'error').length;
    
    if (successCount > 0 && errorCount === 0) {
      toast.success(`Successfully uploaded ${successCount} image(s)`);
      onComplete();
    } else if (successCount > 0) {
      toast.error(`Uploaded ${successCount} image(s), ${errorCount} failed`);
      onComplete();
    } else {
      toast.error(`All ${errorCount} upload(s) failed`);
    }
  };

  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet {...filterFigmaProps({ className: "h-5 w-5" })} />
          Excel Image Extractor
        </CardTitle>
        <CardDescription>
          Upload an Excel file with SKUs in Column A and embedded images in any other column on the same row.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructions */}
        <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <ImageIcon {...filterFigmaProps({ className: "h-4 w-4 text-blue-600 dark:text-blue-400" })} />
          <AlertDescription className="text-blue-900 dark:text-blue-100">
            <strong>Format Requirements:</strong>
            <ul className="list-disc list-inside mt-1 text-sm">
              <li>SKU must be exactly in <strong>Column A</strong></li>
              <li>Images must be <strong>embedded over the cells</strong> in the specified column</li>
              <li>Only <code>.xlsx</code> or <code>.xlsm</code> formats supported</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="flex items-center gap-4 py-2">
          <label className="text-sm font-medium whitespace-nowrap">Image Column:</label>
          <select 
            value={imageColumn}
            onChange={(e) => setImageColumn(e.target.value)}
            className="flex h-9 w-24 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            {['B', 'C', 'D', 'E', 'F', 'G', 'H'].map(col => (
              <option key={col} value={col}>Column {col}</option>
            ))}
          </select>
        </div>

        {/* File Selection */}
        {!selectedFile ? (
          <div>
            <label
              htmlFor="excel-image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload {...filterFigmaProps({ className: "h-8 w-8 mb-2 text-gray-500" })} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Excel Workbook (.xlsx)
                </p>
              </div>
              <input
                id="excel-image-upload"
                type="file"
                className="hidden"
                accept=".xlsx,.xlsm"
                onChange={handleFileSelect}
                ref={fileInputRef}
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 min-w-0">
                <FileSpreadsheet {...filterFigmaProps({ className: "h-8 w-8 text-green-600 shrink-0" })} />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFile}
                disabled={isProcessing || isUploading}
              >
                <X {...filterFigmaProps({ className: "h-4 w-4" })} />
              </Button>
            </div>

            {extractedImages.length === 0 && !isProcessing && (
              <Button 
                onClick={processExcelFile} 
                className="w-full"
                disabled={isProcessing}
              >
                Scan Excel File for Images
              </Button>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-4 space-y-2">
                <Loader2 {...filterFigmaProps({ className: "h-6 w-6 animate-spin text-primary" })} />
                <p className="text-sm text-gray-500">Scanning Excel file for images...</p>
              </div>
            )}

            {extractedImages.length > 0 && !showResults && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    Found {extractedImages.length} Image(s)
                  </h4>
                </div>
                
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {extractedImages.map((img, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded"
                    >
                      <div className="flex-1 min-w-0 flex items-center gap-3">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden shrink-0">
                          <ImageIcon {...filterFigmaProps({ className: "h-4 w-4 text-gray-400" })} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">SKU: {img.sku}</p>
                          <p className="text-xs text-gray-500">
                            Row {img.rowIndex} • {(img.blob.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={uploadImages}
                  disabled={isUploading}
                  className="w-full"
                >
                  {isUploading ? (
                    <>
                      <Loader2 {...filterFigmaProps({ className: "mr-2 h-4 w-4 animate-spin" })} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload {...filterFigmaProps({ className: "mr-2 h-4 w-4" })} />
                      Upload {extractedImages.length} Images to Inventory
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Uploading images...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {/* Upload Results */}
        {showResults && results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Upload Results</h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-600 dark:text-green-400">
                  <CheckCircle2 {...filterFigmaProps({ className: "h-3 w-3 inline mr-1" })} />
                  {successCount} success
                </span>
                {errorCount > 0 && (
                  <span className="text-red-600 dark:text-red-400">
                    <XCircle {...filterFigmaProps({ className: "h-3 w-3 inline mr-1" })} />
                    {errorCount} failed
                  </span>
                )}
              </div>
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-1">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start justify-between p-2 rounded ${
                    result.status === 'success'
                      ? 'bg-green-50 dark:bg-green-950'
                      : 'bg-red-50 dark:bg-red-950'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">SKU: {result.sku}</p>
                    <p className="text-xs mt-1">{result.message}</p>
                  </div>
                  <div className="ml-2 mt-0.5">
                    {result.status === 'success' ? (
                      <CheckCircle2 {...filterFigmaProps({ className: "h-4 w-4 text-green-600 dark:text-green-400" })} />
                    ) : (
                      <XCircle {...filterFigmaProps({ className: "h-4 w-4 text-red-600 dark:text-red-400" })} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={clearFile} variant="outline" className="flex-1">
                Upload Another File
              </Button>
              <Button onClick={onComplete} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
