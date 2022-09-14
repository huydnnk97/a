import { useState, useEffect,React } from "react";
import "./SignIn.css";
import { db } from "./firebase-config";
import {
    
    getDocs,
    collection,
    query,
    where
    
  } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// const user=React.createContext('light')

function SignIn() {
  const [cookies, setCookie] = useCookies(['user']);
  const navigate =  useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  async function checkUser() {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);
    if(querySnapshot.size==0){
      console.log("Your email are incorrect, please try again")
    }else{
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      
      if (password === doc.data().password) {

        console.log("ok")
        setCookie('email', email, { path: '/' });
        setCookie('password', password, { path: '/' });
        navigate('/')
      }
      else console.log("fail")
    });
    }
  }
  return (
    <div className="SignIn">
      
    <div className="huy">
      <Link className="SignUpBtn" to ="../signUp">
    <button >SignUp</button>
    </Link>
      <label>Your email</label>
      <input onChange={(event)=>{setEmail(event.target.value)
      console.log(email)}}></input>
      <label>Your password</label>
      <input onChange={(event)=>{setPassword(event.target.value)}}></input>
      {/* <div>{this.user}</div> */}
      <button className="Login" onClick={ () => {
        
checkUser()

      }}>Login</button>
      
    </div>
    {cookies.email && (
      <div>
         Name: <p>{cookies.email}</p>
      </div>
      )}
      {cookies.password && (
      <div>
         Password: <p>{cookies.password}</p>
      </div>
      )}
    </div>
  );
}

export default SignIn;