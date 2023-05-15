// react
import { useEffect, useState } from 'react';

// data
import defaultTodo from '../data/defaultTodo.json';

// types
interface todo {
  id: string;
  completed: boolean;
  title: string;
}

const useTodos = () => {
  // localStorage
  const todoListDefault = localStorage.getItem('todoList')
    ? JSON.parse(localStorage.getItem('todoList') as string)
    : defaultTodo;

  // states
  const [todoList, setTodoList] =
    useState<Array<{ id: string; title: string; completed: boolean }>>(
      todoListDefault
    );

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

  const resetTodoList = () => {
    setTodoList(defaultTodo);
  };

  const addTodo = (todo: todo) => {
    setTodoList((prev) => [todo, ...prev]);
  };

  // update localStorage for todoList
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return {
    todoList,
    setTodoList,
    resetTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    clearCompleted,
  };
};

export default useTodos;
