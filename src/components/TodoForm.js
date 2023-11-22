import axios from 'axios';
import React, { useState } from 'react'

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const formData = new FormData()
  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    if (value) {
      // add todo
      formData.append("title", value);
      axios.post("https://todo-4kyh.onrender.com/", formData).then((res) => {
        console.log(res);
        addTodo(res.data);
      })
      // clear form after submission
      setValue('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
      <button type="submit" className='todo-btn'>Add Task</button>
    </form>
  )
}
