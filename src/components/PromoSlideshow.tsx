import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Play, Pause, ChevronRight, ChevronLeft, X, ArrowRight, DollarSign, TrendingUp, Briefcase, Activity } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { DealsKanban } from './DealsKanban';

// Lazy load 3D renderers to keep the bundle size small
const LazyKitchen3D = React.lazy(() => import('./kitchen/Kitchen3DRenderer').then(m => ({ default: m.Kitchen3DRenderer })));
const LazyDeck3D = React.lazy(() => import('./deck/Deck3DRenderer').then(m => ({ default: m.Deck3DRenderer })));
const LazyGarage3D = React.lazy(() => import('./garage/Garage3DRenderer').then(m => ({ default: m.Garage3DRenderer })));

// --- MOCK DATA FOR SCREENS ---
const mockQuotes: any[] = [
  { id: '1', title: 'Smith Kitchen Remodel', status: 'sent', total: 24500, contactName: 'John Smith', createdAt: new Date().toISOString() },
  { id: '2', title: 'Johnson Deck Addition', status: 'accepted', total: 8200, contactName: 'Alice Johnson', createdAt: new Date().toISOString() },
  { id: '3', title: 'Williams Garage', status: 'draft', total: 42000, contactName: 'Robert Williams', createdAt: new Date().toISOString() },
  { id: '4', title: 'Davis Roof', status: 'completed', total: 12400, contactName: 'Mary Davis', createdAt: new Date().toISOString() },
];

const mockKitchenConfig: any = {
  roomWidth: 12, roomLength: 14, roomHeight: 8, layoutStyle: 'L-shape',
  cabinets: [
    { id: '1', type: 'base', width: 36, depth: 24, height: 34.5, x: 24, y: 0, rotation: 0, wall: 'north' }
  ], 
  appliances: [], countertops: [],
  cabinetFinish: 'Oak', countertopMaterial: 'Granite',
  hasIsland: true, hasPantry: false, hasBacksplash: false,
  gridSize: 12, showGrid: true, viewMode: '3D', unit: 'feet'
};

const mockDeckConfig: any = {
  width: 16, length: 20, height: 3, shape: 'rectangle',
  hasStairs: true, stairSide: 'front', railingSides: ['left', 'right', 'front'],
  railingStyle: 'Treated', deckingPattern: 'perpendicular', joistSpacing: 16,
  deckingType: 'Composite', unit: 'feet'
};

const mockGarageConfig: any = {
  width: 24, length: 24, height: 10,
  bays: 2, roofStyle: 'gable', roofPitch: 6, wallFraming: '2x4',
  doors: [
    { id: '1', type: 'overhead', width: 9, height: 8, position: 'front', offsetFromLeft: 2 },
    { id: '2', type: 'overhead', width: 9, height: 8, position: 'front', offsetFromLeft: 13 }
  ],
  windows: [], hasWalkDoor: true, walkDoorPosition: 'side',
  sidingType: 'vinyl', roofingMaterial: 'asphalt-shingle',
  hasAtticTrusses: false, isInsulated: false, hasElectrical: false, unit: 'feet'
};

// --- ACTUAL CRM UI COMPONENTS SCALED ---
const DashboardScreen = () => (
  <div className="w-full h-full bg-slate-50 p-4 lg:p-6 overflow-hidden flex flex-col gap-4 lg:gap-6 scale-[0.85] lg:scale-100 origin-top-left w-[120%] h-[120%] lg:w-full lg:h-full">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">JS</div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <MetricCard title="Total Pipeline" value="$1.2M" icon={<DollarSign className="w-4 h-4" />} trend={{ value: 12, label: "from last month" }} />
      <MetricCard title="Win Rate" value="68%" icon={<Activity className="w-4 h-4" />} trend={{ value: 5, label: "from last month" }} />
      <MetricCard title="Open Deals" value="42" icon={<Briefcase className="w-4 h-4" />} />
      <MetricCard title="Avg Deal Size" value="$28.5k" icon={<TrendingUp className="w-4 h-4" />} trend={{ value: 2, label: "from last month" }} />
    </div>
    <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 mt-2 shadow-sm flex flex-col">
      <h3 className="font-semibold text-slate-700 mb-4">Recent Activity</h3>
      <div className="flex-1 border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center text-slate-400">
        Revenue Chart Simulation
      </div>
    </div>
  </div>
);

