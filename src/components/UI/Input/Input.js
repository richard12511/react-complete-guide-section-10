import React, { useState } from 'react';
import classes from './Input.module.css';

const Input = ({ id, type, label, onChange, onBlur, className, isValid }) => {
  const [inputState, setInputState] = useState('');
  const inputChangedHandler = (event) => {
    setInputState(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={inputState.value}
        onChange={inputChangedHandler}
        onBlur={() => onBlur()}
      ></input>
    </div>
  );
};

export default Input;
