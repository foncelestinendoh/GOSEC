import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Home, Users, Image, Calendar, FileText, MessageSquare, 
  DollarSign, LogOut, Menu, X, Settings
} from 'lucide-react';
import { contentApi, programsApi, galleryApi, eventsApi, formsApi } from '@/services/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    programs: 0,
    gallery: 0,
    events: 0,
    contacts: 0,
    donations: 0,
    joins: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [programs, gallery, events] = await Promise.all([
          programsApi.getAll(),
          galleryApi.getAll(),
          eventsApi.getAll()
        ]);
        setStats(prev => ({
          ...prev,
          programs: programs.data.length,
          gallery: gallery.data.length,
          events: events.data.length
        }));
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Hero & About', path: '/admin/content', icon: FileText },
    { name: 'Programs', path: '/admin/programs', icon: Users },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Form Submissions', path: '/admin/forms', icon: MessageSquare },
  ];

  const statsCards = [
    { title: 'Programs', count: stats.programs, icon: Users, color: 'bg-blue-500' },
    { title: 'Gallery Items', count: stats.gallery, icon: Image, color: 'bg-green-500' },
    { title: 'Events', count: stats.events, icon: Calendar, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[var(--brand-dark)] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-bold">GOSEC Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm">Welcome, {user?.username}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="text-white border-white hover:bg-white hover:text-[var(--brand-dark)]"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${mobileMenuOpen ? 'block' : 'hidden'} 
          lg:block w-64 bg-white shadow-lg min-h-[calc(100vh-64px)]
          fixed lg:static z-50 lg:z-auto
        `}>
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-4 border-t">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <Home size={20} />
                <span>View Site</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statsCards.map((stat) => (
                <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-800">{stat.count}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.color}`}>
                        <stat.icon size={24} className="text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your site content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link to="/admin/content">
                    <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                      <FileText size={20} />
                      <div className="text-left">
                        <div className="font-medium">Edit Hero & About</div>
                        <div className="text-xs text-gray-500">Update homepage content</div>
                      </div>
                    </Button>
                  </Link>
                  <Link to="/admin/programs">
                    <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                      <Users size={20} />
                      <div className="text-left">
                        <div className="font-medium">Manage Programs</div>
                        <div className="text-xs text-gray-500">Add or edit programs</div>
                      </div>
                    </Button>
                  </Link>
                  <Link to="/admin/events">
                    <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                      <Calendar size={20} />
                      <div className="text-left">
                        <div className="font-medium">Manage Events</div>
                        <div className="text-xs text-gray-500">Add upcoming events</div>
                      </div>
                    </Button>
                  </Link>
                  <Link to="/admin/gallery">
                    <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                      <Image size={20} />
                      <div className="text-left">
                        <div className="font-medium">Manage Gallery</div>
                        <div className="text-xs text-gray-500">Add gallery images</div>
                      </div>
                    </Button>
                  </Link>
                  <Link to="/admin/forms">
                    <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                      <MessageSquare size={20} />
                      <div className="text-left">
                        <div className="font-medium">View Form Submissions</div>
                        <div className="text-xs text-gray-500">Contact & join requests</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
