import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card } from '../components/ui';

export function EmailVerificationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'your email';

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Check your email</h1>
          <p className="text-gray-400 mt-2">Verify your email to continue</p>
        </div>

        <Card>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-100">Email Verification Required</h2>
              <p className="text-gray-400 text-sm">
                We've sent a verification link to <span className="text-gray-200 font-medium">{email}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Please check your inbox and click the verification link to complete your registration.
              </p>
            </div>
            <div className="pt-4">
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
