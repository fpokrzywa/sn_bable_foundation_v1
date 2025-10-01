import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { LoginPage } from './components/LoginPage';
import { AIStorePage } from './components/AIStorePage';
import { PromptCatalogPage } from './components/PromptCatalogPage';
import { UserManagementPage } from './components/UserManagementPage';
import { RoleManagementPage } from './components/RoleManagementPage';
import { ProfileSettingsPage } from './components/ProfileSettingsPage';
import { FindAnswersPage } from './components/FindAnswersPage';
import './App.css';

type PageType = 'chat' | 'ai-store' | 'prompt-catalog' | 'user-management' | 'role-management' | 'profile-settings' | 'find-answers';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [currentPage, setCurrentPage] = useState<PageType>('chat');
  const [findAnswersCategory, setFindAnswersCategory] = useState<string>('itsupport');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserEmail('');
    setIsLoggedIn(false);
  };

  const handlePageChange = (page: PageType, category?: string) => {
    setCurrentPage(page);
    if (page === 'find-answers' && category) {
      setFindAnswersCategory(category);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const getCategoryInfo = (category: string) => {
    const categoryMap: Record<string, { title: string; description: string }> = {
      'itsupport': {
        title: 'IT Support Guides',
        description: 'Quick solutions and how-to guides for common IT issues within the company.'
      },
      'mysupport': {
        title: 'My Support Guides',
        description: 'Your personal collection of support guides and documentation.'
      },
      'hrpolicies': {
        title: 'HR Policies',
        description: 'Company HR policies, procedures, and employee guidelines.'
      },
      'nieaguides': {
        title: 'NIEA Guides',
        description: 'NIEA-specific documentation and compliance guides.'
      },
      'adeptguides': {
        title: 'ADEPT Guides',
        description: 'ADEPT system guides and best practices documentation.'
      },
      'freddieit': {
        title: 'Freddie is IT',
        description: 'Freddie IT infrastructure and system documentation.'
      }
    };
    return categoryMap[category] || categoryMap['itsupport'];
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'ai-store':
        return <AIStorePage />;
      case 'prompt-catalog':
        return <PromptCatalogPage />;
      case 'user-management':
        return <UserManagementPage />;
      case 'role-management':
        return <RoleManagementPage />;
      case 'profile-settings':
        return <ProfileSettingsPage />;
      case 'find-answers': {
        const categoryInfo = getCategoryInfo(findAnswersCategory);
        return (
          <FindAnswersPage
            category={findAnswersCategory}
            title={categoryInfo.title}
            description={categoryInfo.description}
          />
        );
      }
      default:
        return <MainContent />;
    }
  };

  return (
    <div className={`app ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        userEmail={userEmail}
        onLogout={handleLogout}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onCollapsedChange={setSidebarCollapsed}
      />
      {renderPage()}
    </div>
  );
}

export default App;
