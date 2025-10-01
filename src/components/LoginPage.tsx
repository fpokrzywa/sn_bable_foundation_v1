import { useState, useEffect } from 'react';
import { FishIcon } from './FishIcon';
import testUsers from '../testUsers.json';

interface LoginPageProps {
  onLogin: (email: string) => void;
  loadingDuration?: number;
}

export function LoginPage({ onLogin, loadingDuration = 3000 }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Logging you in...');

  useEffect(() => {
    if (isLoading) {
      setLoadingMessage('Logging you in...');
      const timer = setTimeout(() => {
        setLoadingMessage('Building your workspace...');
      }, loadingDuration / 2);

      return () => clearTimeout(timer);
    }
  }, [isLoading, loadingDuration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = testUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setIsLoading(true);
      setTimeout(() => {
        onLogin(user.email);
        setShowModal(false);
        setIsLoading(false);
      }, loadingDuration);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <FishIcon />
        <h1 className="landing-title">
          I am <span className="brand-name">BabelPhish</span>
        </h1>
        <p className="landing-subtitle">the intelligent experience</p>

        <button
          type="button"
          className="login-button"
          onClick={() => setShowModal(true)}
        >
          Login
        </button>
      </div>

      {showModal && (
        <div className="login-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="login-modal-title">Login to BabelPhish</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="login-modal-actions">
                <button
                  type="button"
                  className="login-cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="login-submit-button">
                  Login
                </button>
              </div>
            </form>

            <div className="test-credentials">
              <p className="test-title">Test Credentials:</p>
              <p className="test-item">freddie@3cpublish.com / test123</p>
              <p className="test-item">admin@babelphish.com / admin123</p>
              <p className="test-item">user@babelphish.com / user123</p>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-container">
            <div className="loading-spinner">
              <FishIcon />
            </div>
            <p className="loading-text">{loadingMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
