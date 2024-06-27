"use client";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./style.module.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import { loadallproductAsync } from "@/app/Redux/features/Product/productSlice";
import Navbar from "../components/Navbar/Navbar";
import Loading from "../components/Loading/Loading";
import useDebounce from "../Hook/useDebounce";
import Pagination from "../components/Pagination/Pagination";
const AllProduct = () => {
  const { loading, products, meta } = useAppSelector(
    (state: RootState) => state.products
  );
  const [searchTerm, setSerchText] = useState("");
  const debauncedValue = useDebounce(searchTerm, 600);
  const [currentpage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const dispatch = useAppDispatch();

  const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSerchText(e.target.value);
  };

  useEffect(() => {
    dispatch(loadallproductAsync({ currentpage, searchTerm }));
  }, [debauncedValue, currentpage]);

  // useEffect(() => {
  //   dispatch(loadallproductAsync());
  // }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      {/* <ProductCard/> */}
      <div className={`${styles.section} mt-3`}>
        <div className="d-flex justify-content-center">
          <div className={`mt-3 mb-3 ${styles.inputbox}`}>
            <input
              type="text"
              onChange={handlesearch}
              value={searchTerm}
              placeholder="search something here....."
            />
          </div>
        </div>
        {/* <div className={`${styles.product_container}`}> */}
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
      <Pagination
        currentpage={currentpage}
        setCurrentPage={setCurrentPage}
        total={meta?.total}
        perpage={perPage}
      />
    </>
  );
};

export default AllProduct;
