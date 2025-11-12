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

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      // Debug: Log the result to understand what the API returns
      console.log('SignUp API result:', result);

      // Check if there was an error in the response
      if (result?.error) {
        setError(result.error.message || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Check if we have a token (successful authentication)
      // When email verification is required, better-auth returns token: null
      const token = result?.data?.token;

      console.log('Token value:', token, 'Type:', typeof token);

      // If token exists and is not null, user is authenticated
      if (token) {
        console.log('Has token, navigating to home');
        navigate('/home');
      } else {
        // Token is null - email verification required
        // Navigate to OTP verification page
        console.log('No token (verification needed), navigating to verify-otp page');
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
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
        </Card>
      </div>
    </div>
  );
}
