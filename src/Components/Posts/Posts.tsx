import { useEffect, useContext,useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import {useNavigate} from 'react-router-dom'

function Posts() {
  const [products, setProducts] = useState<{ id: string}[]>([]);
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); 
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div onClick={()=>{
              setPostDetails(product),
              navigate('/view')
            }} key={product.id} className="card">
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{new Date(product.createDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Posts;
