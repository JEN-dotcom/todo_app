import './App.css';
import React from 'react';
import { TodoProvider } from './TodoContext';
import TodoList from './components/TodoList';
import InputField from './components/InputField';

const App: React.FC = () => {
  return (
    <div className='App'>
      <span className='heading'>Taskify</span>

      <TodoProvider>
        <InputField />
        <TodoList />
      </TodoProvider>
    </div>
  );
};

export default App;