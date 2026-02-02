import React, { useState } from 'react';
import { LedgerStats } from './components/LedgerStats';
import { LedgerHistory } from './components/LedgerHistory';
import { AddTransactionModal } from './components/AddTransactionModal';
import { DateDetailModal } from './components/DateDetailModal'; // ✨ 새로 만든 모달 import
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// 임시 더미 데이터 (원래는 API나 LedgerHistory에 있던 것을 상위로 끌어올리거나 전역 상태로 관리해야 함)
// 상세 모달에 보여주기 위해 임시로 여기에 정의
const DUMMY_TRANSACTIONS = [
  { id: 1, date: '2024-05-20', category: '식비', title: '스타벅스', amount: -4500 },
  { id: 2, date: '2024-05-20', category: '교통', title: '택시비', amount: -12000 },
  { id: 4, date: '2024-05-18', category: '급여', title: '5월 급여', amount: 2500000 },
];

const LedgerPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // 상태 관리
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(''); // 클릭한 날짜 저장

  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  // 1. 달력 날짜 클릭 시 핸들러
  const handleDateClick = (dateStr) => {
    setSelectedDate(dateStr);
    setIsDetailModalOpen(true);
  };

  // 2. 상세 내역 모달에서 '추가하기' 버튼 클릭 시 핸들러
  const handleAddFromDetail = () => {
    setIsDetailModalOpen(false); // 상세 모달 닫고
    setIsAddModalOpen(true);     // 입력 모달 열기 (selectedDate가 유지된 상태)
  };

  const handleSaveTransaction = (data) => {
    console.log("저장:", data);
    alert('저장되었습니다!');
    // TODO: 데이터 리로드 로직
  };

  // 선택된 날짜에 해당하는 내역 필터링
  const selectedTransactions = DUMMY_TRANSACTIONS.filter(tx => tx.date === selectedDate);

  return (
    <div className="h-full flex flex-col gap-6">
      {/* 상단: 월 이동 컨트롤러 */}
      <header className="mb-6 flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">나의 자산 관리</h1>
            <p className="text-gray-500">오늘도 현명한 소비 하세요!</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm">
            <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
            <span className="text-xl font-bold min-w-[100px] text-center">2024년 {month}월</span>
            <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight /></button>
        </div>
      </header>

      {/* 메인 레이아웃: Grid System */}
      {/* Desktop: 12 컬럼 중 왼쪽 5칸(40%), 오른쪽 7칸(60%) 사용 */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
        
        {/* 왼쪽: 통계 및 시각화 */}
        <section className="md:col-span-5 h-full">
          <LedgerStats currentMonth={month} />
        </section>

        {/* 오른쪽: 리스트 및 캘린더 */}
        <section className="md:col-span-7 h-full">
          <LedgerHistory 
            currentYear={year}
            currentMonth={month}
            onDateClick={handleDateClick} 
          />
        </section>
      </main>
      {/* ✨ 1. 내역 입력 모달 */}
      <AddTransactionModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveTransaction}
        initialDate={selectedDate} // 선택된 날짜 전달
      />

      {/* ✨ 2. 날짜 상세 내역 모달 */}
      <DateDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        date={selectedDate}
        transactions={selectedTransactions}
        onAddClick={handleAddFromDetail}
      />
    </div>
  );
};

export default LedgerPage;