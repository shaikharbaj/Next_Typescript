"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import { useAppDispatch } from "@/app/Hook/hooks";
import { getorderbyIdAsync } from "@/app/Redux/features/order/orderSlice";
import { formatDate } from "@/app/utils/date/date";
import React, { useEffect, useState } from "react";

const OrderDetailsPage = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<any>({});
  useEffect(() => {
    if (id) {
      dispatch(getorderbyIdAsync({ id }))
        .unwrap()
        .then((res) => {
          setOrder(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const orderDate: Date = new Date(order?.createdAt); // Assuming order.createdAt is a valid date string or Date object
  const expectedDeliveryDate: Date = new Date(orderDate); // Create a new Date object for expected delivery date
  expectedDeliveryDate.setDate(orderDate.getDate() + 5); // Add 5 days to the orderDate

  return (
    <>
      <Navbar />
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Order #{order?.id}
          </h1>
          <p className="text-base font-medium leading-6 text-gray-600">
            {formatDate(order?.createdAt)}
          </p>
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                Customer’s Cart
              </p>
              {order?.orderItems?.map((o: any) => {
                return (
                  <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full" key={o?.id}>
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-full hidden md:block"
                        src={o?.product?.productImages[
                          o?.product?.productImages?.findIndex(
                            (ele: any) => ele.isThumbnail == true
                          )
                        ]?.url}
                        alt="product_image"
                      />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6">
                          {o?.product?.name}
                        </h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm leading-none mb-0">
                            <span className="text-gray-600">
                              order status:{" "}
                            </span>{" "}
                            <span className={`order_status ${o?.status=="PENDING"?"o_pending":""}${o?.status=="PROCESSING"?"o_processing":""} ${o?.status=="SHIPPED"?"o_shipped":""} ${o?.status=="DELIVERED"?"o_delivered":""} ${o?.status=="CANCELED"?"o_cancelled":""}`}>{o?.status}</span>
                          </p>
                          <p className="text-sm leading-none text-gray-800">
                            <span className=" text-gray-600">
                              expected delivery:{" "}
                            </span>
                            {`${formatDate(expectedDeliveryDate.toISOString())}`}
                          </p>
                          {/* <p className="text-sm leading-none text-gray-800">
                            <span className=" text-gray-300">Color: </span>{" "}
                            {`${formatDate(expectedDeliveryDate.toISOString())}`}
                          </p> */}
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full ms-5">
                        <p className="text-base xl:text-lg leading-6">
                          {`₹ ${o?.product?.discountprice}`}{" "}
                          <span className="text-red-600 text-xs text-decoration-line-through">{`₹ ${o?.product?.originalprice}`}</span>
                        </p>
                        <p className="text-base xl:text-lg leading-6 text-gray-800">
                          {o?.quantity}
                        </p>
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                          {`₹ ${
                            Number(o?.product?.discountprice) * o?.quantity
                          }`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {`₹ ${order?.totalPrice - 60}`}
                    </p>
                  </div>
                  {/* <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      -$28.00 (50%)
                    </p>
                  </div> */}
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      {`₹ 60`}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    {`₹ ${order?.totalPrice}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Shipping Address
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <div className="">
                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          {`${order?.shippingAddressLine1}, ${order?.shippingCity} , ${order?.shippingState} ${order?.shippingCountry} ${order?.shippingZipCode}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
