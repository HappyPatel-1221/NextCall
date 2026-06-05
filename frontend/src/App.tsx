import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Meeting } from "./pages/Meeting";
import { Upcoming } from "./pages/Upcoming";
import { Previous } from "./pages/Previous";
import { Recordings } from "./pages/Recordings";
import { PersonalRoom } from "./pages/PersonalRoom";
import { StreamVideoProvider } from "./providers/StreamClientProvider";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <StreamVideoProvider>
                    <Layout />
                  </StreamVideoProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="/meeting/:id" element={<Meeting />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/previous" element={<Previous />} />
              <Route path="/recordings" element={<Recordings />} />
              <Route path="/personal-room" element={<PersonalRoom />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
