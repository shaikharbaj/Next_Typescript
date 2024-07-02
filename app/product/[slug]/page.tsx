"use client";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  getproductdetails,
  getProductDetailsById,
  getsingleproductAsync,
} from "@/app/Redux/features/Product/productSlice";
import { RootState } from "@/app/Redux/store";
import Loading from "@/app/components/Loading/Loading";
import { Col, Container, Row } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "@/app/components/Navbar/Navbar";
import { useParams } from "next/navigation";
import React, {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import SliderImage from "react-zoom-slider";
import "./style.css";
import {
  addproducttocartAsync,
  decrementQuantityAsync,
  incrementQuantityAsync,
} from "@/app/Redux/features/cart/cartSlice";
import { successtoast } from "@/app/utils/alerts/alerts";
const ProductDescription = () => {
  const { slug } = useParams();
  const { loading } = useAppSelector((state: RootState) => state.products);
  const [option, setOption] = useState<any>({});
  const [selected_image, setSelectedImage] = useState<any>(0);
  const { cartItem, loading: cartitemloading } = useAppSelector(
    (state: RootState) => state.cart
  );
  const [product, setProduct] = useState<any>();
  const dispatch = useAppDispatch();

  const handleChange = () => {
    // setCount(e.target.value);
  };
  useEffect(() => {
    if (slug) {
      const payload: any = {
        slug,
      };
      dispatch(getproductdetails(payload))
        .unwrap()
        .then((res) => {
          setProduct(res.data);
          console.log(res.data);

          const attributes: any = {};
          res?.data.varientValue.forEach((value: any) => {
            attributes[value.attributeValue.attributes.name] =
              value.attributeValue.name;
          });
          setOption(attributes);

          // console.log(
          //   res.data?.variantImages
          //     .filter((i: any) => i?.url)
          //     .sort((i: any) => i?.isThumbnail)
          //     .map((i: any, index: number) => {
          //       return { image: i?.url, text: `img${index + 1}` };
          //     })
          // );
          // setSelectedImage(
          //   res?.data?.productImages?.findIndex((i: any) => i?.isThumbnail)
          // );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    setOption((prev:any)=>{
         return {...prev,[e.target.name]:e.target.value}
    })
    const prev = { ...option,[e.target.name]:e.target.value };
    console.log(e.target.name);
    console.log(e.target.value);
    dispatch(
      getProductDetailsById({ options: prev, id: Number(product?.productId) })
    ).unwrap().then((res)=>{
            setProduct(res.data);
            console.log(res.data);
    }).catch((err)=>{
          console.log(err);
    });
  };

  const AddToCartHandler = (id: number) => {
    dispatch(addproducttocartAsync({ product_id: id }))
      .unwrap()
      .then((res) => {
        successtoast(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DECREMENTQUANTITY = (product_id: number) => {
    dispatch(decrementQuantityAsync({ product_id }))
      .unwrap()
      .then((res) => {
        successtoast(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const INCREMENTQUANTITY = (product_id: number) => {
    dispatch(incrementQuantityAsync({ product_id }))
      .unwrap()
      .then((res) => {
        successtoast(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isProductInCart = cartItem?.findIndex(
    (i: any) => Number(i?.product?.id) === Number(product?.id)
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <section id="product_single_three" className="pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              {product && (
                <SliderImage
                  data={product?.variantImages
                    ?.filter((i: any) => i?.url)
                    .sort((i: any) => i?.isThumbnail)
                    .map((i: any, index: number) => {
                      return { image: i?.url, text: `img${index + 1}` };
                    })}
                  // width="500px"
                  showDescription={true}
                  direction="right"
                />
              )}
              <div className="product_details_cat">
                <ul>
                  <li>Category : </li>
                  <li>{product?.product?.category?.name}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="product_details_right_one">
                <div className="modal_product_content_one">
                  <h4>
                    {product?.product?.name}
                    <small style={{ fontSize: "13px" }}>
                      (Color: White, RAM: 6 GB, Internal Storage: 128 GB)
                    </small>
                  </h4>
                  <h4 className="single_protx">
                    <span className="price-symbol">₹</span>
                    <span>{product?.discountprice}.00</span>
                  </h4>
                  <hr className="hr_stone" />
                  <div className="variable-single-item">
                    {product?.varient?.map((v: any) => {
                      return (
                        <div key={v?.id}>
                          <p className="text-theme">{v?.name}:</p>
                          {v?.attributevalues?.map((attValue: any) => {
                            return (
                              <label
                                htmlFor={attValue?.id}
                                className="checkbox-btn"
                              >
                                <input
                                  type="radio"
                                  id={attValue?.id}
                                  name={v?.name}
                                  value={attValue?.name}
                                  onChange={handleInputChange}
                                  checked={attValue?.name === option[v?.name]}
                                />
                                <span className="btn btn-radiocheck">
                                  {attValue?.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="product_details_tabs">
                <ul className="nav nav-tabs">
                  <li>Description</li>
                </ul>
                <div id="description">
                  <div className="product_description">
                    {product?.product?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDescription;
