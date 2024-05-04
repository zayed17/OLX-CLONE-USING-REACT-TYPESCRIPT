// import Logo from '../../olx-logo.png';
import { useContext, useState } from "react";
import "./Signup.css";
import { firebaseContext } from "../../store/FirebaseContext";
import { auth , db} from '../../firebase/config'
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate ,Link} from "react-router-dom";

export default function Signup() {
  const [name,setname] = useState<string>('')
  const [email,setemail] = useState<string>('')
  const [phone,setphone] = useState<string>('')
  const [password,setpassword] = useState<string>('')

  const firebaseApp = useContext(firebaseContext)!;
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user,{
        displayName: name
      });

      const userData = {
        userId: user.uid,
        username: name, 
        phone: phone, 
        email: email 
      };

      await addDoc(collection(db, "users"), userData);
      navigate('/login')
    } catch (error) { 
      console.error("Error creating user:", error);
    }
  };
  

  

  return (
    <div>
      <div className="signupParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input className="input" value={name} onChange={(e)=>setname(e.target.value)} type="text" id="fname" name="name"/>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input className="input" value={email} onChange={(e)=>setemail(e.target.value)} type="email" id="fname" name="email" />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input className="input" value={phone} onChange={(e)=>setphone(e.target.value)} type="number" id="lname" name="phone" />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input className="input" value={password} onChange={(e)=>setpassword(e.target.value)} type="password" id="lname" name="password" />
          <br />
          <br />
          <button>Signup</button>
        </form>
       <Link to={"/login"}><a>Login</a></Link> 
      </div>
    </div>
  );
}
