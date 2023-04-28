import React from 'react';
import { useImperativeHandle, useRef } from 'react';
import classes from './Input.module.css';


export const Input = React.forwardRef((
    { isValid,
        lable,
        id,
        type,
        emailValue,
        onChange,
        onBlur,
    }, ref
) => {
    const inputRef = useRef();

    const activete = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activete
        }
    })

    return (
        <div
            className={`${classes.control} ${isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={id}>{lable}</label>
            <input
                ref={inputRef}
                name={id}
                type={type}
                id={id}
                value={emailValue}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
});