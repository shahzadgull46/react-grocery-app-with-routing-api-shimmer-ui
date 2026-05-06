   🛒 React Router & Advanced Hooks Guide
A comprehensive learning project covering React Router DOM, useEffect patterns, dynamic routing, and best practices for building modern single-page applications.



## Home Page

## ProductInfo Shimmer Loading

## Contact Page

## Product Info Page

All pics are in assests. 

   📑 Table of Contents
Overview
Key Concepts
 - useEffect Deep Dive
 - useState Best Practices
 - React Router Setup
 - Nested Routes & Outlet
 - Navigation & Link
 - Dynamic Routes & useParams
 - Shimmer UI
 - Installation
 - Project Structure
 - API Reference
 - Routing Types Explained
 - License
Overview
This project demonstrates how to build a Single Page Application (SPA) using React Router DOM v6 with dynamic product routing, nested layouts, and advanced useEffect patterns. It includes a grocery/product listing app that fetches data from the Open Food Facts API.
Features:
✅ Client-side routing without page refreshes
✅ Nested layout routes (Header + dynamic content)
✅ Dynamic product detail pages with URL parameters
✅ Error handling with custom error pages
✅ Shimmer loading UI for better UX
✅ API integration with barcode-based product lookup
Key Concepts
 1. useEffect Deep Dive
useEffect is imported as a named import from React and accepts two arguments:
Callback function (required)
Dependency array (optional)
jsx
Copy
import { useEffect } from "react";

useEffect(() => {
  console.log("Use effect called");
}, []);
🔥 Interview-Ready: Three Cases of useEffect Behavior
Table
Case	Dependency Array	Behavior
Case 1	No array	Runs after every render
Case 2	Empty []	Runs only once on initial render
Case 3	[state]	Runs when dependency changes
jsx
Copy
// Case 1: No dependency array → runs on every render
useEffect(() => {
  console.log("Runs every time component renders");
});

// Case 2: Empty array → runs once on mount
useEffect(() => {
  console.log("Runs only on initial render");
}, []);

// Case 3: With dependency → runs when btnNameReact changes
useEffect(() => {
  console.log("Runs when button state updates");
}, [btnNameReact]);
 2. useState Best Practices
⚠️ Critical Rules for useState:
Always inside component — Never create state variables outside the component
Top-level only — Call useState at the top of the component, not inside conditions
No conditional hooks — Never use inside if/else, loops, or nested functions
Consistent order — React relies on the call order; breaking it causes inconsistency
jsx
Copy
// ✅ CORRECT
const Header = () => {
  const [btnName, setBtnName] = useState("Login");  // Top level
  const [count, setCount] = useState(0);            // Top level
  // ...
};

// ❌ WRONG - Never do this!
const Header = () => {
  if (condition) {
    const [state, setState] = useState();  // ❌ Inside condition!
  }
};
3. React Router Setup
Installation
bash
Copy
# Fix any audit issues
npm install react-router-dom

# See the details
npm audit

# Fix what can be fixed automatically
npm audit fix
Basic Router Configuration
jsx
Copy
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,  // Custom error page
  },
  {
    path: "/about",
    element: <About />,
  },
]);

# Render with RouterProvider
root.render(<RouterProvider router={appRouter} />);
Error Handling with useRouteError
jsx
Copy
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error); # Inspect the error object

  return (
    <div>
      <h1>Oops! Something went wrong</h1>
      <h3>{error.data}</h3>
      <h4>{error.statusText}</h4>
    </div>
  );
};
4. Nested Routes & Outlet
Create persistent layouts where the header remains constant while content changes.
jsx
Copy
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />      # Persistent across all pages
      <Outlet />      # Dynamic content injection point
    </div>
  );
};
Router with Children
jsx
Copy
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,        # Home page
      },
      {
        path: "/about",
        element: <About />,       # About page
      },
      {
        path: "/contact",
        element: <Contact />,     # Contact page
      },
    ],
    errorElement: <Error />,
  },
]);
💡 Key Point: <Outlet /> is replaced by the matched child component. No outlet element remains in the DOM.
5. Navigation & Link
❌ Don't use anchor tags:
jsx
Copy
// ❌ BAD - Causes full page refresh
<a href="/contact">Contact</a>
✅ Use Link component:
jsx
Copy
import { Link } from "react-router-dom";

// ✅ GOOD - Client-side navigation, no refresh
<li>
  <Link to="/about">About Us</Link>
