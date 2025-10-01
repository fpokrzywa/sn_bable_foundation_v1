import { Search, UserPlus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: 'Active' | 'Inactive';
  lastLogin: string;
  avatar?: string;
  initials?: string;
}

const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Freddie Pokrzywa',
    email: 'freddie@3cpublish.com',
    roles: ['Admin', 'User'],
    status: 'Inactive',
    lastLogin: 'Never',
    initials: 'FP'
  },
  {
    id: '2',
    name: 'Ian Clayton',
    email: 'info@servicemanagement101.com',
    roles: ['User'],
    status: 'Inactive',
    lastLogin: 'Never',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'Wally Waltner',
    email: 'wwaltner@gmail.com',
    roles: ['User'],
    status: 'Inactive',
    lastLogin: 'Never',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    name: 'Admin Account',
    email: 'admin@3cpublish.com',
    roles: ['Admin'],
    status: 'Inactive',
    lastLogin: 'Never',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '5',
    name: 'Bryan Crowder',
    email: 'bryan@velocity-now.com',
    roles: ['User'],
    status: 'Inactive',
    lastLogin: 'Never',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '6',
    name: 'Jaco Man',
    email: 'jaco@test.com',
    roles: ['User'],
    status: 'Inactive',
    lastLogin: 'Never',
    initials: 'JM'
  },
  {
    id: '7',
    name: 'Freddie Pokrzywa',
    email: 'xfreddie@3cpublish.com',
    roles: ['Admin', 'User'],
    status: 'Inactive',
    lastLogin: 'Never',
    initials: 'FP'
  }
];

export function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [selectedRoles, setSelectedRoles] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleAddUser = () => {
    console.log('Adding user:', {
      firstName,
      lastName,
      email,
      password,
      company,
      avatarUrl,
      bio,
      selectedRoles,
      isActive
    });
    setShowModal(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setCompany('');
    setAvatarUrl('');
    setBio('');
    setSelectedRoles('');
    setIsActive(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setCompany('');
    setAvatarUrl('');
    setBio('');
    setSelectedRoles('');
    setIsActive(true);
  };

  return (
    <div className="user-management-page">
      <div className="user-management-header">
        <div>
          <h1 className="user-management-title">User Management</h1>
          <p className="user-management-subtitle">Manage user accounts and permissions</p>
        </div>
        <button className="add-user-btn" onClick={() => setShowModal(true)}>
          <UserPlus size={18} />
          <span>Add User</span>
        </button>
      </div>

      <div className="user-management-content">
        <div className="user-controls">
          <div className="user-search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="user-search-input"
            />
          </div>

          <div className="role-filter-container">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="role-filter-select"
            >
              <option value="All Roles">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th className="table-header">User</th>
                <th className="table-header">Role</th>
                <th className="table-header">Status</th>
                <th className="table-header">Last Login</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleUsers.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="table-cell">
                    <div className="user-info">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="user-avatar" />
                      ) : (
                        <div className="user-avatar-placeholder">
                          {user.initials}
                        </div>
                      )}
                      <div className="user-details">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="role-badges">
                      {user.roles.map((role, index) => (
                        <span
                          key={index}
                          className={`role-badge ${role.toLowerCase()}`}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="last-login">{user.lastLogin}</span>
                  </td>
                  <td className="table-cell">
                    <div className="action-buttons">
                      <button className="action-btn edit-btn" title="Edit user">
                        <Pencil size={16} />
                      </button>
                      <button className="action-btn delete-btn" title="Delete user">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Add New User</h2>
                <p className="modal-subtitle">Create a new user account with appropriate permissions.</p>
              </div>
              <button className="modal-close" onClick={handleCancel}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group form-group-half">
                  <label className="form-label">First Name</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="form-input"
                    />
                    <span className="required-indicator">*</span>
                  </div>
                </div>

                <div className="form-group form-group-half">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-with-icon">
                  <input
                    type="email"
                    placeholder="freddie@3cpublish.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                  <span className="required-indicator">*</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input password-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <span className="required-indicator required-password">*</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Company</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Avatar URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/avatar.png"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea
                  placeholder="Tell us about the user"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="form-textarea"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Roles</label>
                <select
                  value={selectedRoles}
                  onChange={(e) => setSelectedRoles(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select roles...</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Admin,User">Admin & User</option>
                </select>
              </div>

              <div className="form-group">
                <label className="toggle-label">
                  <span className="toggle-label-text">Active</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="add-user-submit-btn" onClick={handleAddUser}>
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
