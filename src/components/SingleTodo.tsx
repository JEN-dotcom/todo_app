
import { Todo } from "../model";
type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


const SingleTodo: React.FC<Props> = ({todo, todos, setTodos}) => {
    const handleDone = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, isDone: !todo.isDone} : todo
            ))
    }


  return (
    <form>

        <span>{todo.todo}</span>

        <div>
            <span onClick={() => handleDone(todo.id)}></span>
        </div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        SingleTodo

    </form>
  )
}

export default SingleTodo