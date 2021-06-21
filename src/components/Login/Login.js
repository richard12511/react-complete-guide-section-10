import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-context';

function emailReducer(state, action) {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.payload.value,
      isValid: action.payload.value.includes('@'),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
}

function passwordReducer(state, action) {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        value: action.payload.value,
        isValid: action.payload.value.trim().length > 6,
      };
    case 'INPUT_BLUR':
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default:
      return { value: '', isValid: false };
  }
}

const Login = (props) => {
  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });
  const authCtx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPasswordValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(isEmailValid && isPasswordValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    emailDispatch({
      type: 'USER_INPUT',
      payload: { value: event.target.value },
    });
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({
      type: 'USER_INPUT',
      payload: { value: event.target.value },
    });
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!isEmailValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          label="Username"
          type="email"
          id="email"
          value={emailState.value}
          isValid={isEmailValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          label="Password"
          type="password"
          id="password"
          value={passwordState.value}
          isValid={isPasswordValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
