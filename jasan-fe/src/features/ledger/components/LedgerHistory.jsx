import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { List, Calendar as CalendarIcon, Coffee, Bus, ShoppingBag, Wallet } from 'lucide-react';

// 더미 내역 데이터
const transactions = [
  { id: 1, date: '2024-05-20', category: '식비', title: '스타벅스', amount: -4500, icon: <Coffee size={18}/> },
  { id: 2, date: '2024-05-20', category: '교통', title: '택시비', amount: -12000, icon: <Bus size={18}/> },
  { id: 3, date: '2024-05-19', category: '쇼핑', title: '무신사', amount: -58000, icon: <ShoppingBag size={18}/> },
  { id: 4, date: '2024-05-18', category: '급여', title: '5월 급여', amount: 2500000, type: 'income', icon: <Wallet size={18}/> },
];

export const LedgerHistory = ({ onDateClick, currentYear = 2024, currentMonth = 5 }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'

// 간단한 날짜 생성 함수 (YYYY-MM-DD 형식)
  const getDateString = (day) => {
    const m = currentMonth.toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  return (
    <Card className="h-full flex flex-col">
      {/* 헤더: 뷰 모드 전환 버튼 */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">상세 내역</h3>
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-400'}`}
          >
            <List size={20} />
          </button>
          <button 
            onClick={() => setViewMode('calendar')}
            className={`p-2 rounded-md transition-all ${viewMode === 'calendar' ? 'bg-white shadow text-blue-600' : 'text-gray-400'}`}
          >
            <CalendarIcon size={20} />
          </button>
        </div>
      </div>

      {/* 본문: 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto pr-2">
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${tx.type === 'income' ? 'bg-blue-100 text-blue-600' : 'bg-red-50 text-red-500'}`}>
                    {tx.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{tx.title}</p>
                    <p className="text-xs text-gray-400">{tx.date} · {tx.category}</p>
                  </div>
                </div>
                <span className={`font-bold ${tx.type === 'income' ? 'text-blue-600' : 'text-gray-800'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}원
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* 캘린더 뷰 수정 */
          <div className="grid grid-cols-7 gap-1 text-center">
            {['일','월','화','수','목','금','토'].map(d => <div key={d} className="text-sm font-bold text-gray-400 py-2">{d}</div>)}
            
            {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const dateStr = getDateString(day);
                // 더미 데이터에서 해당 날짜에 내역이 있는지 확인
                // (실제로는 transactions 배열을 필터링해야 함)
                const hasTx = transactions.some(tx => tx.date === dateStr);

                return (
                  <div 
                    key={i} 
                    onClick={() => onDateClick(dateStr)} // ✨ 클릭 이벤트 추가!
                    className="aspect-square border border-gray-100 rounded-lg flex flex-col justify-between p-1 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
                  >
                    <span className="text-xs text-gray-500 text-left font-medium">{day}</span>
                    {hasTx && <div className="w-1.5 h-1.5 bg-red-400 rounded-full self-end mb-1 mr-1"></div>}
                  </div>
                );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};