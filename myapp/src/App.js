import React, { useState } from 'react';
import Main from './components/pages/main/main';
import Classes from './components/pages/classe/classe';
import Racas from './components/pages/racas/racas';
import Feiticos from './components/pages/feiticos/feiticos';
import Equipamentos from './components/pages/equipamentos/equipamentos';
import Cabecalho from './components/cabecalho/cabecalho';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('Main');

  const trocaPage = (page) => {
    setActivePage(page);
    console.log(page);
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Raças':
        return <Racas />;
      case 'Classes':
        return <Classes />;
      case 'Feitiços':
        return <Feiticos />;
      case 'Equipamentos':
        return <Equipamentos />;
      default:
        return <Main />;
    }
  }

  return (
    <div className='layerMain'> 
      <Cabecalho onMenuChange={trocaPage} />
      {renderPage()}
    </div>
  );
}

export default App;