import React from "react";
// import logo from './logo.svg';
// import './App.css';

import TodoList from "./components/TodoComponents/TodoList";
import TodoForm from "./components/TodoComponents/TodoForm";

function App() {
  const [todos, setTodos] = React.useState([
    {
      //  task: '',
      //  id: '',
      //  completed: false
    }
  ]);
  const [todo, setTodo] = React.useState();

  function inputChangeHandler(event) {
    setTodo({ [event.target.name]: event.target.value });
  }

  function addTask(event) {
    event.perventDefault();
    let newTask = {
      task: todo,
      id: Date.now(),
      completed: false
    };
    setTodos([...todos, newTask]);
    setTodo({ todo: "" });
  }

  return (
    <div className="App">
      <h1>TO-DO List</h1>
      <TodoList todos={todos} />
      <TodoForm
        todos={todos}
        value={todo}
        inputChangeHandler={inputChangeHandler}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
