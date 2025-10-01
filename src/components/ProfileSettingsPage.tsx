import { ChevronRight, Settings as SettingsIcon, Bell, Shield, Save } from 'lucide-react';
import { useState } from 'react';

type ExpandedSection = 'profile' | 'display' | 'notifications' | 'security' | null;

export function ProfileSettingsPage() {
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>('profile');

  const [firstName, setFirstName] = useState('Freddie');
  const [lastName, setLastName] = useState('Pokrzywa');
  const [bio, setBio] = useState('My bio');

  const [darkMode, setDarkMode] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleSection = (section: ExpandedSection) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleUpdatePassword = () => {
    console.log('Updating password...');
  };

  return (
    <div className="profile-settings-page">
      <div className="profile-settings-header">
        <div>
          <h1 className="profile-settings-title">Profile & Settings</h1>
          <p className="profile-settings-subtitle">Manage your profile information and account settings</p>
        </div>
        <div className="header-actions">
          <button className="save-settings-btn">
            <Save size={16} />
            <span>Save Settings</span>
          </button>
          <button className="save-profile-btn">
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      <div className="settings-sections">
        <div className="settings-section expanded">
          <div className="section-header section-header-static">
            <div className="section-header-content">
              <h2 className="section-title">Profile Information</h2>
              <p className="section-description">This is how others will see you on the site.</p>
            </div>
          </div>

          <div className="section-body">
            <div className="profile-header-section">
              <div className="profile-avatar-large">FP</div>
              <div className="profile-info">
                <div className="profile-company">3C Publications LLC</div>
                <div className="profile-name">Freddie Pokrzywa</div>
                <div className="profile-email">freddie@3cpublish.com</div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group form-group-half">
                <label className="form-label">First Name</label>
                <div className="input-with-icon">
                  <input
                    type="text"
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-textarea"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className={`settings-section ${expandedSection === 'display' ? 'expanded' : ''}`}>
          <div
            className="section-header section-header-collapsed"
            onClick={() => toggleSection('display')}
          >
            <div className="section-header-content">
              <div className="section-icon-title">
                <SettingsIcon size={18} />
                <h2 className="section-title">Display Settings</h2>
              </div>
              <p className="section-description">Manage your display and theme preferences</p>
            </div>
            <ChevronRight className="chevron-icon" size={20} />
          </div>

          {expandedSection === 'display' && (
            <div className="section-body">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-title">Dark Mode</h3>
                  <p className="setting-description">Enable dark theme for the application.</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className={`settings-section ${expandedSection === 'notifications' ? 'expanded' : ''}`}>
          <div
            className="section-header section-header-collapsed"
            onClick={() => toggleSection('notifications')}
          >
            <div className="section-header-content">
              <div className="section-icon-title">
                <Bell size={18} />
                <h2 className="section-title">Notification Settings</h2>
              </div>
              <p className="section-description">Manage how you receive notifications</p>
            </div>
            <ChevronRight className="chevron-icon" size={20} />
          </div>

          {expandedSection === 'notifications' && (
            <div className="section-body">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-title">Email Notifications</h3>
                  <p className="setting-description">Receive notifications about your account via email.</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-title">Push Notifications</h3>
                  <p className="setting-description">Receive push notifications on your devices.</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className={`settings-section ${expandedSection === 'security' ? 'expanded' : ''}`}>
          <div
            className="section-header section-header-collapsed"
            onClick={() => toggleSection('security')}
          >
            <div className="section-header-content">
              <div className="section-icon-title">
                <Shield size={18} />
                <h2 className="section-title">Security</h2>
              </div>
              <p className="section-description">Manage your account security and password</p>
            </div>
            <ChevronRight className="chevron-icon" size={20} />
          </div>

          {expandedSection === 'security' && (
            <div className="section-body">
              <h3 className="security-section-title">Change Password</h3>

              <div className="form-group">
                <label className="form-label">Current Password</label>
                <div className="input-with-icon">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="form-input"
                    placeholder="••••••••••"
                  />
                  <span className="required-indicator">*</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="input-with-icon">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    placeholder="Enter new password (min 6 characters)"
                  />
                  <span className="required-indicator">*</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <div className="input-with-icon">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    placeholder="Confirm new password"
                  />
                  <span className="required-indicator">*</span>
                </div>
              </div>

              <button className="update-password-btn" onClick={handleUpdatePassword}>
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
