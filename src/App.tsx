import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSession } from './lib/auth-client';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { HomePage } from './pages/HomePage';
import { EmailVerificationPage } from './pages/EmailVerificationPage';
import { OTPVerificationPage } from './pages/OTPVerificationPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  // Check if user has a valid session with verified email
  // If email is not verified, treat as not authenticated for redirect purposes
  const isAuthenticated = session?.user?.emailVerified;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />}
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <SignInPage />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <SignUpPage />}
        />
        <Route
          path="/verify-email"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <EmailVerificationPage />}
        />
        <Route
          path="/verify-otp"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <OTPVerificationPage />}
        />
        <Route
          path="/forgot-password"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <ForgotPasswordPage />}
        />
        <Route
          path="/reset-password"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <ResetPasswordPage />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
