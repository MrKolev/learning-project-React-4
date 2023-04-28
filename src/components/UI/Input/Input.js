import classes from './Input.module.css';


export const Input = (
    { isValid,
        lable,
        id,
        type,
        emailValue,
        onChange,
        onBlur
    }
) => {

    return (
        <div
            className={`${classes.control} ${isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={id}>{lable}</label>
            <input
                name={id}
                type={type}
                id={id}
                value={emailValue}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
}