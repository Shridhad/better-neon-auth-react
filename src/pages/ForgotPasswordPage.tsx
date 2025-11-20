import { useState, FormEvent } from 'react';
import { Button, Input, Card } from '../components/ui';
import { authClient } from '../lib/auth-client';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (result?.error) {
        setError(result.error.message || 'Failed to send password reset email');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        err?.error?.message ||
        (typeof err === 'string' ? err : 'Failed to send password reset email');
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Forgot Password</h1>
          <p className="text-gray-400 mt-2">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <Card>
          {success ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-100">Check Your Email</h2>
                <p className="text-gray-400 text-sm">
                  We've sent a password reset link to{' '}
                  <span className="text-gray-200 font-medium">{email}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Please check your inbox and click the link to reset your password.
                </p>
              </div>
              <div className="pt-4">
                <Button variant="ghost" fullWidth onClick={() => (window.location.href = '/signin')}>
                  Back to Sign In
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <div className="text-center">
                <a href="/signin" className="text-sm text-gray-400 hover:text-gray-300">
                  Back to Sign In
                </a>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
