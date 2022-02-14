import React from 'react';
import Select from './features/select';
import './App.scss';
import { DATA } from './assets/mockData';

function App() {
  return (
    <div className="App">
      <Select
        selectTitle="Pointure"
        id="SizeSelector"
        name="SizeSelector"
        placeholder="Veuillez sélectionner"
        options={DATA}
        numberOfVisibleOptions={6}
      />
    </div>
  );
}

export default App;
