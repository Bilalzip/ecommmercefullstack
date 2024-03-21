import React, { createContext, useContext, useEffect, useState } from 'react'
import ProductDetailContext from './ProductDetailContext'

const ProductDetailContextProvider = ({children}) => {

    const [pro, setpro] = useState({});
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const getproduct = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/api/v1/product/addproducts/${slug}`);
            setpro(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        getproduct();
      }, [slug]);
      useEffect(() => {
        const fetchImage = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/api/v1/product/addproducts/img/${slug}`, {
              responseType: 'blob',
            });
            const blobUrl = URL.createObjectURL(response.data);
            setImageSrc(blobUrl);
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        };
        fetchImage();
      }, []);


  return (
   <ProductDetailContext.Provider value={{imageSrc,setImageSrc , pro , setpro}}>
    {children}
   </ProductDetailContext.Provider>
  )
}

export default ProductDetailContextProvider
