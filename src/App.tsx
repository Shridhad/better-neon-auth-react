import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSession } from './lib/auth-client';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { HomePage } from './pages/HomePage';
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={session ? <Navigate to="/home" replace /> : <LandingPage />}
        />
        <Route
          path="/signin"
          element={session ? <Navigate to="/home" replace /> : <SignInPage />}
        />
        <Route
          path="/signup"
          element={session ? <Navigate to="/home" replace /> : <SignUpPage />}
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
