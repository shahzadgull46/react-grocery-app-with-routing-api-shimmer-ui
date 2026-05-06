import Product from "./Product";

import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
const Body = () => {
  const [allProductList, setallProductList] = useState([]);

  const [filteredList, setfilteredList] = useState([]);

  const [searchText, setsearchText] = useState("");

  const fetchData = async () => {
    const data = await fetch(
      // for specific fields:
      "https://world.openfoodfacts.org/api/v2/search?search_terms=yogurt&page_size=50&fields=code,product_name,quantity,brands,categories_tags,labels_tags,allergens,ingredients_analysis_tags,additives_tags,nutriscore_grade,ecoscore_grade,nova_group,origins_tags,manufacturing_places_tags,stores_tags,countries_tags,image_front_small_url",

      // for all fields
      // "https://world.openfoodfacts.org/api/v2/search?search_terms=snacks&page_size=50"
    );

    const json = await data.json();
    console.log(json);

    // optional chaining
    setallProductList(json?.products);
    setfilteredList(json?.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return allProductList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter-container">
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              // filter products and update ui
              console.log(searchText);
              const searchProduct = allProductList.filter((item) => {
                return item.product_name
                  ?.toLowerCase()
                  .includes(searchText.toLocaleLowerCase());
              });
              setfilteredList(searchProduct);
            }}
          >
            Search
          </button>
        </div>

        <button
          className="filter-btn"
          onClick={() => {
            const filtered = allProductList.filter((product) => {
              // Get grade from either location, normalize to lowercase string
              const rawGrade =
                product.ecoscore_grade || product.ecoscore_data?.grade;
              const grade = String(rawGrade || "")
                .toLowerCase()
                .trim();
              return grade === "a" || grade === "b";
            });

            setfilteredList(filtered);
          }}
        >
          {" "}
          Top Rated Eco
        </button>

        <button
          className="filter-btn"
          onClick={() => setfilteredList([...allProductList])}
        >
          Show All
        </button>
      </div>

      <div className="product-container">
        {filteredList.map((product) => {
          return <Product key={product.code} groData={product} />;
        })}
      </div>
    </div>
  );
};
export default Body;
