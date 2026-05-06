
// For learnign purpose only using this logo
export const LOGO_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdORZOyvu57qJGM6Zx9lMy2KwhB8cwUN0_CQ&s";

export const IMG_URL =
"https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"

export const THUMBNAIL_URL=
   "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"


export const PRODUCTINFO_URL=
"https://world.openfoodfacts.org/api/v2/product"


  /*
  In one file we can use only one export we can not write export twice it will throw an error

  Throws error:
  export default LOGO_URL
  export default LOGO_URL

  IF we have to export multiple things then how we can export them ? 
   - Then we use something as name export 

   How to use this:
   You can just to write export infront of your variable or constant whatever you have
   Like this one:
   export const LOGO_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdORZOyvu57qJGM6Zx9lMy2KwhB8cwUN0_CQ&s";

This is how you can export multiple things from one file
The question is how i will import it?
  There would be a slight difference in import 
  You have to write it in { } curly braces

  import { LOGO_URL } from "../../public/utils/constants";

  if we have used default export then we don't use curly braces in import
  how to use this:
  <img className="logo" src={LOGO_URL} />
  always write it in curly braces not in double quetation because it is constant



  
  */