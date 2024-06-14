"use client";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { getsingleproductAsync } from "@/app/Redux/features/Product/productSlice";
import { RootState } from "@/app/Redux/store";
import Loading from "@/app/components/Loading/Loading";
import Navbar from "@/app/components/Navbar/Navbar";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
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
        <div className="save_button d-flex align-items-center justify-content-between sticky-header is-sticky">
          <h4 className="product-name">{product?.name} <small className="badge rounded-pill bg-success" style={{ fontSize: "12px" }}>Active</small></h4>
          <Link href={"/supplier/dashboard/product"}>
            Back
          </Link>
        </div>
        {/* <div className="row mt-4">
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
              // <strong>SKU:</strong> {product?.slug}
            </p>
            <p>
              <strong>Original Price:</strong> {`₹ ${product?.originalprice}`}
            </p>
            <p>
              <strong>Discount Price:</strong>
              {`₹ ${product?.discountprice}`}
            </p>
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
        </div> */}

        <div className="login_form_container">
          <section className="section about-section view_product_block gray-bg">
            <div className="container">
              <div className="row align-items-center flex-row-reverse">
                <div className="col-lg-12">
                  <div className="about-text go-to">
                    <div className="row about-list">
                      <div className="col-md-6">
                        <label>Category: </label>
                        <p>{product?.category?.name}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Product Name: </label>
                        <p>{product?.name}</p>
                      </div>
                    </div>
                    <div className="row about-list">
                      <div className="col-md-12">
                        <label>Description: </label>
                        <p>{product?.description}</p>
                      </div>

                    </div>
                    <div className="row about-list">
                      <div className="col-md-6">
                        <label>SKU</label>
                        <p>{product?.slug}</p>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="">Originaprice: </label>
                        <p>{`₹ ${product?.originalprice}`}</p>
                      </div>
                    </div>
                    <div className="row about-list">
                      <div className="col-md-6">
                        <label>Selling Price: </label>
                        <p>{`₹ ${product?.discountprice}`}</p>
                      </div>
                      {/* <div className="col-md-6">
                                          <label htmlFor="">Stock</label>
                                          <p>{`₹ ${product?.originalprice}`}</p>
                                        </div> */}
                    </div>
                    <div className="row about-list">
                      <div className="col-md-12" >
                        <label>Images: </label>
                        <span style={{ margin: "10px", display: "flex" }}>
                          {product?.productImages?.map((img: any) => {
                            return <img src={img?.url} className="img-responsive" alt="Image 1" key={img?.id} style={{ width: "90px", maxWidth: "450px;", height: "100px", objectFit: "contain" }} />;
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="row about-list">
          <div className="col-md-12">
            <label>Varient Listing :</label>
            <p>
              <div className="table-responsive">
                <table className="table table-hover table-bordered table-wrapper">
                  <thead>
                    <tr>
                      <th scope="col" className="col">Image</th>
                      <th scope="col" className="col">Title</th>
                      <th scope="col" className="col">SKUs</th>
                    </tr>
                  </thead>

                  <tbody>
                    {product?.variants?.map((variation: any) => {
                      return (
                        <tr className="variant align-items-center"
                          onClick={() =>
                            router.push(
                              `/supplier/dashboard/product/${product?.id}/variations/${variation?.id}`
                            )
                          }
                          key={variation?.id}
                        >
                          <td className="align-items-center">
                            <img
                              src={variation?.variantImages[variation?.variantImages?.findIndex((ele:any)=>ele?.isThumbnail)]?.url}
                              alt="Variant 1"
                              style={{ width: "60px", height: "70px", objectFit: "contain" }}
                            />
                          </td>
                          <td className="variant-title">{product?.name}</td>
                          <td>{variation?.sku}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
