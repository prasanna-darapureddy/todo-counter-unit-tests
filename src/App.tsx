import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MuiTodo from './components/muiTodo/MuiTodo';
// import Counter from './components/counter/Counter';
// import MuiCounter from './components/muiCounter/MuiCounter';

function App() {
  return (
    <div className="App" data-testid='counter-app'>
      <MuiTodo />
    </div>
  );
}

export default App;
