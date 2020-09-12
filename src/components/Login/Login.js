import React, { useState } from 'react';


import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbLogin, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';




function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

 const googleSignIn = () => {
   handleGoogleSignIn()
   .then(res => {
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
   })
 }

 const fbLogin = () => {
   handleFbLogin()
   .then(res => {
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
   })
 }

 const signOut = () => {
  handleSignOut()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
  })
 }



  const handleBlur = (e) =>{
    
      // console.log(e.target.name, e.target.value)
      let isFieldValid = true;
      if(e.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        
      }
      if(e.target.name === "password"){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && passwordHasNumber;
      }
      if(isFieldValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }
  }

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        })
    }
    e.preventDefault();
  }

 

  return (
    <div style={{textAlign: 'center'}}>
        {
          user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
        }
        <br/>
        <button onClick={fbLogin}>Sign in using Facebook</button>

        {
          user.isSignedIn && <div>
            <p>Welcome friend! {user.name}</p>
            <p>your email: {user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
        }
        <h1>Our own authentication</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New user Sign UP</label>
        
        <form onSubmit={handleSubmit}>
          {newUser && <input name="name" type="text" onBlur ={handleBlur} placeholder="Your name" required/>}
          <br/>
        <input  type="text" name="email" onBlur ={handleBlur} placeholder="write your email" required/>
        <br/>
        <input placeholder="type your password" type="password" onBlur ={handleBlur} name="password" id="" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'sign in'}/>
        </form>
        <p style={{color: "red"}}>{user.error}</p>
        {user.success && <p style={{color: "green"}}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}

    </div>
  );
}

export default Login;
