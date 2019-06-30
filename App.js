import React from 'react';
import './App.css';
import CreateItem from './components/create.js';
import ItemTable from './components/table.js';
import Container from '@material-ui/core/Container';


function App() {
  return (
    <Container>
      <div><CreateItem/>
      <ItemTable/></div>
      </Container>
  );
}

export default App;