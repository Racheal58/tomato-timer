import React from "react";
// import logo from './logo.svg';
// import './App.css';

import TodoList from "./components/TodoComponents/TodoList";
import TodoForm from "./components/TodoComponents/TodoForm";
import Pomodoro from "./components/Timer-Components/Pomodoro";

function App() {
  const [todos, setTodos] = React.useState([
    {
      //  task: '',
      //  id: '',
      //  completed: false
    }
  ]);
  const [todo, setTodo] = React.useState();
  const [restMinutes, setRestMinutes] = React.useState(5);
  const [workMinutes, setWorkMinutes] = React.useState(25);
  const [seconds, setSeconds] = React.useState(0);
  const [breakTime, setBreakTime] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [intervalState, setIntervalState] = React.useState("");

  React.useEffect(() => {
    addLocalStorage();
    window.addEventListener("beforeunload", saveLocalStorage());
  });

  React.useEffect(() => {
    window.removeEventListener("beforeunload", saveLocalStorage());
  });

  function inputChangeHandler(event) {
    setTodo({ [event.target.name]: event.target.value });
  }

  function addTask(event) {
    event.preventDefault();
    let newTask = {
      task: todo,
      id: Date.now(),
      completed: false
    };
    setTodos([...todos, newTask]);
    setTodo({ todo: "" });
  }

  function toggleComplete(itemId) {
    const todos = todos.map(todo => {
      if (todo.id === itemId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos({ todo: "" });
  }

  function removeItems(event) {
    event.preventDefault();
    setTodos(prevState => {
      return {
        todos: prevState.todos.filter(todo => {
          return !todo.completed;
        })
      };
    });
  }

  function addLocalStorage() {
    // for (let key in state) {
    //   if (localStorage.hasOwnProperty(key)) {
    //     let value = localStorage.getItem(key);
    //     try {
    //       value = JSON.parse(value)
    //        setState({[key]: value})
    //     } catch (error) {
    //      setState({[key]: value})
    //     }
    //   }
    // }
    //* get todos from local storage
    let allTodos = localStorage.getItem("todos");

    //* parse data back to array
    if (allTodos) {
      let parsedTodos = JSON.parse(allTodos);

      //* compare state array to localstorage array
      if (todos.length !== parsedTodos.length) {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    }
    // else {
    //   localStorage.setItem("todos", JSON.stringify(todos));
    // }
  }

  function saveLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function timer() {
    setSeconds({
      seconds: seconds === 0 ? 59 : seconds - 1
    });

    if (breakTime) {
      setRestMinutes({
        restMinutes:
          seconds === 0 ? restMinutes - 1 : restMinutes === 5 ? 4 : restMinutes
      });
    }

    if (restMinutes === -1) {
      setRestMinutes({ restMinutes: 5 });
      setBreakTime({ breakTime: false });
    } else {
      setWorkMinutes({
        workMinutes:
          seconds === 0
            ? workMinutes - 1
            : workMinutes === 25
            ? 24
            : workMinutes
      });

      if (workMinutes === -1) {
        setWorkMinutes({ workMinutes: 25, breakTime: true });
      }
    }
  }

  function startTimer() {
    setIntervalState({
      intervalState: setIntervalState(timer(), 1000),
      start: !start
    });
  }

  function pauseTimer() {
    setRestMinutes(prevState => {
      return {
        restMinutes: prevState.restMinutes
      };
    });
    setWorkMinutes(prevState => {
      return {
        workMinutes: prevState.workMinutes
      };
    });
    setSeconds(prevState => {
      return {
        seconds: prevState.seconds
      };
    });
    setBreakTime(prevState => {
      return {
        breakTime: prevState.breakTime
      };
    });
    setStart(prevState => {
      return {
        start: prevState.start
      };
    });
    setIntervalState(prevState => {
      return {
        intervalState: clearInterval(prevState.intervalState)
      };
    });
  }

  return (
    <div className="App">
      <h1>TO-DO List</h1>
      <TodoList todos={todos} toggleComplete={toggleComplete} />
      <TodoForm
        todos={todos}
        value={todo}
        inputChangeHandler={inputChangeHandler}
        addTask={addTask}
        removeItems={removeItems}
      />
      <Pomodoro
        timer={timer()}
        workMinutes={workMinutes}
        restMinutes={restMinutes}
        seconds={seconds}
        start={start}
        breakTime={breakTime}
        startTimer={startTimer()}
        pauseTimer={pauseTimer()}
      />
    </div>
  );
}

export default App;
