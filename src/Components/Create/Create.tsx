import { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import Card from "react-bootstrap/Card";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/config"; 
import { collection, addDoc } from "firebase/firestore"; 
import { AuthContext } from "../../store/FirebaseContext";
import {useNavigate} from 'react-router-dom'

const Create = () => {
  const [name, setname] = useState<string>("");
  const [category, setcategory] = useState<string>("");
  const [price, setprice] = useState<string>("");
  const [image, setimage] = useState<File | null>(null); 

  const navigate = useNavigate()
  const {user} = useContext(AuthContext)

  const storage = getStorage();
  const storageRef = ref(storage, `images/${image?.name}`); 
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    try {
      if (!image) {
        console.error("No image selected");
        return;
      }
      const snapshot = await uploadBytes(storageRef, image);

      const imageUrl = await getDownloadURL(snapshot.ref);

      const productData = {
        name,
        category,
        price,
        url: imageUrl,
        userUid: user.uid,
        createDate: new Date().toISOString()
      };

      await addDoc(collection(db, "products"), productData);

      navigate('/')

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Fragment>
      <Header />
      <Card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
            <br />
            <br />
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={image ? URL.createObjectURL(image) : ""}
            ></img>
            <br />
            <input onChange={(e) => setimage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">
              upload and Submit
            </button>
          </form>
        </div>
      </Card>
    </Fragment>
  );
};

export default Create;
