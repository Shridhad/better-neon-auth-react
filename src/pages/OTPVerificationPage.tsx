import { useState, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Input } from '../components/ui';
import { authClient, useSession } from '../lib/auth-client';

export function OTPVerificationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState('');
  const { refetch } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyOTP = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      // Check if there was an error in the response
      if (result?.error) {
        setError(result.error.message || 'Failed to verify OTP');
        setLoading(false);
        return;
      }

      // Successful verification - refetch session to get updated user data
      await refetch();

      // Navigate to home
      navigate('/home');
    } catch (err: any) {
      // Handle different error formats
      const errorMessage =
        err?.message ||
        err?.error?.message ||
        (typeof err === 'string' ? err : 'Failed to verify OTP');
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Verify your email</h1>
          <p className="text-gray-400 mt-2">Enter the verification code sent to your email</p>
        </div>

        <Card>
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold text-gray-100">Check your email</h2>
              <p className="text-gray-400 text-sm">
                We've sent a verification code to{' '}
                <span className="text-gray-200 font-medium">{email || 'your email'}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <Input
                type="text"
                label="Verification Code"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                autoComplete="one-time-code"
              />

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button type="submit" fullWidth disabled={loading || !email}>
                {loading ? 'Verifying...' : 'Verify Email'}
              </Button>
            </form>

            <div className="pt-4 text-center">
              <Button variant="ghost" fullWidth onClick={() => navigate('/signin')}>
                Back to Sign In
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
