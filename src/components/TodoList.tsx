import { useRef } from 'react';

// framer motion
import { Reorder, AnimatePresence, motion } from 'framer-motion';

// react-responsive
import { useMediaQuery } from 'react-responsive';

// components
import Todo from './Todo';
import Filter from './Filter';

// types
import { filter } from '../App';

interface todoListProps {
  todoList: Array<{ id: string; title: string; completed: boolean }>;
  setTodoList: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        title: string;
        completed: boolean;
      }[]
    >
  >;
  filter: filter;
  setFilter: React.Dispatch<React.SetStateAction<filter>>;
}

const TodoList = ({
  todoList,
  setTodoList,
  filter,
  setFilter,
}: todoListProps) => {
  const ref = useRef<HTMLUListElement>();

  // Todo List modify functions
  const removeTodo = (id: string) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id: string) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed }
      )
    );
  };
  const clearCompleted = () => {
    setTodoList((prev) => prev.filter((todo) => !todo.completed));
  };

  // items left
  const itemsLeft = todoList.reduce(
    (acc, curr) => (!curr.completed ? ++acc : acc),
    0
  );

  // media query to change filter location
  const matches = useMediaQuery({ query: '(min-width: 600px)' });

  return (
    <AnimatePresence>
      {todoList.length > 0 && (
        <>
          <motion.div
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className={
              'overflow-hidden rounded-md bg-white shadow-[0_0.35rem_1rem] shadow-[rgba(0,0,0,0.15)] transition-[background-color] duration-500 dark:bg-veryDarkGrayishBlueD2 ' +
              (todoList.length > 0 ? 'mt-8' : '')
            }
          >
            <Reorder.Group
              axis="y"
              values={todoList}
              onReorder={setTodoList}
              className={'' + filter === 'all' ? 'cursor-grab' : ''}
              ref={ref}
            >
              <AnimatePresence>
                {todoList.map((item) => {
                  if (
                    filter === 'all' ||
                    (filter === 'completed' && item.completed) ||
                    (filter === 'active' && !item.completed)
                  ) {
                    return (
                      <Todo
                        key={item.id}
                        data={item}
                        removeTodo={removeTodo}
                        toggleTodo={toggleTodo}
                        containerRef={ref}
                        listFilter={filter}
                      />
                    );
                  }
                })}
              </AnimatePresence>
            </Reorder.Group>
            <motion.div
              layout
              className={
                'grid h-16 place-content-center rounded-md bg-white px-4 text-[14px] text-darkGrayishBlue transition-[background-color] duration-500 dark:bg-veryDarkGrayishBlueD2 dark:text-darkGrayishBlueD [&_button]:transition-[color] [&_button]:duration-500 hover:[&_button]:text-veryDarkGrayishBlue dark:hover:[&_button]:text-lightGrayishBlueHover ' +
                (matches ? 'grid-cols-3' : 'grid-cols-2')
              }
            >
              <p>
                <span>{itemsLeft}</span> item{itemsLeft !== 1 && 's'} left
              </p>
              {matches && <Filter filter={filter} setFilter={setFilter} />}
              <div className="text-right">
                <button onClick={clearCompleted}>Clear Completed</button>
              </div>
            </motion.div>
          </motion.div>
          {!matches && (
            <motion.div
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              key="filter"
              className="mt-5 flex h-16 items-center justify-center rounded-md bg-white text-lg shadow-[0_0.35rem_1rem] shadow-[rgba(0,0,0,0.15)] transition-[background-color] duration-500 dark:bg-veryDarkGrayishBlueD2"
            >
              <Filter filter={filter} setFilter={setFilter} />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default TodoList;