</li>
Why Link over <a>?
No full page reload
Only the necessary component re-renders
Header and static elements persist
This is what makes React a Single Page Application (SPA)
Note: Link ultimately renders an anchor tag in the DOM, but intercepts clicks to handle navigation via JavaScript.
6. Dynamic Routes & useParams
Build product detail pages with URL parameters.
Step 1: Make Product Cards Clickable
jsx
Copy
import { Link } from "react-router-dom";

const Product = ({ groData }) => {
  const { product_name, brands, image_front_small_url, code } = groData;

  return (
    <Link 
      to={`/product/${code}`} 
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className="product">
        <img className="product-img" src={image_front_small_url} alt="" />
        <span>{product_name}</span>
        <p>{brands}</p>
        <button className="buttons">Add to cart</button>
      </div>
    </Link>
  );
};
Step 2: Configure Dynamic Route
jsx
Copy
{
  path: "/product/:barcode",    # :barcode is a URL parameter
  element: <ProductInfo />,
}
Step 3: Extract Parameter & Fetch Data
jsx
Copy
import { useParams } from "react-router-dom";

const ProductInfo = () => {
  const { barcode } = useParams();  # Extract barcode from URL
  const [productInfo, setProductInfo] = useState();

  const fetchData = async () => {
    const data = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}`
    );
    const json = await data.json();
    setProductInfo(json.product);
  };

  useEffect(() => {
    fetchData();
  }, []);  # Fetch once on mount

  if (!productInfo) return <ProductInfoShimmer />;

  const { product_name, quantity, brands, packaging, categories, countries } = productInfo;

  return (
    <div className="product-info">
      <img src={productInfo.image_front_small_url} alt="" />
      <h1>{product_name}</h1>
      <p>Barcode: {barcode}</p>
      <p>Quantity: {quantity}</p>
      <p>Brands: {brands}</p>
      <p>Packaging: {packaging}</p>
      <p>Categories: {categories}</p>
      <p>Countries: {countries}</p>
    </div>
  );
};
7. Shimmer UI
Improve perceived performance with skeleton loading screens.
jsx
Copy
import './ProductInfoShimmer.css';

const ProductInfoShimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-image-box">
        <div className="shimmer-img"></div>
      </div>
      <div className="shimmer-details">
        <div className="shimmer-title"></div>
        <div className="shimmer-row"></div>
        <div className="shimmer-row"></div>
        <div className="shimmer-row"></div>
        <div className="shimmer-row"></div>
        <div className="shimmer-row"></div>
        <div className="shimmer-row"></div>
        <div className="shimmer-row"></div>
      </div>
    </div>
  );
};

export default ProductInfoShimmer;
Installation
bash
Copy
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Fix any audit issues
npm audit

# Fix what can be fixed automatically
npm audit fix

# Start development server
npm run dev
Project Structure
plain
Copy
src/
├── components/
│   ├── Header.jsx
│   ├── Body.jsx
│   ├── Product.jsx
│   ├── ProductInfo.jsx
│   ├── ProductInfoShimmer.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── Error.jsx
├── App.jsx                 # AppLayout with Outlet
├── main.jsx                # RouterProvider setup
└── styles/
    ├── ProductInfoShimmer.css
    └── App.css
API Reference
Open Food Facts API
Table
Endpoint	Description
https://world.openfoodfacts.org/api/v2/product/{barcode}	Fetch product details by barcode
Example Response:
JSON
Copy
{
  "product": {
    "product_name": "Product Name",
    "brands": "Brand Name",
    "quantity": "500g",
    "packaging": "Plastic",
    "categories": "Food > Snacks",
    "countries": "United States",
    "image_front_small_url": "https://..."
  }
}
Routing Types Explained
Server-Side Routing (Traditional)
plain
Copy
Request → Server Processes → Full HTML Sent → Browser Renders
Every URL change sends request to server
Server returns complete new HTML page
Browser refreshes entire page
Slower, more bandwidth
Client-Side Routing (React SPA)
plain
Copy
Request (First time only) → JS Loads → Subsequent Navigations stay in browser
URL changes handled by JavaScript
Only necessary data fetched (usually JSON)
Page does not fully reload
Faster navigation after initial load
React Router DOM enables this pattern
🎯 Key Takeaways
useEffect behavior changes based on dependency array presence and contents
Never break Hooks rules — always call at top level, never conditionally
React Router DOM is the industry standard for React routing
Outlet enables nested layouts with persistent UI elements
Link component prevents full page reloads, keeping SPA behavior
useParams extracts dynamic URL segments for data fetching
Shimmer UI provides better loading experience than spinners
License
MIT License - feel free to use this as a learning resource or starter template.