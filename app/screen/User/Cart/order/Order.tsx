"use client";
import React, { useEffect } from "react";
import styles from "./order.module.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import { getallordersofcustomerAsync } from "@/app/Redux/features/order/orderSlice";
import Loading from "@/app/components/Loading/Loading";
import Link from "next/link";
import { formatDate } from "@/app/utils/date/date";
const Order = () => {
  const dispatch = useAppDispatch();
  const { loading, orders } = useAppSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getallordersofcustomerAsync());
  }, []);
  if (loading) {
    return <Loading />;
  }

  console.log(orders);
  return (
    <>
      <table className={`table table-info text-center ${styles.cutomize_table}`}>
        <thead>
          <tr>
            <th scope="col">SR.NO</th>
            <th scope="col">OrderId</th>
            {/* <th scope="col">Products</th> */}
            <th scope="col">Order Date</th>
            {/* <th scope="col">Delivery Date</th> */}
            <th scope="col">Status</th>
            <th scope="col">PaymentMethod</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 ? (
            <>
              {orders?.map((order: any, index: number) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{order?.id}</td>
                    <td>{formatDate(order?.createdAt)}</td>
                    <td>{order?.status}</td>
                    <td>{order?.paymentMethod}</td>
                    <td>{order?.paymentStatus}</td>
                    <td>{`₹ ${order?.totalPrice}`}</td>
                    <td>
                      <Link
                        href={`/orders/${order?.id}`}
                        className={`${styles.view_order_btn} text-black`}
                      >
                        <i className={`bx bx-show ${styles.eye_icon}`}></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td colSpan={10} className="text-center">
                No Order found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Order;
