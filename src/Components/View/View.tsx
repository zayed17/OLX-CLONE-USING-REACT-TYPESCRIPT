import { useState, useContext, useEffect } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { db } from '../../firebase/config'; 

function View() {
  const { postDetails } = useContext(PostContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDoc = await db.collection('users').doc(postDetails.userUid).get();        
        if (userDoc.exists) {
          setUserDetails(userDoc.data());
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (postDetails && postDetails.userUid) {
      fetchUserDetails();
    }
  }, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{new Date(postDetails.createDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>{userDetails.name}</p>
              <p>{userDetails.email}</p>
            </>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
