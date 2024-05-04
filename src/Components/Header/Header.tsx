import { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { auth } from '../../firebase/config'
import {useNavigate} from 'react-router-dom'
import { signOut} from "firebase/auth";
import { Link } from 'react-router-dom';


import { AuthContext } from '../../store/FirebaseContext';

function Header() {
  const navigate = useNavigate()
  const {user}=useContext(AuthContext)

  const handleLogout = async() =>{
    try {
      await auth.signOut()
      navigate('/login')

    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
      {user?.displayName == null ? (
        <Link to="/login">Login</Link> 
      ) : (
        <span>{user.displayName}</span>
      )}
      <hr />
    </div>

          {user&&<button onClick={handleLogout}>Logout</button>}
        <div className="sellMenu">
          <SellButton></SellButton>
         <Link to={"/create"}> <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
         </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
