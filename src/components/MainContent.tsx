import { Sparkles } from 'lucide-react';
import { FishIcon } from './FishIcon';

export function MainContent() {
  return (
    <div className="main-content">
      <div className="welcome-container">
        <FishIcon />

        <h1 className="welcome-title">Welcome to BabelPhish</h1>

        <p className="welcome-subtitle">
          Start by typing a command or query below to create your first widget.
        </p>

        <div className="quick-actions">
          <div className="quick-actions-title">Quick browse items</div>

          <div className="action-links">
            <a href="#" className="action-link">
              <Sparkles className="icon" />
              <span>Get my incidents</span>
            </a>

            <a href="#" className="action-link">
              <Sparkles className="icon" />
              <span>Show me high priority changes</span>
            </a>

            <a href="#" className="action-link">
              <Sparkles className="icon" />
              <span>Are there any recurring problems?</span>
            </a>
          </div>
        </div>

        <div className="input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Please type your message here"
          />
          <Sparkles className="input-icon" />
        </div>

        <div className="input-footer">
          <button>Use Commands</button>
          <button>Workspace</button>
        </div>
      </div>
    </div>
  );
}
