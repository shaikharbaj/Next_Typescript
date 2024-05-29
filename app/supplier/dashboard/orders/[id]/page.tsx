"use client";
import { useAppDispatch } from "@/app/Hook/hooks";
import {
  loadsinglesupplierOrderAsync,
  updateorderstatusAsync,
} from "@/app/Redux/features/supplier/supplierSlice";
import { successtoast } from "@/app/utils/alerts/alerts";
import React, { useEffect, useState } from "react";
const page = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const dispatch = useAppDispatch();
  const [orderId, setOrderId] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [paymentMethod,setPaymentMethod] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  console.log(id);
  //load the order single.....
  useEffect(() => {
    if (id) {
      dispatch(loadsinglesupplierOrderAsync({ orderItemId: id }))
        .unwrap()
        .then((res) => {
          console.log(res.data?.order?.user?.name);
          setOrderId(res?.data?.orderId);
          setCustomerName(res.data?.order?.user?.name);
          setProductName(res?.data?.product?.name);
          setQuantity(res?.data?.quantity);
          setPaymentMethod(res?.data?.order?.paymentMethod);
          setPrice(res?.data?.price);
          setStatus(res.data?.status);
          setPaymentStatus(res.data?.paymentStatus);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  interface ISubmitPayload {
    orderItemId: number;
    status: string;
    paymentStatus: string;
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: ISubmitPayload = {
      orderItemId: Number(id),
      status,
      paymentStatus,
    };
    console.log(payload);

    dispatch(updateorderstatusAsync(payload))
      .unwrap()
      .then((res) => {
        successtoast(res?.message)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <section className="bg-white">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Update Order</h2>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Order Id
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={orderId}
                  disabled
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={customer_name}
                  disabled
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={productName}
                  disabled
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={productName}
                  disabled
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Payment Method
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={paymentMethod}
                  disabled
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={price}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELED">CANCELED</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Payment Status
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  value={paymentStatus}
                >
                  <option value="PAID">PAID</option>
                  <option value="UNPAID">UNPAID</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button type="submit" className="supplier_order_update_btn">
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default page;