const QuotesScreen = () => (
  <div className="w-full h-full bg-slate-50 p-4 lg:p-6 overflow-hidden flex flex-col gap-4 scale-[0.65] md:scale-[0.75] lg:scale-[0.80] origin-top-left w-[150%] h-[150%] md:w-[133%] md:h-[133%] lg:w-[125%] lg:h-[125%]">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-800">Smart Bidding</h2>
      <Button size="sm" className="bg-blue-600">New Quote</Button>
    </div>
    <div className="flex-1 overflow-hidden pointer-events-none opacity-90">
      <DealsKanban 
        quotes={mockQuotes} 
        onStatusChange={() => {}} 
        onEdit={() => {}} 
        onPreview={() => {}} 
        onDelete={() => {}} 
        onEmail={() => {}} 
      />
    </div>
  </div>
);

const KitchenPlannerScreen = () => (
  <div className="w-full h-full bg-slate-100 overflow-hidden relative">
    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm font-semibold text-slate-700 text-sm">
      Kitchen Planner 3D View
    </div>
    <Suspense fallback={<div className="flex items-center justify-center h-full text-slate-500">Loading 3D Engine...</div>}>
      <div className="w-[150%] h-[150%] scale-[0.66] origin-top-left pointer-events-none">
        <LazyKitchen3D config={mockKitchenConfig} />
      </div>
    </Suspense>
  </div>
);

const GaragePlannerScreen = () => (
  <div className="w-full h-full bg-slate-100 overflow-hidden relative">
    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm font-semibold text-slate-700 text-sm">
      Garage Planner 3D View
    </div>
    <Suspense fallback={<div className="flex items-center justify-center h-full text-slate-500">Loading 3D Engine...</div>}>
      <div className="w-[150%] h-[150%] scale-[0.66] origin-top-left pointer-events-none">
        <LazyGarage3D config={mockGarageConfig} />
      </div>
    </Suspense>
  </div>
);

const DeckPlannerScreen = () => (
  <div className="w-full h-full bg-slate-100 overflow-hidden relative">
    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm font-semibold text-slate-700 text-sm">
      Deck Configurator
    </div>
    <Suspense fallback={<div className="flex items-center justify-center h-full text-slate-500">Loading 3D Engine...</div>}>
      <div className="w-[150%] h-[150%] scale-[0.66] origin-top-left pointer-events-none">
        <LazyDeck3D config={mockDeckConfig} />
      </div>
    </Suspense>
  </div>
);

interface PromoSlideshowProps {
  onClose?: () => void;
}

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  uiComponent?: React.ReactNode;
  isCTA?: boolean;
}

const slides: Slide[] = [
  {
    id: 'intro',
    title: 'The Ultimate Solution for Home Renovation Centres',
    subtitle: 'Power up your sales floor and streamline operations from first contact to final delivery.',
    image: 'https://images.unsplash.com/photo-1595814432314-90095f342694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaW1wcm92ZW1lbnR8ZW58MXx8fHwxNzcyNjY5MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    uiComponent: <DashboardScreen />,
  },
  {
    id: 'planners',
    title: 'Immersive 3D Planners',
    subtitle: 'Design Decks, Garages, Roofs, and Sheds right in front of your customer with our custom mini Three.js engine.',
    image: 'https://images.unsplash.com/photo-1742415106160-594d07f6cc23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwYmx1ZXByaW50c3xlbnwxfHx8fDE3NzI2Njk1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    uiComponent: <GaragePlannerScreen />,
  },
  {
    id: 'bidding',
    title: 'Instant Quoting & Smart Bidding',
    subtitle: 'Turn those 3D designs into exact material lists and professional quotes instantly, completely error-free.',
    image: 'https://images.unsplash.com/photo-1754780960162-839cda44d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250cmFjdG9yJTIwdGFibGV0JTIwYmx1ZXByaW50fGVufDF8fHx8MTc3MjY2NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    uiComponent: <QuotesScreen />,
  },
  {
    id: 'outdoor',
    title: 'Transform Outdoor Projects',
    subtitle: 'Help clients visualize their dream decks and outdoor spaces before construction even begins.',
    image: 'https://images.unsplash.com/photo-1764061148640-f08811bf9e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBvdXRkb29yJTIwZGVja3xlbnwxfHx8fDE3NzI2NjQ4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    uiComponent: <DeckPlannerScreen />,
  },
  {
    id: 'closing',
    title: 'ProSpaces CRM: Your Complete Platform',
    subtitle: 'Elevate your lumber yard or renovation centre today. Track opportunities, automate marketing, and close more deals.',
    image: 'https://images.unsplash.com/photo-1762245832990-f6f71b6b8c08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MjY2NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    uiComponent: <DashboardScreen />,
    isCTA: true,
  }
];

