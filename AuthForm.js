import { useRef, useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {

  const emialInput = useRef();
  const passwordInput = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setLoading]=useState(false);

  const SubmitHandler = (e) => {
    e.preventDefault();
    //extract the value of from inputs usimg 

    const enterEmil = emialInput.current.value;
    const enterPassword = passwordInput.current.value;

    setLoading(true);
    //validation 
    if (isLogin) {

    }
    else {
      //if user is not login than he can create a new account
      //set firebase key to add the data into the firebasee database
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB99sjqsYiisTvfmZva93G51YFHvdyoJUg', {
        method: "POST",
        body: JSON.stringify({
          email: enterEmil,
          password: enterPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json"
        }
        //check if the response is ok with than because fetch returns a proise
      }
      ).then(res => {
        if (res.ok) {
          setLoading(false);
        }
        else {
          res.json().then(data => {
            let ErrorMessage="autn needed";
            if(data && data.error && data.error.message){

              //data.error.message comes from the firebase
              ErrorMessage=data.error.message;

            }
            alert(ErrorMessage);
          })
        }
      })

    }


  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emialInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          {/* //if not loading show the login */}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {/* //if loading is tue than show the message */}
          {isLoading && <h1>Loading....</h1>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
