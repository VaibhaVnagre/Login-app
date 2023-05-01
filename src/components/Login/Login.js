import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action)=>{
  if(action.type === "USER-INPUT"){
    return {value :action.val, isValid : action.val.includes('@')}
  }
  if(action.type === "INPUT_BLUR"){
    return {value :state.value, isValid : state.value.includes('@')}
  }
   return {value :"", isValid : false}
}

const passReducer =(state, action)=>{
  if(action.type === "USER-PASS"){
   return {value: action.val, isValid : action.val.trim().length>6}
  }
  if(action.type === "PASS"){
    return {value : state.value, isValid : state.value.trim().length>6}
  }
  return {value: "", isValid : false}
}
 
const clgReducer= (state, action)=>{
  if(action.type==="CLG-INPUT"){
    return {value : action.val, isValid: action.val.trim().length>5}
  }
  if(action.type==="CLG-VAL"){
    return {value : state.value, isValid : state.value.trim().length>5 }
  }
  return {value : "", isValid : false}
}

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredclg, setEnteredclg] = useState('');
  // const [clgIsvalid, setClgIsvalid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{value:"", isValid:null})
  const [passwordState, dispatchPass]= useReducer(passReducer, {value:"", isValid: null})
  const [clgState, dispatchClg] = useReducer (clgReducer,{value : "", isValid : null})

  // useEffect(()=>{
  //   const identifier = setTimeout(()=>{
  //     console.log("gotu")
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredclg.trim().length>5
  //     );
  //   },5000)
  //  return ()=>{
  //   //console.log("didi");
  //   clearTimeout(identifier)
  //  }
  // },[enteredEmail,enteredPassword,enteredclg])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER-INPUT", val : event.target.value})

  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type: "USER-PASS", val : event.target.value})
    
  };

  const validateEmailHandler = () => {
    dispatchEmail({type : "INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPass({type: "PASS"})
  };

  const ClgChangeHandler = (event)=>{
    dispatchClg({type:"CLG-INPUT", val : event.target.value})
    setFormIsValid(emailState.value.includes('@') && passwordState.value.trim().length>6 && event.target.value.trim().length>5)
  };

  const validateClgHandler = ()=>{
     dispatchClg({type: "CLG-VAL"})
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, clgState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            clgState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="clg">Collage</label>
          <input
            type="text"
            id="clg"
            value={clgState.value}
            onChange={ClgChangeHandler}
            onBlur={validateClgHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
