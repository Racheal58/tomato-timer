import React from "react";
import Todo from "./Todo";

const TodoList = props => {
  return (
    <div>
      {props.todos.map((todo, id) => (
        <Todo todo={todo} id={id} />
      ))}
    </div>
  );
};

export default TodoList;
