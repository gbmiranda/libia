import { useState } from 'react';
import { Button, ThemeToggle } from './components';
import { Icons } from './icons';
import { Sparkles, Cpu, Zap, Star } from 'lucide-react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-colors duration-300">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle size="lg" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-500/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg">
            <Sparkles className="text-purple-600 dark:text-purple-400" size={20} />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Powered by Tailwind v4
            </span>
          </div>

          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Libia Design System
          </h1>

          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            The next-generation AI-focused React component library with{' '}
            <span className="font-semibold text-purple-600">semantic variants</span>,{' '}
            <span className="font-semibold text-blue-600">ripple animations</span>, and{' '}
            <span className="font-semibold text-pink-600">clean design</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button variant="primary" size="lg" leftIcon={Icons.Rocket} rightIcon={Icons.ArrowRight} label="Get Started" />
            <Button variant="outline" size="lg" leftIcon={Icons.Play} label="View Demo" />
            <Button variant="secondary" size="lg" leftIcon={Icons.Download} label="Download" />
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Cpu size={16} />
              <span>6 Variants</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} />
              <span>Ripple Effects</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} />
              <span>Fully Accessible</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Semantic Variants */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="text-blue-600 dark:text-blue-400" size={32} />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Semantic Variants</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">PRIMARY</p>
              <Button variant="primary" fullWidth label="Primary Action" />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">SECONDARY</p>
              <Button variant="secondary" fullWidth label="Secondary Action" />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">NEURAL</p>
              <Button variant="neural" fullWidth leftIcon={Icons.Brain} label="Neural Network" />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">OUTLINE</p>
              <Button variant="outline" fullWidth label="Outline Style" />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">GHOST</p>
              <Button variant="ghost" fullWidth label="Ghost Mode" />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">DANGER</p>
              <Button variant="danger" fullWidth label="Delete" />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 transition-colors duration-300">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Sizes & Interactions</h2>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">DIFFERENT SIZES</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm" label="Small" />
                <Button variant="primary" size="md" label="Medium" />
                <Button variant="primary" size="lg" label="Large" />
                <Button variant="primary" size="xl" label="Extra Large" />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">WITH ICONS</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" leftIcon={Icons.Download} label="Download" />
                <Button variant="neural" rightIcon={Icons.ArrowRight} label="Continue" />
                <Button variant="secondary" leftIcon={Icons.Rocket} rightIcon={Icons.ArrowRight} label="Launch App" />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">INTERACTIVE STATES</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" onClick={() => setCount(count + 1)} label={`Clicked ${count} times`} />
                <Button variant="primary" loading={loading} onClick={handleLoadingClick} label={loading ? 'Processing...' : 'Click to Load'} />
                <Button variant="secondary" disabled label="Disabled State" />
                <Button variant="neural" leftIcon={Icons.Brain} label="AI Model" />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">FULL WIDTH</p>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={Icons.Sparkles}
                rightIcon={Icons.ArrowRight}
                label="Full Width Button"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Built with <span className="text-red-500">♥</span> using
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <span className="px-4 py-2 bg-white dark:bg-slate-700 dark:text-gray-200 rounded-full shadow transition-colors duration-300">React 18</span>
            <span className="px-4 py-2 bg-white dark:bg-slate-700 dark:text-gray-200 rounded-full shadow transition-colors duration-300">TypeScript</span>
            <span className="px-4 py-2 bg-white dark:bg-slate-700 dark:text-gray-200 rounded-full shadow transition-colors duration-300">Tailwind CSS v4</span>
            <span className="px-4 py-2 bg-white dark:bg-slate-700 dark:text-gray-200 rounded-full shadow transition-colors duration-300">Vite</span>
            <span className="px-4 py-2 bg-white dark:bg-slate-700 dark:text-gray-200 rounded-full shadow transition-colors duration-300">Lucide Icons</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
