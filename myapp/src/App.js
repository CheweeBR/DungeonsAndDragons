import React, { useState } from 'react';
import Main from './components/pages/main/main';
import Classes from './components/pages/classe/classe';
import Racas from './components/pages/racas/racas';
import Feiticos from './components/pages/feiticos/feiticos';
import Cabecalho from './components/cabecalho/cabecalho';
import ConfigMenu from './components/configMenu/configMenu';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('Main');

  const trocaPage = (page) => {
    setActivePage(page);
    console.log(page);
  }


  const renderPage = () => {
    switch (activePage) {
      case 'Racas':
        return <Racas />;
      case 'Classes':
        return <Classes />;
      case 'Feiticos':
        return <Feiticos />;
      case 'Equipamentos':
      default:
        return <Main />;
    }
  }

  return (
    <div className='layerMain'> 
      <Cabecalho onMenuChange={trocaPage} />
      {renderPage()}
      <ConfigMenu />
    </div>
  );
}

export default App;
