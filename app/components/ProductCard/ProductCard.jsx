"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import './productcard.css'
const ProductCard = () => {
  const data = {
    _id: 1,
    images: [
      { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU59P3WstIxNO64rNDxWpWKxj5Hve3Z1_MlT9gfic98w&s" }
    ],
    shop: {
      name: "amazon.in"
    },
    name: "product one",
    discountPrice: 200,
    originalPrice: 300,
    sold_out: 10
  }
  const [open, setOpen] = useState(false);
  const AddToCartHandler = (id) => {

  }
  return (
    <>
      <div className='productcard mb-1'>
        <div className='flex justify-content-end'></div>
        <Link href={`/product/${data._id}`} className='product_img_container'>
          <img src={data.images[0].url} alt="" className='img-fluid' />
        </Link>
        <Link href={"/"}>
          <h5 className='shop_name'>{data.shop.name}</h5>
        </Link>
        <Link href={"/"} className='product_name'>
          <h4 className='pb-2'>{data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}</h4>

          <div className="d-flex">
            {/* <div className="rating">
              <Rating rating={data?.rating} />
            </div> */}
          </div>

          <div className="price_discount_sold">
            <div className="d-flex">
              <h5 className="product_discount_price">
                {`₹ ${data?.discountPrice}`}
              </h5>
              <h4 className={`product_price`}>
                {`₹ ${data.originalPrice ? data.originalPrice : ''}`}
              </h4>
            </div>
            <span className="sold_item">
              {`${data?.sold_out} sold`}
            </span>
          </div>
        </Link>
        <div className='product_cart_icon'>
          {
            true ? <i className='bx bxs-heart wishlist_icon added_to_wishlist' onClick={() => removeFromWishlistHandler(data)}></i> : <i className='bx bx-heart wishlist_icon' onClick={() => addToWishlistHandler(data)}></i>
          }
          <i className='bx bx-show-alt eye_icon' onClick={() => setOpen(true)}></i>
          <i className='bx bx-cart-alt cart_icon' onClick={() => AddToCartHandler(data._id)} ></i>
          {/* {open ? <ProductDetails setOpen={setOpen} data={data} /> : null} */}
        </div>
      </div>
    </>
  )
}

export default ProductCard