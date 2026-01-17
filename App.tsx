
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from './store/useStore';
import { Dashboard } from './pages/Dashboard';
import { Onboarding } from './pages/Onboarding';
import { Marketplace } from './pages/Marketplace';
import { AdminDashboard } from './pages/AdminDashboard';
import { AssetEditor } from './pages/AssetEditor';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { UserRole, OccasionAsset } from './types';

const App: React.FC = () => {
  const { user, setUser, setAssets } = useStore();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    // Simulate Auth Session Check
    const checkAuth = async () => {
      // Mocked authenticated user for development
      const mockUser = {
        id: 'user_123',
        name: 'John Business',
        email: 'john@business.com',
        role: 'USER' as UserRole,
        credits: { images: 3, videos: 3 },
        brand: {
          companyName: 'Sunshine Bakery',
          industry: 'Food & Beverage',
          brandColors: ['#f59e0b', '#fbbf24'],
          fontStyle: 'playful' as const,
        }
      };
      
      // Load comprehensive assets across all months
      const mockAssets: OccasionAsset[] = [
        // January (0)
        { id: '101', title: 'Republic Day Parade', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 0, occasion: 'Republic Day', language: 'hi' },
        { id: '102', title: 'Makar Sankranti Kites', type: 'image', url: 'https://picsum.photos/seed/kites/800/1200', month: 0, occasion: 'Makar Sankranti', language: 'hi' },
        { id: '103', title: 'Happy Pongal Wishes', type: 'image', url: 'https://picsum.photos/seed/pongal/800/1200', month: 0, occasion: 'Pongal', language: 'en' },
        
        // February (1)
        { id: '201', title: 'Vasant Panchami Blessings', type: 'image', url: 'https://picsum.photos/seed/vasant/800/1200', month: 1, occasion: 'Vasant Panchami', language: 'hi' },
        { id: '202', title: 'Maha Shivratri Night', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 1, occasion: 'Maha Shivratri', language: 'hi' },
        { id: '203', title: 'Valentine Special', type: 'image', url: 'https://picsum.photos/seed/love/800/1200', month: 1, occasion: 'Valentine Day', language: 'en' },

        // March (2)
        { id: '301', title: 'Holi Colors Celebration', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 2, occasion: 'Holi', language: 'hi' },
        { id: '302', title: 'Gudi Padwa New Year', type: 'image', url: 'https://picsum.photos/seed/gudi/800/1200', month: 2, occasion: 'Gudi Padwa', language: 'mr' },
        { id: '303', title: 'Women Empowerment', type: 'image', url: 'https://picsum.photos/seed/women/800/1200', month: 2, occasion: 'Womens Day', language: 'en' },

        // April (3)
        { id: '401', title: 'Ram Navami Devotion', type: 'image', url: 'https://picsum.photos/seed/ram/800/1200', month: 3, occasion: 'Ram Navami', language: 'hi' },
        { id: '402', title: 'Eid Mubarak Greetings', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 3, occasion: 'Eid-ul-Fitr', language: 'en' },
        { id: '403', title: 'Baisakhi Festival', type: 'image', url: 'https://picsum.photos/seed/baisakhi/800/1200', month: 3, occasion: 'Baisakhi', language: 'hi' },

        // May (4)
        { id: '501', title: 'Labour Day Appreciation', type: 'image', url: 'https://picsum.photos/seed/labour/800/1200', month: 4, occasion: 'Labour Day', language: 'en' },
        { id: '502', title: 'Buddha Purnima Peace', type: 'image', url: 'https://picsum.photos/seed/buddha/800/1200', month: 4, occasion: 'Buddha Purnima', language: 'en' },
        { id: '503', title: 'Mothers Day Special', type: 'image', url: 'https://picsum.photos/seed/mother/800/1200', month: 4, occasion: 'Mothers Day', language: 'en' },

        // June (5)
        { id: '601', title: 'World Environment Day', type: 'image', url: 'https://picsum.photos/seed/nature/800/1200', month: 5, occasion: 'Environment Day', language: 'en' },
        { id: '602', title: 'International Yoga Day', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 5, occasion: 'Yoga Day', language: 'en' },
        { id: '603', title: 'Fathers Day Wishes', type: 'image', url: 'https://picsum.photos/seed/father/800/1200', month: 5, occasion: 'Fathers Day', language: 'en' },

        // July (6)
        { id: '701', title: 'Guru Purnima Gratitude', type: 'image', url: 'https://picsum.photos/seed/guru/800/1200', month: 6, occasion: 'Guru Purnima', language: 'hi' },
        { id: '702', title: 'Doctors Day Tribute', type: 'image', url: 'https://picsum.photos/seed/doctor/800/1200', month: 6, occasion: 'Doctors Day', language: 'en' },

        // August (7)
        { id: '801', title: 'Independence Day Pride', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 7, occasion: 'Independence Day', language: 'en' },
        { id: '802', title: 'Raksha Bandhan Love', type: 'image', url: 'https://picsum.photos/seed/rakhi/800/1200', month: 7, occasion: 'Raksha Bandhan', language: 'hi' },
        { id: '803', title: 'Janmashtami Celebration', type: 'image', url: 'https://picsum.photos/seed/krishna/800/1200', month: 7, occasion: 'Janmashtami', language: 'hi' },

        // September (8)
        { id: '901', title: 'Ganesh Chaturthi Utsav', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 8, occasion: 'Ganesh Chaturthi', language: 'hi' },
        { id: '902', title: 'Teachers Day Special', type: 'image', url: 'https://picsum.photos/seed/teacher/800/1200', month: 8, occasion: 'Teachers Day', language: 'en' },
        { id: '903', title: 'Onam Harvest', type: 'image', url: 'https://picsum.photos/seed/onam/800/1200', month: 8, occasion: 'Onam', language: 'en' },

        // October (9)
        { id: '1001', title: 'Gandhi Jayanti', type: 'image', url: 'https://picsum.photos/seed/gandhi/800/1200', month: 9, occasion: 'Gandhi Jayanti', language: 'en' },
        { id: '1002', title: 'Dussehra Victory', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 9, occasion: 'Dussehra', language: 'hi' },
        { id: '1003', title: 'Durga Puja Blessings', type: 'image', url: 'https://picsum.photos/seed/durga/800/1200', month: 9, occasion: 'Durga Puja', language: 'hi' },

        // November (10)
        { id: '1101', title: 'Diwali Festival of Lights', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 10, occasion: 'Diwali', language: 'hi' },
        { id: '1102', title: 'Happy Childrens Day', type: 'image', url: 'https://picsum.photos/seed/children/800/1200', month: 10, occasion: 'Childrens Day', language: 'en' },
        { id: '1103', title: 'Bhai Dooj Greetings', type: 'image', url: 'https://picsum.photos/seed/bhaidooj/800/1200', month: 10, occasion: 'Bhai Dooj', language: 'hi' },

        // December (11)
        { id: '1201', title: 'Merry Christmas', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', month: 11, occasion: 'Christmas', language: 'en' },
        { id: '1202', title: 'New Year Eve Celebration', type: 'image', url: 'https://picsum.photos/seed/newyear/800/1200', month: 11, occasion: 'New Year', language: 'en' },
        { id: '1203', title: 'Winter Solstice', type: 'image', url: 'https://picsum.photos/seed/winter/800/1200', month: 11, occasion: 'Winter', language: 'en' },
      ];

      setTimeout(() => {
        setUser(mockUser);
        setAssets(mockAssets);
        setIsAuthChecking(false);
      }, 1000);
    };

    checkAuth();
  }, [setUser, setAssets]);

  if (isAuthChecking) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg font-brand">AutoBrand Studio is initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {user && <Sidebar />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {user && <Navbar />}
          <main className="flex-1 overflow-y-auto bg-slate-50">
            <Routes>
              <Route path="/" element={user?.brand ? <Dashboard /> : <Onboarding />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/editor/:assetId" element={<AssetEditor />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
