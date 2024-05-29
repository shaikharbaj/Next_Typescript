"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import { formatDate } from "@/app/utils/date/date";
import Loading from "@/app/components/Loading/Loading";
import { loadallsupplierordersAsync } from "@/app/Redux/features/supplier/supplierSlice";
const SupplierOrders = () => {
  const dispatch = useAppDispatch();
  const { loading, orders } = useAppSelector(
    (state: RootState) => state.supplier
  );

  useEffect(() => {
         dispatch(loadallsupplierordersAsync());
  }, []);

  console.log(orders);
  if (loading) {
    <Loading />;
  }
  return (
    <>
      <table
        className={`table table-info text-center ${styles.cutomize_table}`}
      >
        <thead>
          <tr>
            <th scope="col">SR.NO</th>
            <th scope="col">OrderId</th>
            <th scope="col">Order Date</th>
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
              {orders?.map((o: any, index: number) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{o?.order?.id}</td>
                    <td>{formatDate(o?.order?.createdAt)}</td>
                    <td>{o?.status}</td>
                    <td>{o?.order?.paymentMethod}</td>
                    <td>{o?.paymentStatus}</td>
                    <td>{`₹ ${o?.price}`}</td>
                    <td>
                      <Link
                        href={`/supplier/dashboard/orders/${o?.id}`}
                        className={`${styles.view_order_btn} text-black`}
                      >
                        <i className={`bx bxs-edit ${styles.eye_icon}`}></i>
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

export default SupplierOrders;
