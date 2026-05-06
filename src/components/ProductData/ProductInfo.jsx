import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PRODUCTINFO_URL } from "../../../public/utils/constants";
import './ProductInfo.css';  
import ProductInfoShimmer from "./ProductInfoShimmer";

const ProductInfo = () => {
  const [productInfo, setproductInfo] = useState(null);

  const { barcode } = useParams();
  const fetchData = async () => {
    const data = await fetch(
      "https://world.openfoodfacts.org/api/v2/product/" + barcode,
    );
    const json = await data.json();
    console.log(json);
    setproductInfo(json.product);
  };
  useEffect(() => {
    fetchData();
  }, []);

if (productInfo===null) {
  return <ProductInfoShimmer/>
}


 const {product_name,code,quantity,brands,packaging,categories,countries,image_front_small_url,origin,origins_tags,manufacturing_places,manufacturing_places_tags}=productInfo
 return (
  <div className="product-info-wrapper">
    <span className="product-info-image-box">
      <img className="product-info-img" src={image_front_small_url} alt="" />
    </span>
    <div className="product-info-details">
      <h1 className="product-info-title">{product_name}</h1>
      <p className="product-info-row">
        <span className="product-info-label">Barcode:</span> {code}
      </p>
      <p className="product-info-row">
        <span className="product-info-label">Quantity:</span> {quantity}
      </p>
      <p className="product-info-row">
        <span className="product-info-label">Brands:</span> {brands}
      </p>
      <p className="product-info-row">
        <span className="product-info-label">Packaging:</span> {packaging}
      </p>
      <p className="product-info-row">
        <span className="product-info-label">Categories:</span> {categories}
      </p>
      <p className="product-info-row">
        <span className="product-info-label">Origin of the product:</span> {origin || origins_tags}
      </p>
      <p className="product-info-row">
        <span className="product-info-label">Manufacturing or processing places:</span> {manufacturing_places || manufacturing_places_tags || "Not Specified"}
      </p>
      <p className="product-info-row">
        <span className="product-info-label">Countries where sold:</span> {countries}
      </p>
    </div>
  </div>
);

};
export default ProductInfo;
