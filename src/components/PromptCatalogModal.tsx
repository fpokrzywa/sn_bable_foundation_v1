import { Heart, X, Search } from 'lucide-react';
import { useState } from 'react';
import './PromptCatalogModal.css';

interface Prompt {
  id: string;
  assistant: string;
  title: string;
  description: string;
  tags: string[];
}

const samplePrompts: Prompt[] = [
  {
    id: '1',
    assistant: 'ODIN',
    title: 'ServiceNow Assistant v4',
    description: 'This is my description for this prompt',
    tags: ['marketing', 'creative']
  },
  {
    id: '2',
    assistant: 'ODIN',
    title: 'Brainstorm ideas for a new marketing campaign.',
    description: 'Generate creative ideas and strategies for an upcoming marketing campaign.',
    tags: ['Marketing', 'Brainstorming']
  },
  {
    id: '3',
    assistant: 'ODIN',
    title: 'Write a short story about a futuristic city.',
    description: 'Create a captivating short story set in a technologically advanced, futuristic urban environment.',
    tags: ['Creative Writing', 'Fiction']
  },
  {
    id: '4',
    assistant: 'ODIN',
    title: 'Explain the concept of quantum entanglement simply.',
    description: 'Provide a clear and easy-to-understand explanation of quantum entanglement for a general audience.',
    tags: ['Science', 'Education']
  },
  {
    id: '5',
    assistant: 'ODIN',
    title: 'Summarize the key points of the attached research paper.',
    description: 'Condense the essential information and main findings from the provided research paper.',
    tags: ['Summarization', 'Research', 'Files']
  }
];

interface PromptCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromptCatalogModal({ isOpen, onClose }: PromptCatalogModalProps) {
  const [selectedAssistant, setSelectedAssistant] = useState('ODIN');
  const [selectedTask, setSelectedTask] = useState('Select Task...');
  const [selectedFunctionalArea, setSelectedFunctionalArea] = useState('Select Functional Area...');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'common' | 'favorites'>('common');

  if (!isOpen) return null;

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        if (newFavorites.size === 0 && activeTab === 'favorites') {
          setActiveTab('common');
        }
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const filteredPrompts = activeTab === 'favorites'
    ? samplePrompts.filter(prompt => favorites.has(prompt.id))
    : samplePrompts;

  return (
    <div className="prompt-modal-overlay" onClick={onClose}>
      <div className="prompt-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="prompt-modal-header">
          <div className="prompt-modal-title-section">
            <h2 className="prompt-modal-title">Prompt Catalog</h2>
            <button className="view-full-catalog-btn">
              View full Prompt Catalog
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </button>
          </div>
          <button className="prompt-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="prompt-modal-tabs">
          <button
            className={`prompt-modal-tab ${activeTab === 'common' ? 'active' : ''}`}
            onClick={() => setActiveTab('common')}
          >
            Agentic Weaver Common Prompts
          </button>
          {favorites.size > 0 && (
            <button
              className={`prompt-modal-tab ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              Your Prompts
            </button>
          )}
        </div>

        <div className="prompt-modal-filters">
          <div className="prompt-modal-filter-row">
            <div className="prompt-modal-filter-group">
              <label className="prompt-modal-filter-label">Assistant</label>
              <select
                value={selectedAssistant}
                onChange={(e) => setSelectedAssistant(e.target.value)}
                className="prompt-modal-filter-select"
              >
                <option value="ODIN">ODIN</option>
                <option value="NOW Assist Guru">NOW Assist Guru</option>
              </select>
            </div>

            <div className="prompt-modal-filter-group">
              <label className="prompt-modal-filter-label">Task</label>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="prompt-modal-filter-select"
              >
                <option value="Select Task...">Select Task...</option>
                <option value="Marketing">Marketing</option>
                <option value="Creative Writing">Creative Writing</option>
                <option value="Science">Science</option>
              </select>
            </div>

            <div className="prompt-modal-filter-group">
              <label className="prompt-modal-filter-label">Functional Area</label>
              <select
                value={selectedFunctionalArea}
                onChange={(e) => setSelectedFunctionalArea(e.target.value)}
                className="prompt-modal-filter-select"
              >
                <option value="Select Functional Area...">Select Functional Area...</option>
                <option value="Marketing">Marketing</option>
                <option value="Research">Research</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>

          <div className="prompt-modal-search-row">
            <div className="prompt-modal-search-container">
              <Search className="prompt-modal-search-icon" size={18} />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="prompt-modal-search-input"
              />
            </div>
          </div>
        </div>

        <div className="prompt-modal-body">
          <div className="prompt-modal-grid">
            {filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="prompt-modal-card">
                <div className="prompt-modal-card-header">
                  <span className="prompt-modal-assistant">{prompt.assistant}</span>
                  <button
                    className={`prompt-modal-favorite-btn ${favorites.has(prompt.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(prompt.id)}
                  >
                    <Heart
                      size={16}
                      fill={favorites.has(prompt.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                <h3 className="prompt-modal-card-title">{prompt.title}</h3>
                <p className="prompt-modal-card-description">{prompt.description}</p>

                <div className="prompt-modal-tags">
                  {prompt.tags.map((tag, index) => (
                    <span key={index} className="prompt-modal-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
