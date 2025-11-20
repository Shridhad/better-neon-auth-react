import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, Card } from '../components/ui';
import { authClient } from '../lib/auth-client';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  const token = searchParams.get('token');
  const errorParam = searchParams.get('error');

  useEffect(() => {
    // Check if there's an error in the URL (invalid token)
    if (errorParam === 'invalid_token') {
      setTokenError(true);
    }

    // Check if token is missing
    if (!token && !errorParam) {
      setTokenError(true);
    }
  }, [token, errorParam]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (result?.error) {
        setError(result.error.message || 'Failed to reset password');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Redirect to sign in after 2 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        err?.error?.message ||
        (typeof err === 'string' ? err : 'Failed to reset password');
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Reset Password</h1>
          <p className="text-gray-400 mt-2">
            {tokenError
              ? 'There was a problem with your reset link'
              : 'Enter your new password below'}
          </p>
        </div>

        <Card>
          {tokenError ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-100">Invalid Reset Link</h2>
                <p className="text-gray-400 text-sm">
                  This password reset link is invalid or has expired.
                </p>
                <p className="text-gray-500 text-sm">
                  Please request a new password reset link.
                </p>
              </div>
              <div className="pt-4 space-y-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate('/forgot-password')}
                >
                  Request New Link
                </Button>
                <Button variant="ghost" fullWidth onClick={() => navigate('/signin')}>
                  Back to Sign In
                </Button>
              </div>
            </div>
          ) : success ? (
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-100">Password Reset Successfully</h2>
                <p className="text-gray-400 text-sm">
                  Your password has been reset successfully.
                </p>
                <p className="text-gray-500 text-sm">
                  Redirecting you to sign in...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                label="New Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />

              <Input
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
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
