import "./styles.css";
import React from "react";
import useTodo from "../TodoContext";
import SingleTodo from "./SingleTodo";
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd";

const TodoList: React.FC = () => {
  const { todos, completedTodos, setCompletedTodos, dispatch } = useTodo();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, active = todos, complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    };

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);

    } else {
      complete.splice(destination.index, 0, add);
    };

    setCompletedTodos(complete);
    dispatch({ type: "update", payload: active });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <Droppable droppableId="TodosList">
          {provided => (
            <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
              <span className="todos__heading">Active Tasks</span>
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="TodosRemove">
          {provided => (
            <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
              <span className="todos__heading">Completed Tasks</span>
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  good
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TodoList