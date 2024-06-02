"use client";
import React, { useEffect } from "react";
import styles from "./order.module.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import { generate_invoiceAsync, getallordersofcustomerAsync } from "@/app/Redux/features/order/orderSlice";
import Loading from "@/app/components/Loading/Loading";
import Link from "next/link";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { formatDate } from "@/app/utils/date/date";
const Order = () => {
  const dispatch = useAppDispatch();
  const { loading, orders } = useAppSelector((state: RootState) => state.order);
  console.log(loading);
  useEffect(() => {
    dispatch(getallordersofcustomerAsync());
  }, []);

  const generate_invoice=(id:number)=>{
           dispatch(generate_invoiceAsync({order_id:id}))    
  }
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
            <th scope="col">generate Invoice</th>
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
                    <td className={styles.action}>
                      <Link
                        href={`/orders/${order?.id}`}
                        className={`${styles.view_order_btn} text-black`}
                      >
                        <i className={`bx bx-show ${styles.eye_icon}`}></i>
                      </Link>
                    </td>
                    <td className="d-flex justify-center align-items-center pb-3">
                        <FaFileInvoiceDollar fontSize={"20px"} onClick={()=>generate_invoice(order?.id)} />
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
