"use client";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { getsingleproductAsync } from "@/app/Redux/features/Product/productSlice";
import { RootState } from "@/app/Redux/store";
import Loading from "@/app/components/Loading/Loading";
import Navbar from "@/app/components/Navbar/Navbar";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./style.css";
const ProductDescription = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { loading } = useAppSelector((state: RootState) => state.products);
  const [selected_image, setSelectedImage] = useState<any>(0);
  const { loading: cartitemloading } = useAppSelector(
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
          console.log(res.data);
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

  if (loading && cartitemloading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container product-detail">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="product-name">{product?.name}</h1>
          <span className="status-active">Active</span>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <p>
              <strong>Category:</strong> {product?.category?.name}
            </p>
            <p>
              <strong>Product Name:</strong> {product?.name}
            </p>
            <p>
              <strong>Description:</strong> {product?.description}
            </p>
            <p>
              <strong>SKU:</strong> {product?.slug}
            </p>
            <p>
              <strong>Original Price:</strong> {`₹ ${product?.originalprice}`}
            </p>
            <p>
              <strong>Discount Price:</strong>
              {`₹ ${product?.discountprice}`}
            </p>
            {/* <p>
              <strong>Cost Per Item:</strong> ₹ 300
            </p>
            <p>
              <strong>Purchase Min qty:</strong> 11
            </p> */}
          </div>
          <div className="col-md-6">
            <p>
              <strong>Tags:</strong> No Tags
            </p>
            <p>
              <strong>Images:</strong>
            </p>
            <div className="images">
              {product?.productImages?.map((img: any) => {
                return <img src={img?.url} alt="Image 1" key={img?.id} />;
              })}
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <h4 className="mb-4" style={{ color: "#FF7B01" }}>
                Variant Listing:
              </h4>
              <table className="table table-bordered variant-listing">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>SKUs</th>
                  </tr>
                </thead>
                <tbody>
                  {product?.variants?.map((variation: any) => {
                    return (
                      <tr
                        onClick={() =>
                          router.push(
                            `/supplier/dashboard/product/${product?.id}/variations/${variation?.id}`
                          )
                        }
                        key={variation?.id}
                      >
                        <td>
                          <img
                            src={variation?.variantImages[0]?.url}
                            alt="Variant 1"
                          />
                        </td>
                        <td className="variant-title">{product?.name}</td>
                        <td>{variation?.sku}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
