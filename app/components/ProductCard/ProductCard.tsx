"use client";
import React, { useState } from "react";
import styles from "./productcard.module.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  addproducttocartAsync,
  decrementQuantityAsync,
  incrementQuantityAsync,
} from "@/app/Redux/features/cart/cartSlice";
import { successtoast } from "@/app/utils/alerts/alerts";
import { RootState } from "@/app/Redux/store";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  image: string;
  discountprice: number;
  originalprice: number;
  soldOut: number;
}

interface IProductProps {
  data: Product;
}

const ProductCard: React.FC<IProductProps> = ({ data }) => {
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
        successtoast(res.message);
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

  const isProductInCart = cartItem.findIndex(
    (i: any) => Number(i.product.id) === Number(data.id)
  ) !== -1;

  return (
    <div className={styles.product_card}>
      <Link href={`/product/${encodeURIComponent(data.name)}`}>
        <img className={styles.image} src={data.image} alt="product image" />
      </Link>
      <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
        Sale
      </span>
      <div className={styles.title_wrapper}>
        <a href="#">
          <h5 className={styles.title}>{data?.name?.length>20?data?.name?.slice(0,20)+"...":data?.name}</h5>
        </a>
        <div className={styles.rating_wrapper}>
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        </div>
        <div className={styles.price_wrapper}>
          <p>
            <span className={styles.discountPrice}>{`₹${data.discountprice}`}</span>
            <span className={styles.originalPrice}>{`₹${data.originalprice}`}</span>
          </p>
          {isProductInCart ? (
            <div className={styles.increment_remove}>
              <div className={styles.wrapper}>
                <span
                  className={styles.minus}
                  onClick={() => DECREMENTQUANTITY(data.id)}
                >
                  -
                </span>
                <span className={styles.num}>
                  {
                    cartItem.find(
                      (i: any) => Number(i.product.id) === Number(data.id)
                    )?.quantity
                  }
                </span>
                <span
                  className={styles.plus}
                  onClick={() => INCREMENTQUANTITY(data.id)}
                >
                  +
                </span>
              </div>
            </div>
          ) : (
            <button
              className={styles.add_to_cart_btn}
              onClick={() => AddToCartHandler(data.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
