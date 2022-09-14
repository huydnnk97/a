import './Homepage.css';
import { Link } from 'react-router-dom';
// import {useLocation} from 'react-router-dom';


function Homepage (){
    // const location = useLocation();
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
        <button type="submit" className="head2">Post</button>
        <Link to='/signIn'>
        <button type="submit" className="head2" >LogIn</button>
        </Link>
        {/* <div>{user}</div> */}
    </form>
);}

export default Homepage;