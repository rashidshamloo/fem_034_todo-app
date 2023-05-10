import { useEffect, useState } from 'react';

// components
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

// data
import defaultTodo from './data/defaultTodo.json';

// types
export type filter = 'all' | 'active' | 'completed';

const App = () => {
  // localStorage
  const todoListDefault = localStorage.getItem('todoList')
    ? JSON.parse(localStorage.getItem('todoList') as string)
    : defaultTodo;

  // states
  const darkModeDefault = localStorage.getItem('darkMode') === 'true';
  if (darkModeDefault) document.body.classList.add('dark');
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  const [todoList, setTodoList] =
    useState<Array<{ id: string; title: string; completed: boolean }>>(
      todoListDefault
    );
  const [filter, setFilter] = useState<filter>('all');

  // handle events
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.key === 'Z') {
      resetTodoList();
    }
  };

  const resetTodoList = () => {
    setTodoList(defaultTodo);
  };

  // update localStorage for todoList
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  // update localStorage for darkMode
  useEffect(() => {
    darkMode
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark');
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // enable transitions after page load
    document.body.classList.remove('[&>div]:!transition-none');
    // add "shift+z" keyDown handler
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="mx-auto w-full sm:max-w-[33.75rem]">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="mx-[6%] mt-6 sm:mx-0 sm:mt-8">
        <AddTodo setTodoList={setTodoList} />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          filter={filter}
          setFilter={setFilter}
        />
      </main>
      <Footer
        show={todoList.length > 0}
        resetTodoList={resetTodoList}
        filter={filter}
      />
    </div>
  );
};

export default App;
