import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../components/ui';
import { signUp } from '../lib/auth-client';

export function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setNeedsVerification(false);
    setLoading(true);

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      // Check if there was an error in the response
      if (result?.error) {
        setError(result.error.message || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Check if user session was created (no email verification needed)
      // If result has user data and token, redirect to home
      // Otherwise, show email verification message
      if (result?.data?.user && result?.data?.token) {
        navigate('/home');
      } else {
        // Email verification required
        setNeedsVerification(true);
        setLoading(false);
      }
    } catch (err: any) {
      // Handle different error formats
      const errorMessage =
        err?.message ||
        err?.error?.message ||
        (typeof err === 'string' ? err : 'Failed to create account');
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Create your account</h1>
          <p className="text-gray-400 mt-2">Start tracking your priorities today</p>
        </div>

        <Card>
          {needsVerification ? (
            // Show email verification message
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-100">Check your email</h2>
                <p className="text-gray-400 text-sm">
                  We've sent a verification link to <span className="text-gray-200 font-medium">{email}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Please verify your email address to complete your registration.
                </p>
              </div>
              <div className="pt-4">
                <Button variant="ghost" fullWidth onClick={() => navigate('/signin')}>
                  Back to Sign In
                </Button>
              </div>
            </div>
          ) : (
            // Show signup form
            <>
              <form onSubmit={handleSignUp} className="space-y-4">
                <Input
                  type="text"
                  label="Name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <Button type="submit" fullWidth disabled={loading}>
                  {loading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <a href="/signin" className="text-primary-500 hover:text-primary-400">
                    Sign in
                  </a>
                </p>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
