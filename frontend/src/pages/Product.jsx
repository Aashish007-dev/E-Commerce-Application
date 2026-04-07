import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
      {/* Product Images */}
      <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {
            productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 rounded-lg cursor-pointer' alt="" />
            ))
          }
        </div>
        <div className='w-full sm:w-[80%] '>
          <img className='w-full h-auto' src={image} alt="" />
        </div>
      </div>
      {/* Product Info */}
      <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
        <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt=""  className='w-3.5'/>
          <img src={assets.star_icon} alt=""  className='w-3.5'/>
          <img src={assets.star_icon} alt=""  className='w-3.5'/>
          <img src={assets.star_icon} alt=""  className='w-3.5'/>
          <img src={assets.star_dull_icon} alt=""  className='w-3.5'/>
          <p className='pl-2'>(122)</p>

        </div>
        <p className='text-3xl font-medium mt-5'>{currency} {productData.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5' >{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          <p>Select Size</p>
          <div className='flex gap-2'>
            {productData.sizes.map((item, index) => (
              <button onClick={() => setSize(item)} key={index} className={`border border-gray-100 cursor-pointer py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
            ))}
          </div>
        </div>

        <button onClick={() => addToCart(productData._id, size)} className='bg-black  text-white py-3 px-8 text-sm active:bg-gray-700 cursor-pointer rounded-full'>Add to Cart</button>
        <hr className='mt-8 sm:w-4/5'/>
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% Original product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p>Easy return and exchange policy within 7 days.</p>

        </div>
      </div>
      </div>
      {/* Description & Review section */}
      <div className='mt-20'>
        <div className='flex '>
          <b className='border border-gray-100 px-5 py-3 text-sm'>Description</b>
          <p className='border border-gray-100 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-gray-100 px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus cumque maxime ex nesciunt, culpa doloremque necessitatibus, doloribus consequuntur minus omnis itaque, quia laboriosam. Commodi eius blanditiis officia nulla. Quia, hic. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis vitae a, nihil distinctio nesciunt amet eum dignissimos ipsum unde eius. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quo incidunt aut nobis qui vitae tempora maxime minima! Quibusdam facilis non unde, iure rerum quasi nisi molestias cumque amet aperiam.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, deserunt illo aliquid quibusdam saepe libero. Architecto repellat quae molestias saepe enim, voluptas tempora maiores obcaecati! Perferendis repudiandae assumenda laboriosam error?</p>

        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'>Product not found</div>
  )
}

export default Product