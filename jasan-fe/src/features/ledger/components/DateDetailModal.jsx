import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Plus, Coffee, Bus, ShoppingBag, Wallet } from 'lucide-react';

// 아이콘 매핑 (임시)
const ICON_MAP = {
    '식비': <Coffee size={20} />,
    '교통': <Bus size={20} />,
    '쇼핑': <ShoppingBag size={20} />,
    '급여': <Wallet size={20} />
};

export const DateDetailModal = ({ isOpen, onClose, date, transactions, onAddClick }) => {
  
  // 해당 날짜의 데이터만 필터링 (실제로는 백엔드에서 가져오거나 부모가 필터링해서 줌)
  // 여기서는 부모가 필터링해서 transactions prop으로 넘겨준다고 가정합니다.
  
  // 날짜 포맷팅 (YYYY-MM-DD -> M월 D일)
  const formatDate = (dateStr) => {
    if(!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${parseInt(m)}월 ${parseInt(d)}일`;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`${formatDate(date)} 상세 내역`}
    >
      <div className="space-y-6">
        
        {/* 1. 내역 리스트 영역 */}
        <div className="min-h-[200px]">
          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-500'}`}>
                            {ICON_MAP[tx.category] || <Wallet size={20}/>}
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">{tx.title}</p>
                            <p className="text-xs text-gray-400">{tx.category}</p>
                        </div>
                    </div>
                    <span className={`font-bold ${tx.amount > 0 ? 'text-blue-600' : 'text-gray-900'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                    </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                <p>내역이 없습니다.</p>
                <p className="text-xs">지출 내용을 기록해보세요!</p>
            </div>
          )}
        </div>

        {/* 2. 추가하기 버튼 */}
        <button
          onClick={onAddClick}
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          <Plus size={18} />
          이 날짜에 내역 추가하기
        </button>
      </div>
    </Modal>
  );
};