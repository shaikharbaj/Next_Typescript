"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import './productcard.css'
interface IProductProps {
  data: any
}
const ProductCard: React.FC<IProductProps> = ({ data }) => {
  // const data = {
  //   _id: 1,
  //   images: [
  //     { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU59P3WstIxNO64rNDxWpWKxj5Hve3Z1_MlT9gfic98w&s" }
  //   ],
  //   shop: {
  //     name: "amazon.in"
  //   },
  //   name: "product one",
  //   discountPrice: 200,
  //   originalPrice: 300,
  //   sold_out: 10
  // }
  const [open, setOpen] = useState(false);
  const AddToCartHandler = (id: number) => {

  }
  return (
    <>
      <div className='productcard mb-1'>
        <div className='flex justify-content-end'></div>
        <Link href={`/product/${data.id}`} className='product_img_container'>
          <img src={data.image} alt="" className='img-fluid' />
        </Link>
        <Link href={"/"}>
          <h5 className='shop_name'>{data?.name}</h5>
        </Link>
        <Link href={"/"} className='product_name'>
          <h4 className='pb-2'>{data?.description.length > 40 ? data.description.slice(0, 40) + "..." : data.description}</h4>

          <div className="d-flex">
            {/* <div className="rating">
              <Rating rating={data?.rating} />
            </div> */}
          </div>

          <div className="price_discount_sold">
            <div className="d-flex">
              <h5 className="product_discount_price">
                {`₹ ${data?.discountprice}`}
              </h5>
              {
                data.originalprice && <h4 className={`product_price`}>
                  {`₹ ${data.originalprice ? data.originalprice : ''}`}
                </h4>
              }
            </div>
            <span className="sold_item">
              {`${data?.stock} In stack`}
            </span>
          </div>
        </Link>
        <div className='product_cart_icon'>
          {
            // true ? <i className='bx bxs-heart wishlist_icon added_to_wishlist' onClick={() => removeFromWishlistHandler(data)}></i> : <i className='bx bx-heart wishlist_icon' onClick={() => addToWishlistHandler(data)}></i>
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