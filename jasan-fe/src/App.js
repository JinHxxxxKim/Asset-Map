import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import LedgerPage from './features/ledger/LedgerPage';

function App() {
  return (
    <MainLayout>
       {/* MainLayout의 {children} 자리로 들어갑니다 */}
      <LedgerPage />
    </MainLayout>
  );
}

export default App;