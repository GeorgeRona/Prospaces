import type { DormerConfig, DormerStyle, LShapeConfig, LShapeWingPosition, TShapeConfig, TShapeWingSide, UShapeConfig, UShapeWingSide, RoofConfig } from '../../types/roof';
import { Plus, Trash2, Home } from 'lucide-react';

interface RoofConfiguratorProps {
  config: RoofConfig;
  onChange: (config: RoofConfig) => void;
}

export function RoofConfigurator({ config, onChange }: RoofConfiguratorProps) {
  const updateConfig = (updates: Partial<RoofConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
      <h2 className="text-slate-900 mb-4">Roof Configuration</h2>
      
      <div className="space-y-4">
        {/* Building Dimensions */}
        <div>
          <h3 className="text-slate-900 text-sm mb-3">Building Dimensions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 text-sm mb-1">
                Length (ft)
              </label>
              <input
                type="number"
                min="10"
                max="200"
                step="1"
                value={config.length}
                onChange={(e) => updateConfig({ length: parseFloat(e.target.value) || 40 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-sm mb-1">
                Width (ft)
              </label>
              <input
                type="number"
                min="10"
                max="200"
                step="1"
                value={config.width}
                onChange={(e) => updateConfig({ width: parseFloat(e.target.value) || 30 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Roof Style */}
        <div>
          <label className="block text-slate-700 text-sm mb-2">
            Roof Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => updateConfig({ style: 'gable' })}
              className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm ${
                config.style === 'gable'
                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              Gable
            </button>
            <button
              onClick={() => updateConfig({ style: 'hip' })}
              className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm ${
                config.style === 'hip'
                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              Hip
            </button>
            <button
              onClick={() => updateConfig({ style: 'gambrel' })}
              className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm ${
                config.style === 'gambrel'
                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              Gambrel
            </button>
            <button
              onClick={() => updateConfig({ style: 'shed' })}
              className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm ${
                config.style === 'shed'
                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              Shed
            </button>
            <button
              onClick={() => updateConfig({ style: 'mansard' })}
              className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm ${
                config.style === 'mansard'
                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              Mansard
            </button>
            <button
              onClick={() => updateConfig({ style: 'flat' })}
              className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm ${
                config.style === 'flat'
                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              Flat
            </button>
            <button
              onClick={() => updateConfig({ 
                style: 'l-shaped',
                lShapeConfig: config.lShapeConfig || {
                  wingLength: 20,
                  wingWidth: 20,
                  wingPosition: 'back-right',
                  wingRoofStyle: 'gable',
                },
                hasValleys: true,
                valleyCount: (config.valleyCount || 0) < 2 ? 2 : config.valleyCount,
              })}
              className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm col-span-2 ${
                config.style === 'l-shaped'
                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              L-Shaped
            </button>
            <button
              onClick={() => updateConfig({ 
                style: 't-shaped',
                tShapeConfig: config.tShapeConfig || {
                  wingLength: 20,
                  wingWidth: 20,
                  wingSide: 'right',
                  wingRoofStyle: 'gable',
                },
                hasValleys: true,
                valleyCount: (config.valleyCount || 0) < 2 ? 2 : config.valleyCount,
              })}
              className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm col-span-2 ${
                config.style === 't-shaped'
                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              T-Shaped
            </button>
            <button
              onClick={() => updateConfig({ 
                style: 'u-shaped',
                uShapeConfig: config.uShapeConfig || {
                  wingLength: 20,
                  wingWidth: 20,
                  wingSide: 'left-right',
                  wingRoofStyle: 'gable',
                },
                hasValleys: true,
                valleyCount: (config.valleyCount || 0) < 2 ? 2 : config.valleyCount,
              })}
              className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm col-span-2 ${
                config.style === 'u-shaped'
                  ? 'border-orange-600 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400'
              }`}
            >
              U-Shaped
            </button>
          </div>
        </div>

        {/* L-Shaped Wing Configuration */}
        {config.style === 'l-shaped' && (
          <div className="border border-orange-200 rounded-lg p-3 bg-orange-50/50 space-y-3">
            <h3 className="text-slate-900 text-sm font-medium flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-orange-600">
                <path d="M2 2h5v12H2V2zm5 7h7v5H7V9z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              L-Shape Wing Section
            </h3>
            <p className="text-xs text-slate-500">
              The main section uses Length & Width above. Configure the wing that extends from it to form the L-shape.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 text-xs mb-1">Wing Length (ft)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  step="1"
                  value={config.lShapeConfig?.wingLength || 20}
                  onChange={(e) => updateConfig({
                    lShapeConfig: {
                      ...(config.lShapeConfig || { wingLength: 20, wingWidth: 20, wingPosition: 'back-right', wingRoofStyle: 'gable' }),
                      wingLength: parseFloat(e.target.value) || 20,
                    }
                  })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-slate-600 text-xs mb-1">Wing Width (ft)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  step="1"
                  value={config.lShapeConfig?.wingWidth || 20}
                  onChange={(e) => updateConfig({
                    lShapeConfig: {
                      ...(config.lShapeConfig || { wingLength: 20, wingWidth: 20, wingPosition: 'back-right', wingRoofStyle: 'gable' }),
                      wingWidth: parseFloat(e.target.value) || 20,
                    }
                  })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 text-xs mb-1">Wing Position</label>
              <div className="grid grid-cols-2 gap-1">
                {(['front-right', 'front-left', 'back-right', 'back-left'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => updateConfig({
                      lShapeConfig: {
                        ...(config.lShapeConfig || { wingLength: 20, wingWidth: 20, wingPosition: 'back-right', wingRoofStyle: 'gable' }),
                        wingPosition: pos,
                      }
                    })}
                    className={`px-2 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                      (config.lShapeConfig?.wingPosition || 'back-right') === pos
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {pos.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Which corner of the main section does the wing extend from
              </p>
            </div>

            <div>
              <label className="block text-slate-600 text-xs mb-1">Wing Roof Style</label>
              <div className="flex gap-1">
                {(['gable', 'hip'] as const).map((rs) => (
                  <button
                    key={rs}
                    onClick={() => updateConfig({
                      lShapeConfig: {
                        ...(config.lShapeConfig || { wingLength: 20, wingWidth: 20, wingPosition: 'back-right', wingRoofStyle: 'gable' }),
                        wingRoofStyle: rs,
                      }
                    })}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                      (config.lShapeConfig?.wingRoofStyle || 'gable') === rs
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {rs}
                  </button>
                ))}
              </div>
            </div>

            {config.lShapeConfig && (
              <div className="text-xs text-slate-500 bg-blue-50 p-2 rounded border border-blue-100">
                <strong>Main:</strong> {config.length}' x {config.width}' = {(config.length * config.width).toLocaleString()} sq ft
                <br />
                <strong>Wing:</strong> {config.lShapeConfig.wingLength}' x {config.lShapeConfig.wingWidth}' = {(config.lShapeConfig.wingLength * config.lShapeConfig.wingWidth).toLocaleString()} sq ft
                <br />
                <strong>Combined flat area:</strong> {((config.length * config.width) + (config.lShapeConfig.wingLength * config.lShapeConfig.wingWidth)).toLocaleString()} sq ft
              </div>
            )}
          </div>
        )}

        {/* T-Shaped Wing Configuration */}
        {config.style === 't-shaped' && (
          <div className="border border-orange-200 rounded-lg p-3 bg-orange-50/50 space-y-3">
            <h3 className="text-slate-900 text-sm font-medium flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-orange-600">
                <path d="M2 2h5v12H2V2zm5 7h7v5H7V9z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              T-Shape Wing Section
            </h3>
            <p className="text-xs text-slate-500">
              The main section uses Length & Width above. Configure the wing that extends from it to form the T-shape.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 text-xs mb-1">Wing Length (ft)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  step="1"
                  value={config.tShapeConfig?.wingLength || 20}
                  onChange={(e) => updateConfig({
                    tShapeConfig: {
                      ...(config.tShapeConfig || { wingLength: 20, wingWidth: 20, wingSide: 'right', wingRoofStyle: 'gable' }),
                      wingLength: parseFloat(e.target.value) || 20,
                    }
                  })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-slate-600 text-xs mb-1">Wing Width (ft)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  step="1"
                  value={config.tShapeConfig?.wingWidth || 20}
                  onChange={(e) => updateConfig({
                    tShapeConfig: {
                      ...(config.tShapeConfig || { wingLength: 20, wingWidth: 20, wingSide: 'right', wingRoofStyle: 'gable' }),
                      wingWidth: parseFloat(e.target.value) || 20,
                    }
                  })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 text-xs mb-1">Wing Side</label>
              <div className="grid grid-cols-2 gap-1">
                {(['front', 'back', 'left', 'right'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => updateConfig({
                      tShapeConfig: {
                        ...(config.tShapeConfig || { wingLength: 20, wingWidth: 20, wingSide: 'right', wingRoofStyle: 'gable' }),
                        wingSide: pos,
                      }
                    })}
                    className={`px-2 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                      (config.tShapeConfig?.wingSide || 'right') === pos
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Which side of the main section does the wing extend from (centered)
              </p>
            </div>

            <div>
              <label className="block text-slate-600 text-xs mb-1">Wing Roof Style</label>
              <div className="flex gap-1">
                {(['gable', 'hip'] as const).map((rs) => (
                  <button
                    key={rs}
                    onClick={() => updateConfig({
                      tShapeConfig: {
                        ...(config.tShapeConfig || { wingLength: 20, wingWidth: 20, wingSide: 'right', wingRoofStyle: 'gable' }),
                        wingRoofStyle: rs,
                      }
                    })}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                      (config.tShapeConfig?.wingRoofStyle || 'gable') === rs
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {rs}
                  </button>
                ))}
              </div>
            </div>

            {config.tShapeConfig && (
              <div className="text-xs text-slate-500 bg-blue-50 p-2 rounded border border-blue-100">
                <strong>Main:</strong> {config.length}' x {config.width}' = {(config.length * config.width).toLocaleString()} sq ft
                <br />
                <strong>Wing:</strong> {config.tShapeConfig.wingLength}' x {config.tShapeConfig.wingWidth}' = {(config.tShapeConfig.wingLength * config.tShapeConfig.wingWidth).toLocaleString()} sq ft
                <br />
                <strong>Combined flat area:</strong> {((config.length * config.width) + (config.tShapeConfig.wingLength * config.tShapeConfig.wingWidth)).toLocaleString()} sq ft
              </div>
            )}
          </div>
        )}

        {/* U-Shaped Wing Configuration */}
        {config.style === 'u-shaped' && (
          <div className="border border-orange-200 rounded-lg p-3 bg-orange-50/50 space-y-3">
            <h3 className="text-slate-900 text-sm font-medium flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-orange-600">
                <path d="M2 2h5v12H2V2zm5 7h7v5H7V9z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              U-Shape Wings (x2)
            </h3>
            <p className="text-xs text-slate-500">
              Two symmetrical wings extend from opposite ends of the main section, forming a U-shape courtyard.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 text-xs mb-1">Each Wing Length (ft)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  step="1"
                  value={config.uShapeConfig?.wingLength || 20}
                  onChange={(e) => updateConfig({
                    uShapeConfig: {
                      ...(config.uShapeConfig || { wingLength: 20, wingWidth: 20, wingSide: 'left-right', wingRoofStyle: 'gable' }),
                      wingLength: parseFloat(e.target.value) || 20,
                    }
                  })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-slate-600 text-xs mb-1">Each Wing Width (ft)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  step="1"
                  value={config.uShapeConfig?.wingWidth || 20}
                  onChange={(e) => updateConfig({
                    uShapeConfig: {
                      ...(config.uShapeConfig || { wingLength: 20, wingWidth: 20, wingSide: 'left-right', wingRoofStyle: 'gable' }),
                      wingWidth: parseFloat(e.target.value) || 20,
                    }
                  })}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 text-xs mb-1">Wings Extend From</label>
              <div className="grid grid-cols-2 gap-1">
                {(['left-right', 'front-back'] as const).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => updateConfig({
                      uShapeConfig: {
                        ...(config.uShapeConfig || { wingLength: 20, wingWidth: 20, wingSide: 'left-right', wingRoofStyle: 'gable' }),
                        wingSide: pos,
                      }
                    })}
                    className={`px-2 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                      (config.uShapeConfig?.wingSide || 'left-right') === pos
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {pos === 'left-right' ? 'Left & Right' : 'Front & Back'}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Two wings extend from opposite sides to form the U-shape courtyard
              </p>
            </div>

            <div>
              <label className="block text-slate-600 text-xs mb-1">Wing Roof Style</label>
              <div className="flex gap-1">
                {(['gable', 'hip'] as const).map((rs) => (
                  <button
                    key={rs}
                    onClick={() => updateConfig({
                      uShapeConfig: {
                        ...(config.uShapeConfig || { wingLength: 20, wingWidth: 20, wingSide: 'left-right', wingRoofStyle: 'gable' }),
                        wingRoofStyle: rs,
                      }
                    })}
                    className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                      (config.uShapeConfig?.wingRoofStyle || 'gable') === rs
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {rs}
                  </button>
                ))}
              </div>
            </div>

            {config.uShapeConfig && (
              <div className="text-xs text-slate-500 bg-blue-50 p-2 rounded border border-blue-100">
                <strong>Main:</strong> {config.length}' x {config.width}' = {(config.length * config.width).toLocaleString()} sq ft
                <br />
                <strong>Each Wing:</strong> {config.uShapeConfig.wingLength}' x {config.uShapeConfig.wingWidth}' = {(config.uShapeConfig.wingLength * config.uShapeConfig.wingWidth).toLocaleString()} sq ft
                <br />
                <strong>Combined flat area:</strong> {((config.length * config.width) + (config.uShapeConfig.wingLength * config.uShapeConfig.wingWidth * 2)).toLocaleString()} sq ft
              </div>
            )}
          </div>
        )}

        {/* Roof Pitch */}
        <div>
          <label className="block text-slate-700 text-sm mb-1">
            Roof Pitch
          </label>
          <select
            value={config.pitch}
            onChange={(e) => updateConfig({ pitch: e.target.value as any })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
          >
            <option value="2/12">2/12 (9.5°) - Shallow</option>
            <option value="3/12">3/12 (14°) - Low</option>
            <option value="4/12">4/12 (18.5°) - Standard</option>
            <option value="5/12">5/12 (22.5°) - Standard</option>
            <option value="6/12">6/12 (26.5°) - Common</option>
            <option value="7/12">7/12 (30°) - Steep</option>
            <option value="8/12">8/12 (33.5°) - Steep</option>
            <option value="9/12">9/12 (37°) - Very Steep</option>
            <option value="10/12">10/12 (40°) - Very Steep</option>
            <option value="12/12">12/12 (45°) - Extreme</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">
            Higher pitch = steeper roof, more materials needed
          </p>
        </div>

        {/* Overhangs */}
        <div>
          <h3 className="text-slate-900 text-sm mb-3">Overhangs</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 text-sm mb-1">
                Eave Overhang (ft)
              </label>
              <input
                type="number"
                min="0"
                max="4"
                step="0.5"
                value={config.eaveOverhang}
                onChange={(e) => updateConfig({ eaveOverhang: parseFloat(e.target.value) || 1.5 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-sm mb-1">
                Rake Overhang (ft)
              </label>
              <input
                type="number"
                min="0"
                max="4"
                step="0.5"
                value={config.rakeOverhang}
                onChange={(e) => updateConfig({ rakeOverhang: parseFloat(e.target.value) || 1.5 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Typical overhang is 1-2 feet
          </p>
        </div>

        {/* Shingle Type */}
        <div>
          <label className="block text-slate-700 text-sm mb-1">
            Shingle Type
          </label>
          <select
            value={config.shingleType}
            onChange={(e) => updateConfig({ shingleType: e.target.value as any })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
          >
            <option value="architectural">Architectural (Dimensional)</option>
            <option value="3-tab">3-Tab Asphalt</option>
            <option value="designer">Designer/Premium</option>
            <option value="metal">Metal Roofing</option>
            <option value="cedar-shake">Cedar Shake</option>
          </select>
        </div>

        {/* Underlayment Type */}
        <div>
          <label className="block text-slate-700 text-sm mb-1">
            Underlayment Type
          </label>
          <select
            value={config.underlaymentType}
            onChange={(e) => updateConfig({ underlaymentType: e.target.value as any })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
          >
            <option value="synthetic">Synthetic (Recommended)</option>
            <option value="felt-15">#15 Felt Paper</option>
            <option value="felt-30">#30 Felt Paper</option>
            <option value="ice-and-water">Ice & Water Shield (Full Coverage)</option>
          </select>
        </div>

        {/* Valleys */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.hasValleys || false}
              onChange={(e) => updateConfig({ 
                hasValleys: e.target.checked,
                valleyCount: e.target.checked ? (config.valleyCount || 2) : 0
              })}
              className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-slate-700 text-sm">Has Valleys</span>
          </label>
          
          {config.hasValleys && (
            <div>
              <label className="block text-slate-700 text-sm mb-1">
                Number of Valleys
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={config.valleyCount || 2}
                onChange={(e) => updateConfig({ valleyCount: parseInt(e.target.value) || 2 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
              />
            </div>
          )}
        </div>

        {/* Skylights */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.hasSkylight || false}
              onChange={(e) => updateConfig({ 
                hasSkylight: e.target.checked,
                skylightCount: e.target.checked ? (config.skylightCount || 1) : 0
              })}
              className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-slate-700 text-sm">Has Skylights</span>
          </label>
          
          {config.hasSkylight && (
            <div>
              <label className="block text-slate-700 text-sm mb-1">
                Number of Skylights
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={config.skylightCount || 1}
                onChange={(e) => updateConfig({ skylightCount: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
              />
            </div>
          )}
        </div>

        {/* Chimneys */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.hasChimney || false}
              onChange={(e) => updateConfig({ 
                hasChimney: e.target.checked,
                chimneyCount: e.target.checked ? (config.chimneyCount || 1) : 0
              })}
              className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-slate-700 text-sm">Has Chimneys</span>
          </label>
          
          {config.hasChimney && (
            <div>
              <label className="block text-slate-700 text-sm mb-1">
                Number of Chimneys
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={config.chimneyCount || 1}
                onChange={(e) => updateConfig({ chimneyCount: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
              />
            </div>
          )}
        </div>

        {/* Dormers */}
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.hasDormers || false}
              onChange={(e) => updateConfig({
                hasDormers: e.target.checked,
                dormers: e.target.checked ? (config.dormers?.length ? config.dormers : []) : []
              })}
              className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-slate-700 text-sm font-medium">Has Dormers</span>
          </label>

          {config.hasDormers && (
            <div className="space-y-3 pl-1">
              <p className="text-xs text-slate-500">
                Add dormers to your roof — structures that project from the slope to add light and space.
              </p>

              {/* Dormer List */}
              {(config.dormers || []).map((dormer, index) => (
                <div key={dormer.id} className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-slate-700">
                        Dormer {index + 1}
                      </span>
                      <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded capitalize">
                        {dormer.style}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const updated = (config.dormers || []).filter(d => d.id !== dormer.id);
                        updateConfig({ dormers: updated });
                      }}
                      className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Dormer Style */}
                  <div>
                    <label className="block text-slate-600 text-xs mb-1">Type</label>
                    <select
                      value={dormer.style}
                      onChange={(e) => {
                        const updated = (config.dormers || []).map(d =>
                          d.id === dormer.id ? { ...d, style: e.target.value as DormerStyle } : d
                        );
                        updateConfig({ dormers: updated });
                      }}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="gable">Gable Dormer</option>
                      <option value="shed">Shed Dormer</option>
                      <option value="hip">Hip Dormer</option>
                      <option value="eyebrow">Eyebrow Dormer</option>
                      <option value="flat">Flat Dormer</option>
                    </select>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {dormer.style === 'gable' && 'Most common — triangular roof with two slopes meeting at a ridge.'}
                      {dormer.style === 'shed' && 'Single sloped roof, great for maximizing interior space.'}
                      {dormer.style === 'hip' && 'Three-sided sloped roof — blends well with hip roofs.'}
                      {dormer.style === 'eyebrow' && 'Curved, wave-like projection — decorative and distinctive.'}
                      {dormer.style === 'flat' && 'Flat roof extension — modern look with simple framing.'}
                    </p>
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-slate-600 text-xs mb-1">Width (ft)</label>
                      <input
                        type="number"
                        min="2"
                        max="12"
                        step="0.5"
                        value={dormer.width}
                        onChange={(e) => {
                          const updated = (config.dormers || []).map(d =>
                            d.id === dormer.id ? { ...d, width: parseFloat(e.target.value) || 4 } : d
                          );
                          updateConfig({ dormers: updated });
                        }}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs mb-1">Height (ft)</label>
                      <input
                        type="number"
                        min="2"
                        max="8"
                        step="0.5"
                        value={dormer.height}
                        onChange={(e) => {
                          const updated = (config.dormers || []).map(d =>
                            d.id === dormer.id ? { ...d, height: parseFloat(e.target.value) || 4 } : d
                          );
                          updateConfig({ dormers: updated });
                        }}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs mb-1">Depth (ft)</label>
                      <input
                        type="number"
                        min="2"
                        max="10"
                        step="0.5"
                        value={dormer.depth}
                        onChange={(e) => {
                          const updated = (config.dormers || []).map(d =>
                            d.id === dormer.id ? { ...d, depth: parseFloat(e.target.value) || 4 } : d
                          );
                          updateConfig({ dormers: updated });
                        }}
                        className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Position & Side */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 text-xs mb-1">
                        Horizontal Position
                      </label>
                      <div className="flex gap-1">
                        {(['left', 'center', 'right'] as const).map((pos) => (
                          <button
                            key={pos}
                            onClick={() => {
                              const updated = (config.dormers || []).map(d =>
                                d.id === dormer.id ? { ...d, horizontalPosition: pos } : d
                              );
                              updateConfig({ dormers: updated });
                            }}
                            className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                              dormer.horizontalPosition === pos
                                ? 'bg-orange-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {pos}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-600 text-xs mb-1">Roof Slope</label>
                      <div className="flex gap-1">
                        {(['front', 'back'] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              const updated = (config.dormers || []).map(d =>
                                d.id === dormer.id ? { ...d, side: s } : d
                              );
                              updateConfig({ dormers: updated });
                            }}
                            className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                              dormer.side === s
                                ? 'bg-orange-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Window Toggle */}
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={dormer.hasWindow}
                      onChange={(e) => {
                        const updated = (config.dormers || []).map(d =>
                          d.id === dormer.id ? { ...d, hasWindow: e.target.checked } : d
                        );
                        updateConfig({ dormers: updated });
                      }}
                      className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-slate-600 text-xs">Include window</span>
                  </label>
                </div>
              ))}

              {/* Add Dormer Button */}
              <button
                onClick={() => {
                  const newDormer: DormerConfig = {
                    id: Math.random().toString(36).substring(2, 9),
                    style: 'gable',
                    width: 4,
                    height: 4,
                    depth: 5,
                    horizontalPosition: 'center',
                    side: 'front',
                    hasWindow: true,
                  };
                  updateConfig({
                    dormers: [...(config.dormers || []), newDormer]
                  });
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Dormer
              </button>

              {(config.dormers || []).length > 0 && (
                <p className="text-xs text-slate-500 bg-blue-50 p-2 rounded border border-blue-100">
                  <strong>{(config.dormers || []).length}</strong> dormer{(config.dormers || []).length !== 1 ? 's' : ''} configured.
                  Each dormer adds roofing area, flashing, framing, and window materials.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Waste Factor */}
        <div>
          <label className="block text-slate-700 text-sm mb-1">
            Waste Factor: {(config.wasteFactor * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="5"
            max="20"
            step="1"
            value={config.wasteFactor * 100}
            onChange={(e) => updateConfig({ wasteFactor: parseInt(e.target.value) / 100 })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>5%</span>
            <span>10% (Standard)</span>
            <span>15%</span>
            <span>20%</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Add extra materials for cuts, waste, and mistakes
          </p>
        </div>
      </div>
    </div>
  );
}