const SLIDE_DURATION = 6000;

export function PromoSlideshow({ onClose }: PromoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-advance logic
  useEffect(() => {
    let animationFrame: ReturnType<typeof requestAnimationFrame>;
    let startTime = Date.now();

    const updateProgress = () => {
      if (!isPlaying) return;
      
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      
      setProgress(newProgress);

      if (elapsed >= SLIDE_DURATION) {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        startTime = Date.now();
        setProgress(0);
      } else {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      animationFrame = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Remove ?view=promo from the URL and navigate home
      const url = new URL(window.location.href);
      url.searchParams.delete('view');
      window.location.href = url.pathname + url.search;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col overflow-hidden font-sans">
      {/* Background Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Subtle slow zoom-in on the background image for cinematic effect */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="w-full h-full"
            style={{
              backgroundImage: `url(${slides[currentIndex].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2 text-white/80">
          <span className="font-bold tracking-widest text-sm uppercase bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
            ProSpaces CRM
          </span>
        </div>
        <Button 
          onClick={handleClose}
          className="bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/20 transition-all z-50 flex items-center gap-2"
        >
          Visit ProSpaces CRM
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-between p-8 md:p-20 z-10 pb-32 relative">
        
        {/* Left Side: Text Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-[50%] xl:w-[55%] max-w-3xl flex flex-col justify-center relative z-30"
          >
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              {slides[currentIndex].title}
            </h1>
            <p className="text-lg md:text-xl xl:text-2xl text-gray-200 mb-8 max-w-xl xl:max-w-2xl leading-relaxed drop-shadow-md">
              {slides[currentIndex].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Right Side: Floating UI Screenshot or Real Component */}
        <AnimatePresence mode="wait">
          {(slides[currentIndex].uiComponent || slides[currentIndex].image) && (
            <motion.div
              key={`ui-${currentIndex}`}
              initial={{ opacity: 0, x: 50, rotateY: 15, rotateX: 5 }}
              animate={{ opacity: 1, x: 0, rotateY: -5, rotateX: 2 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.5 } }}
              transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 40 }}
              className="hidden lg:block absolute top-24 right-6 lg:right-12 xl:right-20 w-[450px] xl:w-[550px] 2xl:w-[700px] aspect-[16/10] rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/20 backdrop-blur-md z-20 bg-slate-900"
              style={{ perspective: "1000px" }}
            >
              {/* App Window Header Bar */}
              <div className="h-8 bg-white/10 backdrop-blur-md flex items-center px-4 gap-2 border-b border-white/10 absolute top-0 left-0 right-0 z-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/90 shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/90 shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/90 shadow-sm"></div>
              </div>
              {/* App Content */}
              <div className="w-full h-full pt-8 relative">
                {slides[currentIndex].uiComponent ? (
                  slides[currentIndex].uiComponent
                ) : (
                  <>
                    <img 
                      src={slides[currentIndex].image} 
                      alt="Application Interface Screenshot" 
                      className="w-full h-full object-cover opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 pointer-events-none"></div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls & Progress */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          
          {/* Progress Bars */}
          <div className="flex gap-2 w-full">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                onClick={() => {
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
              >
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: idx < currentIndex ? "100%" : idx === currentIndex ? `${progress}%` : "0%" 
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
              </button>
              <span className="text-white/60 text-sm font-medium tracking-wide">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
