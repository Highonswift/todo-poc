import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import axios from "axios";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const formData = new FormData()
  const addTodo = (todo) => {
    // setTodos([
    //   ...todos,
    //   { id: uuidv4(), task: todo, completed: false, isEditing: false },
    // ]);
    setTodos(todo)
  }

  const deleteTodo = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}delete/${id}`).then((res) => {
      setTodos(res.data)
    })
    // setTodos(todos.filter((todo) => todo.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    formData.append("title", task)
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    //   )
    // );
    axios.post(`${process.env.REACT_APP_API_URL}update/${id}`, formData).then((res) => {
      setTodos(res.data)
    })
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL).then((res) => { 
      setTodos(res.data)
      console.log(res);
    })
  }, []);

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
