import React from "react";

const CheckoutProductCard = ({ data }: { data: any }) => {
  return (
    <>
      <div className="flex flex-col rounded-lg bg-white sm:flex-row">
        <img
          className="m-2 h-24 w-28 rounded-md border object-cover object-center"
          src={
            data?.product?.productImages[
              data?.product?.productImages.findIndex(
                (ele: any) => ele.isThumbnail == true
              )
            ]?.url
          }
          alt=""
        />
        <div className="flex w-full flex-col px-4 py-4">
          <span className="font-semibold">{data?.product?.name}</span>
          <span className="float-right text-gray-400">{`quantity : ${data?.quantity}`}</span>
          <p className="text-lg font-bold">
            {`₹ ${data?.product?.discountprice}`}{" "}
            <span className="text-sm font-bold text-decoration-line: line-through">{`₹ ${data?.product?.originalprice}`}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CheckoutProductCard;
