import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              Focus on what
              <span className="block text-primary-500">matters most</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A productivity tool that helps you prioritize and stay on track for your top 3 priorities of the day.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={() => navigate('/signin')}>
              Get Started
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate('/signup')}>
              Create Account
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100">Simple & Clean</h3>
            <p className="text-gray-400">
              No clutter, no distractions. Just your top 3 priorities front and center.
            </p>
          </div>

          <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100">Track Progress</h3>
            <p className="text-gray-400">
              See your daily wins stack up. Build momentum with consistent progress.
            </p>
          </div>

          <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100">Stay Focused</h3>
            <p className="text-gray-400">
              Limit your daily focus to 3 priorities. Less is more when it comes to productivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
