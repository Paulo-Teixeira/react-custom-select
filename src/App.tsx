import React from 'react';
import Select from './features/select';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Select
        selectTitle="Pointure"
        id="SizeSelector"
        name="SizeSelector"
        placeholder="Veuillez sélectionner"
        numberOfVisibleOptions={6}
      />
    </div>
  );
}

export default App;
