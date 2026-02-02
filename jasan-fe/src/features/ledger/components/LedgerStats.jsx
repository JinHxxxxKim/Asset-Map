import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader } from '../../../components/ui/Card';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

// 더미 데이터 (추후 API 연동)
const chartData = [
  { name: '식비', value: 400000 },
  { name: '교통', value: 150000 },
  { name: '쇼핑', value: 300000 },
  { name: '공과금', value: 100000 },
];

export const LedgerStats = ({ currentMonth }) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* 1. 요약 카드 영역 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col justify-between">
            <div className="flex items-center gap-2 text-red-500 mb-2">
                <ArrowDownCircle size={20} />
                <span className="font-semibold">이번 달 지출</span>
            </div>
            <span className="text-2xl font-bold">950,000원</span>
        </Card>
        <Card className="flex flex-col justify-between">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
                <ArrowUpCircle size={20} />
                <span className="font-semibold">이번 달 수입</span>
            </div>
            <span className="text-2xl font-bold">2,500,000원</span>
        </Card>
      </div>

      {/* 2. 메인 차트 영역 (높이 채우기) */}
      <Card className="flex-1 flex flex-col">
        <CardHeader 
            title={`${currentMonth}월 지출 분석`} 
            subTitle="어디에 가장 돈을 많이 썼을까요?" 
        />
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};