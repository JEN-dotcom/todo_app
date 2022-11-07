import './styles.css';
import useTodo from '../TodoContext';
import React, { useRef, useState } from 'react';

const InputField: React.FC = () => {
  const { handleAdd } = useTodo();
  const [todo, setTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='input'
      onSubmit = {e =>{
        handleAdd(e, todo);
        inputRef.current?.blur();
        setTodo("");
      }}>
      <input
        type="input"
        value={todo}
        ref={inputRef}
        className='input__box'
        placeholder='Enter a task'
        onChange={e => setTodo(e.target.value)}
      />
      <button className='input_submit' type='submit'>Go</button>
    </form>
  );
};

export default InputField;