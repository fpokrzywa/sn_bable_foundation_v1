import { Heart, RefreshCw, Search, Pencil, Trash2, X } from 'lucide-react';
import { useState } from 'react';

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
    title: 'BabelPhish Assistant',
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
    assistant: 'NOW Assist Guru',
    title: 'Generate a list of interview questions for a software engineer role.',
    description: 'Formulate relevant and insightful interview questions suitable for evaluating candidates for a software engineer position.',
    tags: ['Hiring', 'HR']
  }
];

export function PromptCatalogPage() {
  const [selectedAssistant, setSelectedAssistant] = useState('All Assistants');
  const [selectedTask, setSelectedTask] = useState('Select Task...');
  const [selectedFunctionalArea, setSelectedFunctionalArea] = useState('Select Functional Area...');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'common' | 'favorites'>('common');
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [deletingPrompt, setDeletingPrompt] = useState<Prompt | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
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
    <div className="prompt-catalog-page">
      <div className="prompt-catalog-header">
        <h1 className="prompt-catalog-title">Prompt Catalog</h1>
        <p className="prompt-catalog-subtitle">
          Discover and use pre-built prompts to get the most out of your AI assistants. Browse by category, assistant, or search for specific use cases.
        </p>
      </div>

      <div className="prompt-catalog-controls">
        <div className="catalog-tabs-header">
          <div className="catalog-tabs">
            <button
              className={`catalog-tab ${activeTab === 'common' ? 'active' : ''}`}
              onClick={() => setActiveTab('common')}
            >
              Common Prompts
            </button>
            {favorites.size > 0 && (
              <button
                className={`catalog-tab ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                Favorite Prompts
              </button>
            )}
          </div>
          <button className="refresh-btn">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Assistant</label>
            <select
              value={selectedAssistant}
              onChange={(e) => setSelectedAssistant(e.target.value)}
              className="filter-select"
            >
              <option value="All Assistants">All Assistants</option>
              <option value="ODIN">ODIN</option>
              <option value="NOW Assist Guru">NOW Assist Guru</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Task</label>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="filter-select"
            >
              <option value="Select Task...">Select Task...</option>
              <option value="Marketing">Marketing</option>
              <option value="Creative Writing">Creative Writing</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Functional Area</label>
            <select
              value={selectedFunctionalArea}
              onChange={(e) => setSelectedFunctionalArea(e.target.value)}
              className="filter-select"
            >
              <option value="Select Functional Area...">Select Functional Area...</option>
              <option value="Marketing">Marketing</option>
              <option value="Engineering">Engineering</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
        </div>

        <div className="search-row">
          <div className="search-container-full">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-full"
            />
          </div>
        </div>
      </div>

      <div className="prompts-grid">
        {filteredPrompts.map((prompt) => (
          <div key={prompt.id} className="prompt-card">
            <div className="prompt-card-header">
              <span className="prompt-assistant">{prompt.assistant}</span>
              <button
                className={`favorite-btn ${favorites.has(prompt.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(prompt.id)}
              >
                <Heart
                  size={18}
                  fill={favorites.has(prompt.id) ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            <h3 className="prompt-title">{prompt.title}</h3>
            <p className="prompt-description">{prompt.description}</p>

            <div className="prompt-tags">
              {prompt.tags.map((tag, index) => (
                <span key={index} className="prompt-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="card-hover-actions">
              <button
                className="card-action-btn edit-action"
                onClick={() => setEditingPrompt(prompt)}
                title="Edit prompt"
              >
                <Pencil size={16} />
              </button>
              <button
                className="card-action-btn delete-action"
                onClick={() => setDeletingPrompt(prompt)}
                title="Delete prompt"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPrompt && (
        <div className="modal-overlay" onClick={() => setEditingPrompt(null)}>
          <div className="edit-prompt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Edit Prompt</h2>
              <button className="modal-close" onClick={() => setEditingPrompt(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" defaultValue={editingPrompt.title} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" defaultValue={editingPrompt.description} rows={3} />
              </div>
              <div className="form-group">
                <label className="form-label">User Message</label>
                <textarea className="form-textarea" placeholder="Enter user message..." rows={4} />
              </div>
              <div className="form-group">
                <label className="form-label">System Message</label>
                <textarea className="form-textarea" placeholder="Enter system message..." rows={4} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select">
                  <option>Select a category</option>
                  <option>Marketing</option>
                  <option>Creative Writing</option>
                  <option>Science</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tags</label>
                <div className="tags-input-container">
                  {editingPrompt.tags.map((tag, index) => (
                    <span key={index} className="tag-item">
                      {tag}
                      <button className="tag-remove">×</button>
                    </span>
                  ))}
                  <input type="text" className="tag-input" placeholder="Add a tag..." />
                </div>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span>Make this prompt public</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setEditingPrompt(null)}>Cancel</button>
              <button className="update-btn">Update Prompt</button>
            </div>
          </div>
        </div>
      )}

      {deletingPrompt && (
        <div className="modal-overlay" onClick={() => setDeletingPrompt(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Prompt</h2>
              <button className="modal-close" onClick={() => setDeletingPrompt(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-confirmation">
                <div className="delete-icon-wrapper">
                  <Trash2 size={24} className="delete-icon" />
                </div>
                <p className="delete-message">
                  Are you sure you want to delete this prompt?
                </p>
                <p className="delete-prompt-title">"{deletingPrompt.title}"</p>
                <p className="delete-warning">
                  This action cannot be undone. The prompt will be permanently removed from the system.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setDeletingPrompt(null)}>Cancel</button>
              <button className="delete-confirm-btn">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
