import React, { useContext, useReducer } from 'react';

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

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(inputState.emailValue, inputState.passValue);
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input
          lable={"User Name"}
          id={"username"}
          type={"text"}
        />
        <Input
          isValid={inputState.emailValid}
          lable={"E-Mail"}
          id={"email"}
          type={"email"}
          emailValue={inputState.emailValue}
          onChange={changeHandler}
          onBlur={validateHandler}
        />
        <Input
          isValid={inputState.passValid}
          lable={"Password"}
          id={"password"}
          type={"password"}
          emailValue={inputState.passValue}
          onChange={changeHandler}
          onBlur={validateHandler}
        />
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
