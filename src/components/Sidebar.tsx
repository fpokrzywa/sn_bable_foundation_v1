import { Fish, Wrench, FolderOpen, ChevronRight, ChevronDown, User, Circle as CircleHelp, Users, PanelLeftClose, PanelLeftOpen, LogOut, Store, BookOpen, Settings, Building2 } from 'lucide-react';
import { useState } from 'react';

type PageType = 'chat' | 'ai-store' | 'prompt-catalog' | 'user-management' | 'role-management' | 'profile-settings' | 'find-answers';

interface SidebarProps {
  userEmail: string;
  onLogout: () => void;
  currentPage: PageType;
  onPageChange: (page: PageType, category?: string) => void;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ userEmail, onLogout, onPageChange, onCollapsedChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapsedChange(newCollapsed);
  };
  const [aiToolsOpen, setAiToolsOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(true);
  const [userOpen, setUserOpen] = useState(false);
  const [findAnswersOpen, setFindAnswersOpen] = useState(false);
  const [administrationOpen, setAdministrationOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Main Workspace');
  const [collapsedWorkspaceOpen, setCollapsedWorkspaceOpen] = useState(false);
  const [collapsedFindAnswersOpen, setCollapsedFindAnswersOpen] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1>
          <Fish className="logo-icon" />
          BabelPhish
        </h1>
        <button
          className="sidebar-toggle"
          onClick={toggleCollapsed}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {!collapsed && (
          <div className="nav-section">
            <div
              className={`nav-item ${aiToolsOpen ? 'active' : ''}`}
              onClick={() => {
                setAiToolsOpen(!aiToolsOpen);
                setWorkspaceOpen(false);
                setUserOpen(false);
                setFindAnswersOpen(false);
                setAdministrationOpen(false);
              }}
            >
              <Wrench className="icon" />
              <span>AI Tools</span>
              {aiToolsOpen ? (
                <ChevronDown className="chevron" />
              ) : (
                <ChevronRight className="chevron" />
              )}
            </div>

            {aiToolsOpen && (
              <div className="nav-subitems">
                <div
                  className={`nav-item ${activeItem === 'AI Store' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveItem('AI Store');
                    onPageChange('ai-store');
                  }}
                >
                  <Store className="icon" size={16} />
                  <span>AI Store</span>
                </div>
                <div
                  className={`nav-item ${activeItem === 'Prompt Catalog' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveItem('Prompt Catalog');
                    onPageChange('prompt-catalog');
                  }}
                >
                  <BookOpen className="icon" size={16} />
                  <span>Prompt Catalog</span>
                </div>
              </div>
            )}
          </div>
        )}

        {collapsed && (
          <>
            <div
              className="nav-item"
              onClick={() => {
                setActiveItem('AI Store');
                onPageChange('ai-store');
              }}
              title="AI Store"
            >
              <Store className="icon" />
            </div>
            <div
              className="nav-item"
              onClick={() => {
                setActiveItem('Prompt Catalog');
                onPageChange('prompt-catalog');
              }}
              title="Prompt Catalog"
            >
              <BookOpen className="icon" />
            </div>
          </>
        )}

        {!collapsed && (
          <div className="nav-section">
            <div
              className={`nav-item ${workspaceOpen ? 'active' : ''}`}
              onClick={() => {
                setWorkspaceOpen(!workspaceOpen);
                setAiToolsOpen(false);
                setUserOpen(false);
                setFindAnswersOpen(false);
                setAdministrationOpen(false);
              }}
            >
              <FolderOpen className="icon" />
              <span>Workspace</span>
              {workspaceOpen ? (
                <ChevronDown className="chevron" />
              ) : (
                <ChevronRight className="chevron" />
              )}
            </div>

            {workspaceOpen && (
              <div className="nav-subitems">
                <div
                  className={`nav-item ${activeItem === 'Main Workspace' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveItem('Main Workspace');
                    onPageChange('chat');
                  }}
                >
                  <FolderOpen className="icon" size={16} />
                  <span>Main Workspace</span>
                </div>
                <div
                  className={`nav-item ${activeItem === 'My Changes' ? 'active' : ''}`}
                  onClick={() => setActiveItem('My Changes')}
                >
                  <FolderOpen className="icon" size={16} />
                  <span>My Changes</span>
                </div>
                <div
                  className={`nav-item ${activeItem === 'Incidents' ? 'active' : ''}`}
                  onClick={() => setActiveItem('Incidents')}
                >
                  <FolderOpen className="icon" size={16} />
                  <span>Incidents</span>
                </div>
                <div
                  className={`nav-item ${activeItem === 'Bable' ? 'active' : ''}`}
                  onClick={() => setActiveItem('Bable')}
                >
                  <FolderOpen className="icon" size={16} />
                  <span>Bable</span>
                </div>
              </div>
            )}
          </div>
        )}

        {collapsed && (
          <div className="collapsed-menu-wrapper">
            <div
              className="nav-item"
              onClick={() => setCollapsedWorkspaceOpen(!collapsedWorkspaceOpen)}
              title="Workspace"
            >
              <FolderOpen className="icon" />
            </div>
            {collapsedWorkspaceOpen && (
              <div className="collapsed-submenu collapsed-submenu-open">
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('Main Workspace');
                    onPageChange('chat');
                    setCollapsedWorkspaceOpen(false);
                  }}
                >
                  <FolderOpen className="icon" size={16} />
                  <span>Main Workspace</span>
                </div>
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('My Changes');
                    setCollapsedWorkspaceOpen(false);
                  }}
                >
                  <FolderOpen className="icon" size={16} />
                  <span>My Changes</span>
                </div>
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('Incidents');
                    setCollapsedWorkspaceOpen(false);
                  }}
                >
                  <FolderOpen className="icon" size={16} />
                  <span>Incidents</span>
                </div>
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('Bable');
                    setCollapsedWorkspaceOpen(false);
                  }}
                >
                  <FolderOpen className="icon" size={16} />
                  <span>Bable</span>
                </div>
              </div>
            )}
          </div>
        )}

        {!collapsed && (
          <div className="nav-section">
            <div
              className={`nav-item ${userOpen ? 'active' : ''}`}
              onClick={() => {
                setUserOpen(!userOpen);
                setAiToolsOpen(false);
                setWorkspaceOpen(false);
                setFindAnswersOpen(false);
                setAdministrationOpen(false);
              }}
            >
              <User className="icon" />
              <span>User</span>
              {userOpen ? (
                <ChevronDown className="chevron" />
              ) : (
                <ChevronRight className="chevron" />
              )}
            </div>

            {userOpen && (
              <div className="nav-subitems">
                <div
                  className={`nav-item ${activeItem === 'Profile & Settings' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveItem('Profile & Settings');
                    onPageChange('profile-settings');
                  }}
                >
                  <User className="icon" size={16} />
                  <span>Profile & Settings</span>
                </div>
              </div>
            )}
          </div>
        )}

        {!collapsed && (
          <div className="nav-section">
            <div
              className={`nav-item ${findAnswersOpen ? 'active' : ''}`}
              onClick={() => {
                setFindAnswersOpen(!findAnswersOpen);
                setAiToolsOpen(false);
                setWorkspaceOpen(false);
                setUserOpen(false);
                setAdministrationOpen(false);
              }}
            >
              <CircleHelp className="icon" />
              <span>Find Answers</span>
              {findAnswersOpen ? (
                <ChevronDown className="chevron" />
              ) : (
                <ChevronRight className="chevron" />
              )}
            </div>

          {findAnswersOpen && (
            <div className="nav-subitems">
              <div
                className={`nav-item ${activeItem === 'IT Support Guides' ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem('IT Support Guides');
                  onPageChange('find-answers', 'itsupport');
                }}
              >
                <CircleHelp className="icon" size={16} />
                <span>IT Support Guides</span>
              </div>
              <div
                className={`nav-item ${activeItem === 'My Support Guides' ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem('My Support Guides');
                  onPageChange('find-answers', 'mysupport');
                }}
              >
                <CircleHelp className="icon" size={16} />
                <span>My Support Guides</span>
              </div>
              <div
                className={`nav-item ${activeItem === 'HR Policies' ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem('HR Policies');
                  onPageChange('find-answers', 'hrpolicies');
                }}
              >
                <CircleHelp className="icon" size={16} />
                <span>HR Policies</span>
              </div>
              <div
                className={`nav-item ${activeItem === 'NIEA Guides' ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem('NIEA Guides');
                  onPageChange('find-answers', 'nieaguides');
                }}
              >
                <CircleHelp className="icon" size={16} />
                <span>NIEA Guides</span>
              </div>
              <div
                className={`nav-item ${activeItem === 'ADEPT Guides' ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem('ADEPT Guides');
                  onPageChange('find-answers', 'adeptguides');
                }}
              >
                <CircleHelp className="icon" size={16} />
                <span>ADEPT Guides</span>
              </div>
              <div
                className={`nav-item ${activeItem === 'Freddie is IT' ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem('Freddie is IT');
                  onPageChange('find-answers', 'freddieit');
                }}
              >
                <CircleHelp className="icon" size={16} />
                <span>Freddie is IT</span>
              </div>
            </div>
          )}
        </div>
        )}

        {collapsed && (
          <div className="collapsed-menu-wrapper">
            <div
              className="nav-item"
              onClick={() => setCollapsedFindAnswersOpen(!collapsedFindAnswersOpen)}
              title="Find Answers"
            >
              <CircleHelp className="icon" />
            </div>
            {collapsedFindAnswersOpen && (
              <div className="collapsed-submenu collapsed-submenu-open">
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('IT Support Guides');
                    onPageChange('find-answers', 'itsupport');
                    setCollapsedFindAnswersOpen(false);
                  }}
                >
                  <CircleHelp className="icon" size={16} />
                  <span>IT Support Guides</span>
                </div>
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('My Support Guides');
                    onPageChange('find-answers', 'mysupport');
                    setCollapsedFindAnswersOpen(false);
                  }}
                >
                  <CircleHelp className="icon" size={16} />
                  <span>My Support Guides</span>
                </div>
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('HR Policies');
                    onPageChange('find-answers', 'hrpolicies');
                    setCollapsedFindAnswersOpen(false);
                  }}
                >
                  <CircleHelp className="icon" size={16} />
                  <span>HR Policies</span>
                </div>
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('NIEA Guides');
                    onPageChange('find-answers', 'nieaguides');
                    setCollapsedFindAnswersOpen(false);
                  }}
                >
                  <CircleHelp className="icon" size={16} />
                  <span>NIEA Guides</span>
                </div>
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('ADEPT Guides');
                    onPageChange('find-answers', 'adeptguides');
                    setCollapsedFindAnswersOpen(false);
                  }}
                >
                  <CircleHelp className="icon" size={16} />
                  <span>ADEPT Guides</span>
                </div>
                <div
                  className="collapsed-submenu-item"
                  onClick={() => {
                    setActiveItem('Freddie is IT');
                    onPageChange('find-answers', 'freddieit');
                    setCollapsedFindAnswersOpen(false);
                  }}
                >
                  <CircleHelp className="icon" size={16} />
                  <span>Freddie is IT</span>
                </div>
              </div>
            )}
          </div>
        )}

        {!collapsed && (
        <div className="nav-section">
          <div
            className={`nav-item ${administrationOpen ? 'active' : ''}`}
            onClick={() => {
              setAdministrationOpen(!administrationOpen);
              setAiToolsOpen(false);
              setWorkspaceOpen(false);
              setUserOpen(false);
              setFindAnswersOpen(false);
            }}
          >
            <Users className="icon" />
            <span>Administration</span>
            {administrationOpen ? (
              <ChevronDown className="chevron" />
            ) : (
              <ChevronRight className="chevron" />
            )}
          </div>

          {administrationOpen && (
            <div className="nav-subitems">
              <div
                className={`nav-item ${activeItem === 'User Management' ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem('User Management');
                  onPageChange('user-management');
                }}
              >
                <Users className="icon" size={16} />
                <span>User Management</span>
              </div>
              <div
                className={`nav-item ${activeItem === 'Role Management' ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem('Role Management');
                  onPageChange('role-management');
                }}
              >
                <Settings className="icon" size={16} />
                <span>Role Management</span>
              </div>
              <div
                className={`nav-item ${activeItem === 'Company Management' ? 'active' : ''}`}
                onClick={() => setActiveItem('Company Management')}
              >
                <Building2 className="icon" size={16} />
                <span>Company Management</span>
              </div>
            </div>
          )}
        </div>
        )}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="user-info">
            {userEmail}
          </div>
        )}
        <button
          className="logout-btn"
          onClick={onLogout}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut className="icon" size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
