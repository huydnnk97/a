import { useState, useEffect, React, useContext } from "react";
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



import { signInWithGooglePopup, createUserDocFromAuth, signinAuthUserWithEmailAndPassword } from "./firebase-config"
import { UserContext } from "./context/use.context";

function SignIn() {
  const navigate = useNavigate()
  const { setCurrentUser } = useContext(UserContext)
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user)
    setCurrentUser(user.email)
    navigate('/')
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function checkUser() {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0) {
      console.log("Your email are incorrect, please try again")
    } else {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        if (password === doc.data().password) {
          setCurrentUser(doc.data().email)
          navigate('/')
        }
        else console.log("fail")
      });
    }
  }
  return <div className="SignIn">


    <div className="huy">
      <Link className="SignUpBtn" to="../signUp">
        <button >SignUp</button>
      </Link>
      <label>Your email</label>
      <input onChange={(event) => {
        setEmail(event.target.value)
        console.log(email)
      }}></input>
      <label>Your password</label>
      <input onChange={(event) => { setPassword(event.target.value) }}></input>
      {/* <div>{this.user}</div> */}
      <button className="Login" onClick={() => {

        checkUser()

      }}>Login</button>

    </div>
    <br></br>
    <button onClick={logGoogleUser}>
      Log in with Google
    </button>
    <br></br>
    <br></br>

    <Link to='/signup'>
      Sign up instead
    </Link>

  </div>

}
export default SignIn