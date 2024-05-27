"use client";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import React, { useEffect } from "react";
import styles from "./style.module.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import { loadallproductAsync } from "@/app/Redux/features/Product/productSlice";
import Navbar from "../components/Navbar/Navbar";
import Loading from "../components/Loading/Loading";
const AllProduct = () => {
  const { loading, products } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadallproductAsync());
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      {/* <ProductCard/> */}
      <div className={`${styles.section} mt-5`}>
        {/* <div className={`${styles.product_container}`}> */}\
        <div className="grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-3">
          {products &&
            products.map((p: any) => {
              return <ProductCard data={p} key={p.id} />;
            })}
        </div>
        {products && products.length === 0 ? (
          <h1 className={`${styles.product_not_found}`}>No products Found!</h1>
        ) : null}
      </div>
    </>
  );
};

export default AllProduct;
