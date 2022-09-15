import './Homepage.css';
import { Link } from 'react-router-dom';
// import {useLocation} from 'react-router-dom';
import {UserContext}from './context/use.context'
import {useContext}from "react"

function Homepage (){
    const {currentUser}=useContext(UserContext)
    const { setCurrentUser } = useContext(UserContext)
    // console.log(currentUser)
    return(
    <form action="/" method="get">
        <button className="head1">
            DEV@DEAKIN
        </button>
        <input
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s" 
            className='SearchInput'
        />
        <button type="submit" className="head2" >Post</button>
       
        {currentUser &&<button className="head2" onClick={()=>setCurrentUser("")}>Sign out</button>||
        <Link to='/signIn'>
        <button type="submit" className="head2" >LogIn</button>

        </Link>}
        {currentUser &&<h1>{currentUser}</h1>}
        
    </form>
);}

export default Homepage;