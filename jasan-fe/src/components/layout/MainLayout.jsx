import React, { useState } from 'react';
import { 
  CreditCard, 
  PieChart, 
  Settings, 
  User, 
  Bell, 
  Menu,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  PiggyBank
} from 'lucide-react';

export const MainLayout = ({ children }) => {
  // 현재 선택된 대메뉴 (기본값: 'asset')
  const [activeMainMenu, setActiveMainMenu] = useState('asset');
  // 현재 선택된 소메뉴 (사이드바 하이라이트용)
  const [activeSubMenu, setActiveSubMenu] = useState('가계부');

  // 대메뉴 데이터 정의
  const mainMenus = [
    { id: 'asset', label: '자산관리', icon: <PieChart size={20} /> },
    { id: 'community', label: '커뮤니티', icon: <User size={20} /> },
    { id: 'setting', label: '설정', icon: <Settings size={20} /> },
  ];

  // 대메뉴에 따른 소메뉴 데이터 정의 (매핑)
  const subMenus = {
    'asset': [
      { id: 'dashboard', label: '대시보드', icon: <LayoutDashboard size={18} /> },
      { id: 'ledger', label: '가계부', icon: <CreditCard size={18} /> },
      { id: 'savings', label: '예적금', icon: <PiggyBank size={18} /> },
      { id: 'stock', label: '주식/투자', icon: <TrendingUp size={18} /> },
    ],
    'community': [
      { id: 'board', label: '자유게시판', icon: <Menu size={18} /> },
      { id: 'qna', label: '질문답변', icon: <Menu size={18} /> },
    ],
    'setting': [
      { id: 'profile', label: '내 정보 수정', icon: <User size={18} /> },
      { id: 'alert', label: '알림 설정', icon: <Bell size={18} /> },
    ]
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      
      {/* 1. 상단 헤더바 (Header) */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 relative">
        {/* 로고 영역 */}
        <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Wallet />
          <span>MyMoney</span>
        </div>

        {/* 대메뉴 네비게이션 */}
        <nav className="hidden md:flex gap-8 h-full">
          {mainMenus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveMainMenu(menu.id)}
              className={`flex items-center gap-2 px-2 h-full border-b-2 transition-colors ${
                activeMainMenu === menu.id 
                  ? 'border-blue-600 text-blue-600 font-medium' 
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {menu.icon}
              <span>{menu.label}</span>
            </button>
          ))}
        </nav>

        {/* 우측 프로필/알림 */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            <User size={18} />
          </div>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 (Sidebar + Page Content) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 좌측 사이드바 (Sidebar) */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
          <div className="p-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Menu
            </h2>
            <div className="space-y-1">
              {/* 대메뉴(activeMainMenu)에 따라 바뀌는 소메뉴 리스트 */}
              {subMenus[activeMainMenu]?.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubMenu(sub.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeSubMenu === sub.label
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {sub.icon}
                  <span>{sub.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* 사이드바 하단 푸터 (선택사항) */}
          <div className="mt-auto p-6 border-t border-gray-100">
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-bold text-blue-800 text-sm mb-1">Pro 플랜 업그레이드</h4>
              <p className="text-xs text-blue-600 mb-3">더 많은 자산 기능을 이용해보세요.</p>
              <button className="w-full bg-blue-600 text-white text-xs py-2 rounded-lg hover:bg-blue-700">
                업그레이드
              </button>
            </div>
          </div>
        </aside>

        {/* 3. 실제 페이지 컨텐츠가 들어가는 곳 (Children) */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6 relative">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};