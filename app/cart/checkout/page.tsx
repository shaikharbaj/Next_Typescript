"use client";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  addAddressAsync,
  loadAllAddressOfUserAsync,
} from "@/app/Redux/features/auth/authSlice";
import { orderproductAsync } from "@/app/Redux/features/cart/cartSlice";
import { RootState } from "@/app/Redux/store";
import Loading from "@/app/components/Loading/Loading";
import Navbar from "@/app/components/Navbar/Navbar";
import CheckoutProductCard from "@/app/components/checkoutproductcard/CheckoutProductCard";
import { successtoast } from "@/app/utils/alerts/alerts";
import { validateaddressdata } from "@/app/utils/validation/addaddressValidation";
import { validatedata } from "@/app/utils/validation/checkoutvalidation";
import { useRouter } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import React, { ChangeEvent, useEffect, useState } from "react";

interface IError {
  shippingAddressLine1?: string;
  shippingCity?: string;
  shippingEmail?: string;
  shippingName?: string;
  shippingPhone?: string;
  shippingState?: string;
  shippingZipCode?: string;
  shippingCountry?: string;
}
const page = () => {
  const { cartItem, loading } = useAppSelector(
    (state: RootState) => state.cart
  );
  const { customerAddress, loading: addressloading } = useAppSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userinfo } = useAppSelector((state: RootState) => state.auth);
  const [shippingName, setShippingName] = useState("");
  const [shippingEmail, setshippingEmail] = useState("");
  const [shippingAddressLine1, setShippingAddressLine1] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZipCode, setShippingZipCode] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");
  const [error, setError] = useState<IError>({});
  const [addressErrors, setAddressErrors] = useState<any>({});
  const [showaddAddress, setShowAddress] = useState(false);
  const [isselectanotherADDRESS, setisselectanotherADDRESS] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    country: "india",
    state: "",
    city: "",
    phone_number: "",
    zipcode: "",
  });

  //   if(loading){
  //       return <Loading/>
  //   }
  const calculatedata = () => {
    const total = cartItem?.reduce(
      (acc: any, curr: any) => {
        acc["subtotal"] += curr.product?.discountprice
          ? curr?.product.discountprice * curr.quantity
          : curr?.product?.originalprice * curr.quantity;
        acc["item"] += curr.quantity;
        return acc;
      },
      { subtotal: 0, item: 0 }
    );
    setSubTotal(total["subtotal"]);
    setGrandTotal(parseFloat(total["subtotal"]) + 60);
  };

  useEffect(() => {
    if (userinfo) {
      setShippingName(userinfo?.name);
      setshippingEmail(userinfo?.email);
      setShippingPhone(userinfo?.user_information?.phone_number);
      setShippingAddressLine1(userinfo?.user_information?.street);
      setShippingCountry("india");
      setShippingState(userinfo?.user_information?.state);
      setShippingCity(userinfo?.user_information?.city);
      setShippingZipCode(userinfo?.user_information?.zipcode);
    }
  }, [userinfo]);
  useEffect(() => {
    if (cartItem) {
      calculatedata();
    }
  }, [cartItem]);

  //loadaddress....
  useEffect(() => {
    dispatch(loadAllAddressOfUserAsync());
  }, []);

  const AddresschangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedAddress = customerAddress?.filter((add: any) => {
      return Number(add?.id) == Number(e.target.value);
    })[0];
    if (selectedAddress) {
      setSelectedAddressId(selectedAddress?.id)
      setShippingCountry(selectedAddress?.country);
      setShippingState(selectedAddress?.state);
      setShippingCity(selectedAddress?.city);
      setShippingAddressLine1(selectedAddress.address);
      setShippingPhone(selectedAddress?.phone_number);
      setShippingZipCode(selectedAddress?.zipcode)
      console.log(selectedAddress);
    }
  }
  const submitHandler = () => {
    const data: any = {
      shippingName,
      shippingEmail,
      shippingPhone,
      shippingAddressLine1,
      shippingCountry,
      shippingState,
      shippingCity,
      paymentMethod,
      shippingZipCode,
      totalPrice: grandTotal,
    };
    const validate: any = validatedata(data);
    if (Object.keys(validate)?.length > 0) {
      setError(validate);
    } else {
      const itempayload = cartItem?.map((p: any) => {
        return {
          productId: Number(p.product.id),
          quantity: Number(p.quantity),
          price: parseFloat(p.product.discountprice),
          supplierId: Number(p?.product?.supplier_id),
        };
      });
      const payload = {
        shippingDetails: {
          name: shippingName,
          email: shippingEmail,
          phone: shippingPhone,
          addressLine1: shippingAddressLine1,
          country: "India",
          state: shippingState,
          city: shippingCity,
          zipCode: shippingZipCode,
        },
        orderItems: itempayload,
        totalPrice: grandTotal,
        status: "PENDING",
        paymentStatus: "UNPAID",
        paymentMethod: "CASH_ON_DELIVERY",
      };
      dispatch(orderproductAsync(payload))
        .unwrap()
        .then((res) => {
          successtoast(res.message);
          router.replace("/orders");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const AddAddressHandler = () => {
    const payload: any = {
      country: newAddress.country,
      state: newAddress.state,
      city: newAddress.city,
      zipcode: Number(newAddress.zipcode),
      phone_number: Number(newAddress.phone_number),
      addressLine1: newAddress.addressLine1,
    };
    const validate: any = validateaddressdata(payload);

    if (Object.keys(validate)?.length > 0) {
      setAddressErrors(validate);
    } else {
      dispatch(addAddressAsync(payload))
        .unwrap()
        .then((res) => {
          successtoast(res?.message);
          setShowAddress(false);
          setNewAddress({
            addressLine1: "",
            country: "india",
            state: "",
            city: "",
            phone_number: "",
            zipcode: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartItem?.length > 0 &&
              cartItem.map((p: any) => {
                return <CheckoutProductCard data={p} key={p?.product.id} />;
              })}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Details.
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="your_name"
                    className="mb-2 block text-sm font-medium"
                  >
                    {" "}
                    Your name*{" "}
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                    placeholder="Bonnie Green"
                    onChange={(e) => setShippingName(e.target.value)}
                    value={shippingName}
                    required
                  />
                  {error?.shippingName && (
                    <p className="error">{error?.shippingName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="your_email"
                    className="mb-2 block text-sm font-medium"
                  >
                    {" "}
                    Your email*{" "}
                  </label>
                  <input
                    type="email"
                    id="your_email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                    placeholder="name@flowbite.com"
                    value={shippingEmail}
                    onChange={(e) => setshippingEmail(e.target.value)}
                    required
                  />
                  {error?.shippingEmail && (
                    <p className="error">{error?.shippingEmail}</p>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label
                      htmlFor="select-country-input-3"
                      className="block text-sm font-medium"
                    >
                      {" "}
                      Country*{" "}
                    </label>
                  </div>
                  <select
                    value={shippingCountry}
                    onChange={(e) => setShippingCountry(e.target.value)}
                    id="select-country-input-3"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                  >
                    <option value={"india"}>India</option>
                  </select>
                  {error?.shippingCountry && (
                    <p className="error">{error?.shippingCountry}</p>
                  )}
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label
                      htmlFor="select-state-input-3"
                      className="block text-sm font-medium"
                    >
                      {" "}
                      State*{" "}
                    </label>
                  </div>
                  <input
                    type="text"
                    id="select-state-input-3"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                    placeholder="state"
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                    required
                  />
                  {error?.shippingState && (
                    <p className="error">{error?.shippingState}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium"
                  >
                    {" "}
                    city*{" "}
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                    placeholder="name@flowbite.com"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    required
                  />
                  {error?.shippingCity && (
                    <p className="error">{error?.shippingCity}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone-input-3"
                    className="mb-2 block text-sm font-medium"
                  >
                    {" "}
                    Phone Number*{" "}
                  </label>
                  <input
                    type="number"
                    id="phone-input-3"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                    value={shippingPhone}
                    placeholder="phone-number"
                    onChange={(e) => setShippingPhone(e.target.value)}
                    required
                  />
                  {error?.shippingPhone && (
                    <p className="error">{error?.shippingPhone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company_name"
                    className="mb-2 block text-sm font-medium"
                  >
                    {" "}
                    Address{" "}
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                    placeholder="floatno / street no"
                    value={shippingAddressLine1}
                    onChange={(e) => setShippingAddressLine1(e.target.value)}
                    required
                  />
                  {error?.shippingAddressLine1 && (
                    <p className="error">{error?.shippingAddressLine1}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="zipcode"
                    className="mb-2 block text-sm font-medium"
                  >
                    {" "}
                    zipcode*{" "}
                  </label>
                  <input
                    type="number"
                    id="zipcode"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                    placeholder="DE42313253"
                    onChange={(e) => setShippingZipCode(e.target.value)}
                    value={shippingZipCode}
                    required
                  />
                  {error?.shippingZipCode && (
                    <p className="error">{error?.shippingZipCode}</p>
                  )}
                </div>
              </div>
              <hr />

              {/* for add address........................ */}
              <div className="">

                {
                  customerAddress?.length > 0 && (
                    <>
                      <button
                        className="mt-4 w-full rounded-md bg-gray-900 px-6 py-2 font-medium text-white"
                        onClick={() => setisselectanotherADDRESS(!isselectanotherADDRESS)}
                      >
                        SELECT ANOTHER ADDRESS{" "}
                      </button>
                      {
                        isselectanotherADDRESS && (
                          <>
                            <form className="mt-5 grid gap-6" onSubmit={(e) => e.preventDefault()}>
                              {
                                customerAddress?.length > 0 && customerAddress.map((add: any) => {
                                  return (
                                    <div className="relative" key={add?.id}>
                                      <input
                                        className="peer hidden"
                                        id={add?.id}
                                        type="radio"
                                        name="radio"
                                        value={add?.id}
                                        onChange={(e) => handleAddressChange(e)}
                                        checked={Number(add?.id) == Number(selectedAddressId)}
                                      />
                                      <span className={`add_checkbox ${Number(add?.id) == Number(selectedAddressId) ? "add_checkbox_checked" : ""}`}></span>
                                      <label
                                        className={`flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 ${Number(add?.id) == Number(selectedAddressId) ? "add_checked" : ""}`}
                                        htmlFor={add?.id}
                                      >

                                        <div className="ml-5 flex">
                                          <span className="mt-2 font-semibold">
                                            <FaLocationDot />
                                          </span>
                                          <p className="text-slate-500 text-sm leading-6 ml-3">
                                            <span>{add?.address}, </span>
                                            <span>{add?.city}</span><br /><span>{add?.state}, </span><span>{add?.country}, </span><span>{add?.zipcode}</span>
                                          </p>
                                        </div>
                                      </label>
                                    </div>
                                  )
                                })
                              }
                            </form>
                          </>
                        )
                      }
                    </>
                  )
                }



                <button
                  className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-2 font-medium text-white"
                  onClick={() => setShowAddress(!showaddAddress)}
                >
                  + ADD NEW ADDRESS{" "}
                </button>
                {showaddAddress && (
                  <div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="select-country-input-3"
                            className="block text-sm font-medium"
                          >
                            {" "}
                            Country*{" "}
                          </label>
                        </div>
                        <select
                          value={shippingCountry}
                          onChange={(e) =>
                            setNewAddress((prev) => {
                              return { ...prev, country: "india" };
                            })
                          }
                          id="select-country-input-3"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                        >
                          <option value={"india"}>India</option>
                        </select>
                        {addressErrors?.country && (
                          <p className="error">{addressErrors?.country}</p>
                        )}
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="select-state-input-3"
                            className="block text-sm font-medium"
                          >
                            {" "}
                            State*{" "}
                          </label>
                        </div>
                        <input
                          type="text"
                          id="select-state-input-3"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                          name="state"
                          placeholder="state"
                          value={newAddress.state}
                          onChange={AddresschangeHandler}
                          required
                        />
                        {addressErrors?.state && (
                          <p className="error">{addressErrors?.state}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="city"
                          className="mb-2 block text-sm font-medium"
                        >
                          {" "}
                          city*{" "}
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                          placeholder="name@flowbite.com"
                          value={newAddress.city}
                          onChange={AddresschangeHandler}
                          required
                        />
                        {addressErrors?.city && (
                          <p className="error">{addressErrors?.city}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone-input-3"
                          className="mb-2 block text-sm font-medium"
                        >
                          {" "}
                          Phone Number*{" "}
                        </label>
                        <input
                          type="number"
                          id="phone-input-3"
                          name="phone_number"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                          value={newAddress.phone_number}
                          placeholder="phone_number"
                          onChange={AddresschangeHandler}
                          required
                        />
                        {addressErrors?.phone_number && (
                          <p className="error">{addressErrors?.phone_number}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="company_name"
                          className="mb-2 block text-sm font-medium"
                        >
                          {" "}
                          Address{" "}
                        </label>
                        <input
                          type="text"
                          id="company_name"
                          name="addressLine1"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                          placeholder="floatno / street no"
                          value={newAddress.addressLine1}
                          onChange={AddresschangeHandler}
                          required
                        />
                        {addressErrors?.addressLine1 && (
                          <p className="error">{addressErrors?.addressLine1}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="zipcode"
                          className="mb-2 block text-sm font-medium"
                        >
                          {" "}
                          zipcode*{" "}
                        </label>
                        <input
                          type="number"
                          id="zipcode"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-bold focus:border-primary-500"
                          placeholder="123456"
                          name="zipcode"
                          onChange={AddresschangeHandler}
                          value={newAddress.zipcode}
                          required
                        />
                        {addressErrors?.zipcode && (
                          <p className="error">{addressErrors?.zipcode}</p>
                        )}
                      </div>
                    </div>
                    <button
                      className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-2 font-medium text-white"
                      onClick={AddAddressHandler}
                    >
                      ADD{" "}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <>
            <p className="mt-8 text-lg font-medium">Payment Methods</p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                // checked
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  {/* <img
                                        className="w-14 object-contain"
                                        src="/images/naorrAeygcJzX0SyNI4Y0.png"
                                        alt=""
                                    /> */}
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Cash On Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days.
                    </p>
                  </div>
                </label>
              </div>
            </form>
          </>
          <p className="text-xl font-medium pt-4">Payment Details</p>
          {/* <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p> */}
          <div className="">
            {/* <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                name="credit-expiry"
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
              />
              <input
                type="text"
                name="credit-cvc"
                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
              />
            </div>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
              <select
                name="billing-state"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="State">State</option>
              </select>
              <input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div> */}

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">{`₹ ${subTotal}`}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">{`₹ ${60}`}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{`₹ ${grandTotal}`}</p>
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={submitHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
