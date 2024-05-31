"use client";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { getsingleproductAsync } from "@/app/Redux/features/Product/productSlice";
import { RootState } from "@/app/Redux/store";
import Loading from "@/app/components/Loading/Loading";
import Navbar from "@/app/components/Navbar/Navbar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./style.css";
import {
  addproducttocartAsync,
  decrementQuantityAsync,
  incrementQuantityAsync,
} from "@/app/Redux/features/cart/cartSlice";
import { successtoast } from "@/app/utils/alerts/alerts";
const ProductDescription = () => {
  const { slug } = useParams();
  const { loading } = useAppSelector((state: RootState) => state.products);
  const [selected_image, setSelectedImage] = useState<any>(0);
  const { cartItem, loading: cartitemloading } = useAppSelector(
    (state: RootState) => state.cart
  );
  const [product, setProduct] = useState<any>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (slug) {
      const payload: any = {
        slug,
      };
      dispatch(getsingleproductAsync(payload))
        .unwrap()
        .then((res) => {
          setProduct(res.data);
          setSelectedImage(
            res?.data?.productImages?.findIndex((i: any) => i?.isThumbnail)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [slug]);

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

  const isProductInCart = cartItem?.findIndex(
    (i: any) => Number(i?.product?.id) === Number(product?.id)
  );

  if (loading && cartitemloading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden lg:overflow-hidden">
        {/* <!-- Contents --> */}
        <div className="container mx-auto font-kumbh text-base">
          {/* <!-- Main Content --> */}
          <main className="w-full flex flex-col lg:flex-row">
            {/* <!-- Gallery --> */}
            <section className="h-fit flex-col gap-8 mt-16 sm:flex sm:flex-row sm:gap-4 sm:h-full sm:mt-24 sm:mx-2 md:gap-8 md:mx-4 lg:flex-col lg:mx-0 lg:mt-36">
              <picture className="relative flex items-center bg-orange sm:bg-transparent">
                <button
                  className="bg-white w-10 h-10 flex items-center justify-center pr-1 rounded-full absolute left-6 z-10 sm:hidden"
                  id="previous-mobile"
                >
                  <svg
                    width="12"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    id="previous-mobile"
                  >
                    <path
                      d="M11 1 3 9l8 8"
                      stroke="#1D2026"
                      strokeWidth="3"
                      fill="none"
                      fillRule="evenodd"
                      id="previous-mobile"
                    />
                  </svg>
                </button>
                <img
                  src={product?.productImages?.[selected_image]?.url}
                  alt="product"
                  className="block sm:rounded-xl xl:w-[70%] xl:rounded-xl m-auto pointer-events-none transition duration-300 lg:w-3/4 lg:pointer-events-auto lg:cursor-pointer lg:hover:shadow-xl"
                  id="hero"
                />
                <button
                  className="bg-white w-10 h-10 flex items-center justify-center pl-1 rounded-full absolute right-6 z-10 sm:hidden"
                  id="next-mobile"
                >
                  <svg
                    width="13"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    id="next-mobile"
                  >
                    <path
                      d="m2 1 8 8-8 8"
                      stroke="#1D2026"
                      strokeWidth="3"
                      fill="none"
                      fillRule="evenodd"
                      id="next-mobile"
                    />
                  </svg>
                </button>
              </picture>

              <div className="thumbnails hidden justify-between gap-4 m-auto sm:flex sm:flex-col sm:justify-start sm:items-center sm:h-fit md:gap-5 lg:flex-row">
                {product?.productImages?.map((i: any, index: number) => {
                  return (
                    <div className="w-1/5 cursor-pointer rounded-xl sm:w-28 md:w-32 lg:w-[72px] xl:w-[78px] ring-active">
                      <img
                        src={i?.url}
                        alt="thumbnail"
                        className={`rounded-xl hover:opacity-50 transition active ${
                          selected_image == index ? "primary_image" : ""
                        }`}
                        onClick={() => setSelectedImage(index)}
                      />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* <!-- Text --> */}
            <section className="w-full p-6 lg:mt-36 lg:pr-20 lg:py-10 2xl:pr-40 2xl:mt-40">
              <h4 className="font-bold text-orange mb-2 uppercase text-xs tracking-widest">
                {/* Sneaker Company */}
                {`${product?.category?.name}/${product?.subcategory?.name}`}
              </h4>
              <h1 className="text-very-dark mb-4 font-bold text-3xl lg:text-4xl">
                {product?.name}
              </h1>
              <p className="text-dark-grayish mb-6 text-base sm:text-lg">
                {product?.description}
              </p>

              <div className="flex items-center justify-between mb-6 sm:flex-col sm:items-start">
                <div className="flex items-center gap-4">
                  <h3 className="text-very-dark font-bold text-3xl inline-block">
                    {`₹ ${product?.discountprice}`}
                  </h3>
                  {/* <span className="inline-block h-fit py-0.5 px-2 font-bold bg-pale-orange text-orange rounded-lg text-sm">
                    50%
                  </span> */}
                </div>
                <p className="origialprice">{`₹ ${product?.originalprice}`}</p>
              </div>

              <div className="flex flex-col gap-5 mb-16 sm:flex-row lg:mb-0">
                {isProductInCart !== -1 ? (
                  <>
                    <div className="count_wrapper">
                      <div
                        id="minus"
                        className="plus-minus"
                        onClick={() => DECREMENTQUANTITY(product?.id)}
                      >
                        <div
                          className="w-3 h-1 bg-orange absolute"
                          id="minus"
                        ></div>
                        <FaMinus />
                      </div>
                      <span id="amount" className="select-none">
                        {
                          cartItem?.find(
                            (i: any) =>
                              Number(i?.product?.id) === Number(product?.id)
                          )?.quantity
                        }
                      </span>
                      <div
                        id="plus"
                        className="plus-minus"
                        onClick={() => INCREMENTQUANTITY(product?.id)}
                      >
                        <FaPlus />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="add-to-cart-btn"
                      id="add-cart"
                      onClick={() => AddToCartHandler(product?.id)}
                    >
                      <svg
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 22 20"
                      >
                        <path
                          d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                          fill="hsl(223, 64%, 98%)"
                          fillRule="nonzero"
                        />
                      </svg>
                      Add to cart
                    </button>
                  </>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
