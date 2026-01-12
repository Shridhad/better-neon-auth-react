import { Header } from '../components/layout/Header';
import { useSession } from '../lib/auth-client';

export function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8 animate-slide-up">
          {/* Welcome Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-100">
              Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}!
            </h1>
            <p className="text-xl text-gray-400">
              Neon Auth + Vercel Demo
            </p>
          </div>

          {/* Animated Cards Section */}
          <div className="grid gap-6 mt-12">
            <div className="bg-gradient-to-br from-primary-600/20 to-primary-900/20 border border-primary-700/30 rounded-lg p-8 animate-fade-in">
              <h2 className="text-2xl font-semibold text-gray-100 mb-3">
                Stay Focused
              </h2>
              <p className="text-gray-300">
                Identify and track your top 3 priorities each day. Clear goals lead to better outcomes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-lg p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-semibold text-gray-100 mb-3">
                Build Momentum
              </h2>
              <p className="text-gray-300">
                Small consistent actions compound over time. Make progress on what truly matters.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30 rounded-lg p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-semibold text-gray-100 mb-3">
                Track Progress
              </h2>
              <p className="text-gray-300">
                Visualize your achievements and stay motivated. See how far you've come.
              </p>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-12 text-center py-12 border border-gray-800 rounded-lg bg-gray-900/50">
            <div className="space-y-2">
              <p className="text-gray-400 text-sm uppercase tracking-wider">Coming Soon</p>
              <h3 className="text-xl font-medium text-gray-100">Priority Tracking Features</h3>
              <p className="text-gray-500 text-sm">We're building something amazing for you</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
