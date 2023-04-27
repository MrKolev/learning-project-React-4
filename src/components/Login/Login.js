import React, { useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT_EMAIL':
      return {
        emailValue: action.vel,
        emailValid: action.vel.includes("@"),
        passValue: state.passValue,
        passValid: state.passValid,
        formIsValid: state.passValid && action.vel.includes("@")
      }
    case 'INPUT_BLUR_EMAIL':
      return {
        emailValue: state.emailValue,
        emailValid: state.emailValue.includes("@"),
        passValue: state.passValue,
        passValid: state.passValid,
        formIsValid: state.passValid && state.emailValue.includes("@")
      }
    case 'USER_INPUT_PASSWORD':
      return {
        passValue: action.vel,
        passValid: action.vel.trim().length > 6,
        emailValue: state.emailValue,
        emailValid: state.emailValid,
        formIsValid: state.emailValid && action.vel.trim().length > 6
      }
    case 'INPUT_BLUR_PASSWORD':
      return {
        passValue: state.passValue,
        passValid: state.passValue.trim().length > 6,
        emailValue: state.emailValue,
        emailValid: state.emailValid,
        formIsValid: state.emailValid && state.passValue.trim().length > 6
      }
    default:
        return {
        emailValue: "",
        emailValid: null,
        passValue: "",
        passValid: null,
        formIsValid: false
      }
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    emailValue: "",
    emailValid: null,
    passValue: "",
    passValid: null,
    formIsValid: false
  });


  // useEffect(() => {

  //  const indefier = setTimeout(() => {
  //     // console.log("checking from validiti!");
  //     setFormIsValid(
  //       emailState.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 600)
  //   return ()=>{
  //     clearTimeout(indefier)
  //     // console.log("clin")
  //   }
  // }, [enteredEmail, enteredPassword])

  

  const changeHandler = (event) => {
    dispatchInput({ type: `USER_INPUT_${event.target.name.toUpperCase()}`, vel: event.target.value })
  };

  const validateHandler = (e) => {
    dispatchInput({ type: `INPUT_BLUR_${e.target.name.toUpperCase()}` })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(inputState.emailValue, inputState.passValue);
  };

  
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${inputState.emailValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            name='email'
            type="email"
            id="email"
            value={inputState.emailValue}
            onChange={changeHandler}
            onBlur={validateHandler}
          />
        </div>
        <div
          className={`${classes.control} ${inputState.passValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            name='password'
            type="password"
            id="password"
            value={inputState.passValue}
            onChange={changeHandler}
            onBlur={validateHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!inputState.formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
