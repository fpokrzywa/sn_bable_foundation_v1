import { Heart, RefreshCw, ShoppingBag, Zap, Pencil, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Assistant {
  id: string;
  name: string;
  description: string;
  model: string;
  icon: 'shopping-bag' | 'zap';
  iconColor: string;
}

const sampleAssistants: Assistant[] = [
  {
    id: '1',
    name: 'ODIN (Sample)',
    description: 'You are a helpful assistant named ODIN, you are a meta-agent.... (This is sample data)',
    model: 'gpt-4.1',
    icon: 'shopping-bag',
    iconColor: '#ec4899'
  },
  {
    id: '2',
    name: 'Prompt Architect (Sample)',
    description: 'You are a Prompt Architect AI. Your job is to write optimized system prompts....',
    model: 'gpt-4.1',
    iconColor: '#10b981',
    icon: 'zap'
  },
  {
    id: '3',
    name: 'Code Review Assistant',
    description: 'An AI assistant specialized in reviewing code for best practices, security issues, and optimization opportunities.',
    model: 'gpt-4.1',
    icon: 'shopping-bag',
    iconColor: '#3b82f6'
  },
  {
    id: '4',
    name: 'Content Writer',
    description: 'A creative writing assistant that helps you craft engaging content, blog posts, and marketing copy.',
    model: 'gpt-4.1',
    iconColor: '#f59e0b',
    icon: 'zap'
  }
];

export function AIStorePage() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(null);
  const [deletingAssistant, setDeletingAssistant] = useState<Assistant | null>(null);

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

  const filteredAssistants = sampleAssistants.filter(assistant => {
    const matchesSearch = assistant.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === 'All') {
      return matchesSearch;
    } else if (selectedFilter === 'Favorites') {
      return matchesSearch && favorites.has(assistant.id);
    } else if (selectedFilter === 'Recently Added') {
      return matchesSearch;
    } else if (selectedFilter === 'Name A-Z') {
      return matchesSearch;
    } else if (selectedFilter === 'Name Z-A') {
      return matchesSearch;
    }

    return matchesSearch;
  });

  const sortedAssistants = [...filteredAssistants].sort((a, b) => {
    if (selectedFilter === 'Name A-Z') {
      return a.name.localeCompare(b.name);
    } else if (selectedFilter === 'Name Z-A') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="ai-store-page">
      <div className="ai-store-header">
        <h1 className="ai-store-title">Welcome to the AI Storefront</h1>
        <p className="ai-store-subtitle">
          Each Assistant is created to help you do a specific set of tasks. Get answers to your questions, brainstorm ideas, create new content, and more!
        </p>
      </div>

      <div className="ai-store-controls">
        <div className="filter-search-row">
          <div className="filter-dropdown">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All</option>
              <option value="Recently Added">Recently Added</option>
              <option value="Name A-Z">Name A-Z</option>
              <option value="Name Z-A">Name Z-A</option>
              <option value="Favorites">Favorites</option>
            </select>
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search using assistant name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="store-actions">
            <button className="refresh-btn">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <span className="assistant-count">{sortedAssistants.length} assistants</span>
          </div>
        </div>
      </div>

      <div className="assistants-grid">
        {sortedAssistants.map((assistant) => (
          <div key={assistant.id} className="assistant-card">
            <div className="assistant-card-header">
              <div className="assistant-icon-wrapper">
                {assistant.icon === 'shopping-bag' ? (
                  <ShoppingBag
                    size={24}
                    style={{ color: assistant.iconColor }}
                  />
                ) : (
                  <Zap
                    size={24}
                    style={{ color: assistant.iconColor }}
                  />
                )}
              </div>
              <div className="assistant-title-section">
                <h3 className="assistant-name">{assistant.name}</h3>
              </div>
              <button
                className={`favorite-btn ${favorites.has(assistant.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(assistant.id)}
              >
                <Heart
                  size={20}
                  fill={favorites.has(assistant.id) ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            <p className="assistant-description">{assistant.description}</p>

            <div className="assistant-model">
              <span className="model-badge">{assistant.model}</span>
            </div>

            <div className="card-hover-actions">
              <button
                className="card-action-btn edit-action"
                onClick={() => setEditingAssistant(assistant)}
                title="Edit assistant"
              >
                <Pencil size={16} />
              </button>
              <button
                className="card-action-btn delete-action"
                onClick={() => setDeletingAssistant(assistant)}
                title="Delete assistant"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingAssistant && (
        <div className="modal-overlay" onClick={() => setEditingAssistant(null)}>
          <div className="edit-prompt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Edit Assistant</h2>
              <button className="modal-close" onClick={() => setEditingAssistant(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" className="form-input" defaultValue={editingAssistant.name} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" defaultValue={editingAssistant.description} rows={3} />
              </div>
              <div className="form-group">
                <label className="form-label">Model</label>
                <select className="form-select" defaultValue={editingAssistant.model}>
                  <option>gpt-4.1</option>
                  <option>gpt-4o</option>
                  <option>gpt-3.5-turbo</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Icon</label>
                <select className="form-select" defaultValue={editingAssistant.icon}>
                  <option value="shopping-bag">Shopping Bag</option>
                  <option value="zap">Zap</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Icon Color</label>
                <input type="color" className="form-input" defaultValue={editingAssistant.iconColor} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setEditingAssistant(null)}>Cancel</button>
              <button className="update-btn">Update Assistant</button>
            </div>
          </div>
        </div>
      )}

      {deletingAssistant && (
        <div className="modal-overlay" onClick={() => setDeletingAssistant(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Assistant</h2>
              <button className="modal-close" onClick={() => setDeletingAssistant(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-confirmation">
                <div className="delete-icon-wrapper">
                  <Trash2 size={24} className="delete-icon" />
                </div>
                <p className="delete-message">
                  Are you sure you want to delete this assistant?
                </p>
                <p className="delete-prompt-title">\"{deletingAssistant.name}\"</p>
                <p className="delete-warning">
                  This action cannot be undone. The assistant will be permanently removed from the system.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setDeletingAssistant(null)}>Cancel</button>
              <button className="delete-confirm-btn">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
