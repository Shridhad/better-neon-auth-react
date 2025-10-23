import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { signOut, useSession } from '../../lib/auth-client';

export function Header() {
  const navigate = useNavigate();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  if (!session?.user) {
    return null;
  }

  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-100">Priority Tracker</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-8 h-8 rounded-full"
              />
            )}
            {!session.user.image && (
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-sm text-gray-300">
              {session.user.name || session.user.email}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
