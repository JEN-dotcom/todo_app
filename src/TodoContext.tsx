import { Todo } from "./model";
import TodoReducer, { Actions } from "./reducers/todoReducer";
import React, { createContext, useReducer, PropsWithChildren, useContext, useState } from "react";

type TodoContextType = {
    todos: Todo[];
    completedTodos: Todo[];
    dispatch: React.Dispatch<Actions>;
    handleAdd: (e: React.FormEvent, todo: string) => void;  
    handleEdit:
    (
        e: React.FormEvent,
        id: number,
        editTodo:string,
        setEdit: React.Dispatch<React.SetStateAction<boolean>>,
        good: boolean | undefined
    ) => void;
    handleDone: (id: number, good: boolean | undefined) => void;
    handleDelete: (id: number, good: boolean | undefined) => void;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, dispatch] = useReducer(TodoReducer, []);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
    
  const handleAdd = (e: React.FormEvent, todo: string) => {
    e.preventDefault();

    if (todo) {        
        const updatedTodo:Todo[] = [...todos, {id:Date.now(), todo, isDone: false}];
        dispatch({type: "update", payload: updatedTodo});    
    };
  };

  const handleDelete = (id:number, good: boolean | undefined) => {
    const filteredTodo:Todo[] = todos.filter(todo => todo.id !== id);
    const CompletedTodo:Todo[] = completedTodos.filter(todo => todo.id !== id);

    good ? setCompletedTodos(CompletedTodo) :dispatch({type: "update", payload: filteredTodo});
  };

  const handleDone = (id:number, good: boolean | undefined) => {
    const doneTodo:Todo[] = todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo);
    const CompletedTodo:Todo[] = completedTodos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo);

    good ? setCompletedTodos(CompletedTodo): dispatch({type: "update", payload:doneTodo});
  };

  const handleEdit =
  (
    e: React.FormEvent,
    id: number,
    editTodo: string,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    good: boolean | undefined
  ) => {
    e.preventDefault();

    const editedTodo =  todos.map(todo => (todo.id === id ? {...todo, todo: editTodo }: todo));
    const completedTodo =  completedTodos.map(todo => (todo.id === id ? {...todo, todo: editTodo }: todo));

    good ? setCompletedTodos(completedTodo) : dispatch({type: "update", payload:editedTodo});
    
    setEdit(false);
  };

  const value = {
    todos,
    dispatch,
    handleAdd,
    handleEdit,
    handleDone,
    handleDelete,
    completedTodos,
    setCompletedTodos,
  }
    
  return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
  );
};

const useTodo = () => {
    const context = useContext(TodoContext) as TodoContextType;

    if (context === undefined) {
        throw new Error("useTodo must be within TodoContext");
    };
    return context;
};

export default useTodo;