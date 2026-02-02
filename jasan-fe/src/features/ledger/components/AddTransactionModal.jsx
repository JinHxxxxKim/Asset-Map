import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Coffee, Bus, ShoppingBag, Utensils, Home, Smartphone, Briefcase, Gift } from 'lucide-react';

// 카테고리 목록 정의
const CATEGORIES = {
  expense: [
    { id: 'food', label: '식비', icon: <Utensils size={20}/> },
    { id: 'cafe', label: '카페/간식', icon: <Coffee size={20}/> },
    { id: 'transport', label: '교통', icon: <Bus size={20}/> },
    { id: 'shopping', label: '쇼핑', icon: <ShoppingBag size={20}/> },
    { id: 'living', label: '주거/통신', icon: <Home size={20}/> },
    { id: 'digital', label: '디지털', icon: <Smartphone size={20}/> },
  ],
  income: [
    { id: 'salary', label: '월급', icon: <Briefcase size={20}/> },
    { id: 'bonus', label: '보너스/부수입', icon: <Gift size={20}/> },
  ]
};

export const AddTransactionModal = ({ isOpen, onClose, onSave, initialDate }) => {
  // 폼 상태 관리
  const [type, setType] = useState('expense'); // 'expense' | 'income'
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(initialDate || new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState('');
  const [memo, setMemo] = useState('');

  React.useEffect(() => {
    if (isOpen && initialDate) {
      setDate(initialDate);
    } else if (isOpen && !initialDate) {
        setDate(new Date().toISOString().slice(0, 10));
    }
  }, [isOpen, initialDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 부모 컴포넌트로 데이터 전달
    onSave({ type, amount: Number(amount), date, category, memo });
    
    // 초기화 및 닫기
    setAmount('');
    setMemo('');
    setCategory('');
    onClose();
  };

  return (
    <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        title="새로운 내역 추가"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. 수입/지출 토글 */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`py-2 rounded-lg text-sm font-bold transition-all ${
              type === 'expense' ? 'bg-white text-red-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            지출
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`py-2 rounded-lg text-sm font-bold transition-all ${
              type === 'income' ? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            수입
          </button>
        </div>

        {/* 2. 날짜 및 금액 입력 */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">날짜</label>
            <input 
              type="date" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-100 outline-none font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">금액</label>
            <div className="relative">
                <input 
                type="number" 
                required
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-100 outline-none text-xl font-bold placeholder:text-gray-300"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">원</span>
            </div>
          </div>
        </div>

        {/* 3. 카테고리 선택 (Grid UI) */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">카테고리</label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES[type].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border transition-all ${
                  category === cat.id 
                    ? `border-${type === 'expense' ? 'red' : 'blue'}-500 bg-${type === 'expense' ? 'red' : 'blue'}-50 text-${type === 'expense' ? 'red' : 'blue'}-600` 
                    : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                }`}
              >
                {cat.icon}
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. 메모 입력 */}
        <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">메모 (선택)</label>
            <input 
              type="text" 
              placeholder="내용을 입력하세요"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-100 outline-none text-sm"
            />
        </div>

        {/* 5. 저장 버튼 */}
        <button 
          type="submit"
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform active:scale-[0.98] ${
            type === 'expense' ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-blue-500 hover:bg-blue-600 shadow-blue-200'
          }`}
        >
          저장하기
        </button>

      </form>
    </Modal>
  );
};