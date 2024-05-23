"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./productcard.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  addproducttocartAsync,
  decrementQuantityAsync,
  incrementQuantityAsync,
} from "@/app/Redux/features/cart/cartSlice";
import { successtoast } from "@/app/utils/alerts/alerts";
import { RootState } from "@/app/Redux/store";
interface IProductProps {
  data: any;
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
  const dispatch = useAppDispatch();
  const { cartItem } = useAppSelector((state: RootState) => state.cart);
  const AddToCartHandler = (id: number) => {
    dispatch(addproducttocartAsync({ product_id: id }))
      .unwrap()
      .then((res) => {
        successtoast(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DECREMENTQUANTITY = (product_id: number) => {
    dispatch(decrementQuantityAsync({ product_id }))
      .unwrap()
      .then((res) => {
        successtoast(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const INCREMENTQUANTITY = (product_id: number) => {
    dispatch(incrementQuantityAsync({ product_id }))
      .unwrap()
      .then((res) => {
        successtoast(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="productcard mb-1">
        <div className="flex justify-content-end"></div>
        <Link href={`/product/${data.id}`} className="product_img_container">
          <img src={data.image} alt="" className="img-fluid" />
        </Link>
        <Link href={"/"}>
          <h5 className="shop_name">{data?.name}</h5>
        </Link>
        <Link href={"/"} className="product_name">
          {/* <h4 className="pb-2">
            {data?.description.length > 40
              ? data.description.slice(0, 40) + "..."
              : data.description}
          </h4> */}

          {/* <div className="d-flex">
            <div className="rating">
              <Rating rating={data?.rating} />
            </div>
          </div> */}

          <div className="price_discount_sold">
            <div className="d-flex">
              <h5 className="product_discount_price">
                {`₹ ${data?.discountprice}`}
              </h5>
              {data.originalprice && (
                <h4 className={`product_price`}>
                  {`₹ ${data.originalprice ? data.originalprice : ""}`}
                </h4>
              )}
            </div>
            <span className="sold_item">{`${data?.stock} In stack`}</span>
          </div>
        </Link>
        <div className="add_to_cart_btn">
          {cartItem.findIndex(
            (i: any) => Number(i.product.id) === Number(data.id)
          ) == -1 ? (
            <button onClick={() => AddToCartHandler(data.id)}>
              Add-to-Cart
            </button>
          ) : (
            <>
              <div className="increment_remove">
                <div className="wrapper">
                  <span
                    className="minus"
                    onClick={() => DECREMENTQUANTITY(data?.id)}
                  >
                    -
                  </span>
                  <span className="num">
                    {
                      cartItem[
                        cartItem.findIndex(
                          (i: any) => Number(i.product.id) === Number(data.id)
                        )
                      ].quantity
                    }
                  </span>
                  <span
                    className="plus"
                    onClick={() => INCREMENTQUANTITY(data?.id)}
                  >
                    +
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div>{/* <button></button> */}</div>
        <div className="product_cart_icon">
          <button className="btn-view">
            <i className="bx bx-show-alt" onClick={() => setOpen(true)}></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
