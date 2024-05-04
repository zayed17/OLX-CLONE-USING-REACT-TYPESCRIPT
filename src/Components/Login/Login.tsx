
// import Logo from '../../olx-logo.png';
import { useState } from 'react';
import './Login.css';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../firebase/config';
import {useNavigate,Link} from 'react-router-dom'

function Login() {
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      signInWithEmailAndPassword(auth,email,password)
      alert('success')
      navigate('/')
    } catch (error) {
      alert(error);     
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={"/signup"}><a>Signup</a></Link>
      </div>
    </div>
  );
}

export default Login;
