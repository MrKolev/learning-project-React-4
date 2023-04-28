import React, { useContext, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { AuthContext } from '../../store/auth-context';
import { Input } from '../UI/Input/Input';

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

const Login = () => {
  const ctx = useContext(AuthContext)
  const emailRef = useRef();
  const passRef = useRef();

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    emailValue: "",
    emailValid: null,
    passValue: "",
    passValid: null,
    formIsValid: false
  });

  const changeHandler = (event) => {
    dispatchInput({ type: `USER_INPUT_${event.target.name.toUpperCase()}`, vel: event.target.value })
  };

  const validateHandler = (e) => {
    dispatchInput({ type: `INPUT_BLUR_${e.target.name.toUpperCase()}` })
  };

  const { emailValue, emailValid,
    passValue, passValid,
    formIsValid } = inputState;

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      ctx.onLogin(emailValue, passValue);
    } else if (!emailValid) {
      emailRef.current.focus()
    } else if (!passValid) {
      passRef.current.focus();

    }
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          isValid={emailValid}
          lable={"E-Mail"}
          id={"email"}
          type={"email"}
          emailValue={emailValue}
          onChange={changeHandler}
          onBlur={validateHandler}
        />
        <Input
          ref={passRef}
          isValid={passValid}
          lable={"Password"}
          id={"password"}
          type={"password"}
          emailValue={passValue}
          onChange={changeHandler}
          onBlur={validateHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
