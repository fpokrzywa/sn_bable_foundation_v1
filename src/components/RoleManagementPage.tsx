import { Search, Plus, Pencil, Trash2, Users, X } from 'lucide-react';
import { useState } from 'react';

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  createdDate: string;
}

const sampleRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Admin Role',
    userCount: 0,
    permissions: ['User Management', 'Role Management'],
    createdDate: '30/09/2025'
  },
  {
    id: '2',
    name: 'User',
    description: 'User Role',
    userCount: 0,
    permissions: ['User Management'],
    createdDate: '30/09/2025'
  }
];

const availablePermissions = [
  'User Management',
  'Role Management',
  'System Settings',
  'View Reports',
  'Export Data',
  'Import Data',
  'Manage Workspaces',
  'AI Tools Access',
  'Admin Panel'
];

export function RoleManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const handleCreateRole = () => {
    console.log('Creating role:', { roleName, roleDescription, selectedPermissions });
    setShowModal(false);
    setRoleName('');
    setRoleDescription('');
    setSelectedPermissions([]);
  };

  const handleCancel = () => {
    setShowModal(false);
    setRoleName('');
    setRoleDescription('');
    setSelectedPermissions([]);
  };

  return (
    <div className="role-management-page">
      <div className="role-management-header">
        <div>
          <h1 className="role-management-title">Role Management</h1>
          <p className="role-management-subtitle">Manage roles and permissions</p>
        </div>
        <button className="add-role-btn" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          <span>Add Role</span>
        </button>
      </div>

      <div className="role-controls">
        <div className="role-search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="role-search-input"
          />
        </div>
        <button className="refresh-btn-role">
          <span>Refresh</span>
        </button>
        <button className="debug-btn">
          <span>Debug All Webhooks</span>
        </button>
      </div>

      <div className="roles-grid">
        {sampleRoles.map((role) => (
          <div key={role.id} className="role-card">
            <div className="role-card-header">
              <div>
                <h3 className="role-card-title">{role.name}</h3>
                <p className="role-card-description">{role.description}</p>
              </div>
              <div className="role-card-actions">
                <button className="role-action-btn edit">
                  <Pencil size={16} />
                </button>
                <button className="role-action-btn delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="role-user-count">
              <Users size={14} />
              <span>{role.userCount} users</span>
            </div>

            <div className="role-permissions-section">
              <h4 className="permissions-label">Permissions:</h4>
              <div className="role-permissions-list">
                {role.permissions.map((permission, index) => (
                  <span key={index} className="permission-badge">
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            <div className="role-card-footer">
              <span className="created-date">Created {role.createdDate}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Add New Role</h2>
                <p className="modal-subtitle">Create a new role with specific permissions.</p>
              </div>
              <button className="modal-close" onClick={handleCancel}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Role Name</label>
                <input
                  type="text"
                  placeholder="Enter role name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  placeholder="Enter role description"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  className="form-textarea"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Permissions</label>
                <div className="permissions-checkboxes">
                  {availablePermissions.map((permission) => (
                    <label key={permission} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="checkbox-input"
                      />
                      <span>{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="create-role-btn" onClick={handleCreateRole}>
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
