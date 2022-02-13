import React from 'react';
import Select from './features/select';
import './App.scss';
import { DATA } from './assets/mockData';

function App() {
  return (
    <div className="App">
      <Select
        id="SizeSelector"
        name="SizeSelector"
        placeholder="Veuillez sélectionner"
        options={DATA}
      />
    </div>
  );
}

export default App;
