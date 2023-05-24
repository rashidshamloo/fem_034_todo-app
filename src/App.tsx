// react
import { useEffect, useState } from 'react';

// custom hooks
import useTodos from './hooks/useTodos';

// components
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

// types
export type filter = 'all' | 'active' | 'completed';
export interface todo {
  id: string;
  completed: boolean;
  title: string;
}

const App = () => {
  // custom hook
  const {
    todoList,
    setTodoList,
    resetTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    clearCompleted,
  } = useTodos();

  // state
  const [filter, setFilter] = useState<filter>('all');

  useEffect(() => {
    // enable transitions after page load
    document.body.classList.remove('[&>div]:!transition-none');
  }, []);

  return (
    <div className="mx-auto w-full sm:max-w-[33.75rem]">
      <Header />
      <main className="mx-[6%] mt-6 sm:mx-0 sm:mt-8">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          filter={filter}
          setFilter={setFilter}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          clearCompleted={clearCompleted}
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
