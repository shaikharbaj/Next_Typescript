"use client";
import React, { useEffect, useState } from "react";
import "./cart.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import Loading from "@/app/components/Loading/Loading";
import {
  decrementQuantityAsync,
  incrementQuantityAsync,
  loadcartAsync,
  removeproductfromcartAsync,
} from "@/app/Redux/features/cart/cartSlice";
import { successtoast } from "@/app/utils/alerts/alerts";
import Link from "next/link";
const Cart = () => {
  const { loading, cartItem } = useAppSelector(
    (state: RootState) => state.cart
  );
  const [totalItem, setTotalItem] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadcartAsync());
  }, []);

  const DECREMENTQUANTITY = (product_id: number) => {
    //    console.log(product_id);
    dispatch(decrementQuantityAsync({ product_id }));
  };

  const INCREMENTQUANTITY = (product_id: number) => {
    dispatch(incrementQuantityAsync({ product_id }));
  };
  const REMOVEITEM = (product_id: number) => {
    dispatch(removeproductfromcartAsync({ product_id }))
      .unwrap()
      .then((res) => {
        successtoast(res.message);
      })
      .catch((err) => {});
  };

  const calculatedata = () => {
    const total = cartItem?.reduce(
      (acc: any, curr: any) => {
        acc["gtotal"] += curr.product?.discountprice
          ? curr?.product.discountprice * curr.quantity
          : curr?.product?.originalprice * curr.quantity;
        acc["item"] += curr.quantity;
        return acc;
      },
      { gtotal: 0, item: 0 }
    );
    setGrandTotal(total["gtotal"]);
    setTotalItem(total["item"]);
  };

  useEffect(() => {
    calculatedata();
  }, [cartItem]);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <section className="bg-light my-5">
        <div className="container">
          <div className="row">
            {/* <!-- cart --> */}
            <div className="col-lg-8">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Your Product Cart</h4>
                  <div className="row gy-3">
                    <div className="col-lg-12">
                      <div className="me-lg-2">
                        {cartItem.map((item: any) => {
                          return (
                            <div className="cart_menu" key={item?.id}>
                              <img
                                src={item?.product?.image}
                                className="border rounded me-3"
                              />
                              <div className="details">
                                <p className="heading">{item?.product?.name}</p>
                                <p className="description">
                                  {item?.product?.description}
                                </p>
                                <p className="quantity">
                                  ₹{" "}
                                  {item?.product?.discountprice
                                    ? item?.product?.discountprice *
                                      item?.quantity
                                    : item?.product?.originalprice *
                                      item.quantity}
                                  {/* ({(item?.item?.card?.info?.price ? item?.item?.card?.info?.price / 100 : item?.item?.card?.info?.defaultPrice / 100)} * {item.quantity})*/}
                                  {
                                    <>
                                      <span className="price">
                                        {` (${
                                          item?.product?.discountprice
                                            ? item?.product?.discountprice
                                            : item?.product?.originalprice
                                        }`}
                                        {item?.product?.discountprice && (
                                          <span className="original">
                                            ₹{item?.product?.originalprice}
                                          </span>
                                        )}{" "}
                                        * {`${item.quantity} )`}
                                      </span>
                                      <span className="quantity"></span>
                                    </>
                                  }
                                </p>

                                <div className="increment_remove">
                                  <div className="wrapper">
                                    <span
                                      className="minus"
                                      onClick={() =>
                                        DECREMENTQUANTITY(item?.product?.id)
                                      }
                                    >
                                      -
                                    </span>
                                    <span className="num">
                                      {item?.quantity}
                                    </span>
                                    <span
                                      className="plus"
                                      onClick={() =>
                                        INCREMENTQUANTITY(item?.product?.id)
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                  <div className="remove">
                                    <button
                                      onClick={() =>
                                        REMOVEITEM(item?.product?.id)
                                      }
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- cart -->
            <!-- summary --> */}
            <div className="col-lg-4 mt-2">
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4 className="mb-3 summery_title">Order Summery</h4>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Price ({totalItem} items)</p>
                    <p className="mb-2">₹ {grandTotal} </p>
                  </div>
                  {/* <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount (10%)</p>
                    <p className="mb-2 text-success">₹ {"30%"}</p>
                  </div> */}
                  {/* <div className="d-flex justify-content-between">
                    <p className="mb-2">Delivery charges</p>
                    <p className="mb-2">₹ 60.00</p>
                  </div> */}
                  {/* <div className="d-flex">
                    <p className="mb-2 save-message">
                      You'll save ₹ {3000} on this order 🎉
                    </p>
                  </div> */}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total Amount:</p>
                    <p className="mb-2 fw-bold">₹ {grandTotal}</p>
                  </div>

                  <div className="mt-3">
                    <Link href={"/checkout"} className="btn-checkout w-100 shadow-0 mb-2">Checkout</Link>

                    {/* <a onClick={gotohome} className="btn btn-light w-100 border mt-2"> Back to Home </a> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- summary --> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
