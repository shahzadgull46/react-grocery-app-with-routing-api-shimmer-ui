
// groData is the prop 
import { Link } from "react-router-dom";
const Product = ({ groData }) => {
  const {product_name,brands,ecoscore_grade,image_front_small_url,quantity} =groData
  
  
  return (
  <Link to={`/product/${groData.code}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>

    <div className="product">
      <div><img className="product-img" src={image_front_small_url} alt="" /></div>
      <span>{product_name} -</span>
      <span>{quantity}</span>
      <p>{brands}</p>
      <p>Eco Score: {ecoscore_grade || "N/A"}</p>
  {/* <p>Nutri Score: {groData.nutriscore_grade || "N/A"}</p> */}
      <button className="buttons">Add to cart</button>
    </div>
     </Link>
  );
};
export default Product;