import React from "react";

const TodoForm = props => {
  return (
    <form>
      <input
        name="todo"
        type="text"
        placeholder="enter a task"
        onChange={props.inputChangeHandler}
      />
      <button onClick={props.addTask}>Add a Task</button>
      <button>Remove Completed</button>
    </form>
  );
};

export default TodoForm;
