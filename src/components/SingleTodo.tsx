import "./styles.css";
import { Todo } from "../model";
import useTodo from "../TodoContext";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import { useEffect, useRef, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

type Props = {
    index: number;
    todo: Todo;
    good?: boolean
};

const SingleTodo: React.FC<Props> = ({ index, todo, good }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);
    const { handleDelete, handleDone, handleEdit } = useTodo();

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <form
                    ref={provided.innerRef}
                    className="todos__single"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onSubmit={e => handleEdit(e, todo.id, editTodo, setEdit, good)}
                >
                    {edit
                        ? (
                            <input
                                ref={inputRef}
                                value={editTodo}
                                onChange={e => setEditTodo(e.target.value)}
                                className="todos__single--text"
                            />
                        )
                        : todo.isDone
                            ? (<s className="todos__single--text" >{todo.todo}</s>)
                            : (<span className="todos__single--text" >{todo.todo}</span>)
                    }

                    <div>
                        <span
                            className="icon"
                            onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                };
                            }}
                        >
                            <AiFillEdit />
                        </span>

                        <span className="icon" onClick={() => handleDelete(todo.id, good)}>
                            <AiFillDelete />
                        </span>

                        <span className="icon" onClick={() => handleDone(todo.id, good)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
};

export default SingleTodo;