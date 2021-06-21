import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef(
  ({ id, type, label, onChange, onBlur, isValid }, ref) => {
    const inputRef = useRef();

    const activate = () => {
      inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
      return {
        focus: activate,
      };
    });

    return (
      <div
        className={`${classes.control} ${
          isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} onChange={onChange} onBlur={onBlur}></input>
      </div>
    );
  }
);

export default Input;
