"use client";
import Loading from "@/app/components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  get_product_varient_details,
  uploadproductvarient_images,
} from "@/app/Redux/features/Product/productSlice";
import { RootState } from "@/app/Redux/store";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./style.css";
import { error } from "console";
const page = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.products);
  const { slug, variant_id } = useParams();
  const [originalprice, setOriginalPrice] = useState("");
  const [discountprice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [main, setmain] = useState<File | null>();
  const [file1, setfile1] = useState<File | null>();
  const [varient_imges, setVarientImages] = useState<any>([]);
  const [file2, setfile2] = useState<File | null>();
  const [file3, setfile3] = useState<File | null>();
  const [file4, setfile4] = useState<File | null>();
  const [file5, setfile5] = useState<File | null>();
  const [varient, setVarient] = useState<any>({});
  console.log(varient);
  useEffect(() => {
    dispatch(
      get_product_varient_details({
        product_id: Number(slug),
        varient_id: Number(variant_id),
      })
    )
      .unwrap()
      .then((res) => {
        setVarient(res?.data);
        setDiscountPrice(res?.data?.discountprice);
        setOriginalPrice(res?.data?.originalprice);
        setStock(res?.data?.stock);
        setVarientImages(
          res?.data?.variantImages?.sort(function (a: any, b: any) {
            return a?.img_order - b?.img_order;
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const submitHandler = () => {
    const payload = {
      discountprice,
      originalprice,
      stock,
    };
  };

  const uploadVarientImageHandler = () => {
    const formdata = new FormData();
    if (main) {
      formdata.append("main", main);
    }
    if (file1) {
      formdata.append("file1", file1);
    }
    if (file2) {
      formdata.append("file2", file2);
    }
    if (file3) {
      formdata.append("file3", file3);
    }
    if (file4) {
      formdata.append("file4", file4);
    }
    if (file5) {
      formdata.append("file5", file5);
    }
    if (slug) {
      formdata.append("product_id", String(slug));
    }
    if (variant_id) {
      formdata.append("varient_id", String(variant_id));
    }

    dispatch(uploadproductvarient_images(formdata))
      .unwrap()
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  const changeImageHandler = (index: number) => {
    const newArr = varient_imges?.map((vi: any, i: number) => {
      if (index == i) {
        return { ...vi, url: null };
      } else {
        return vi;
      }
    });
    setVarientImages(newArr);
  };

  console.log(varient_imges[0]);

  //   if (loading) {
  //     return <Loading />;
  //   }
  return (
    <>
      <div className="container mt-5">
        <div className="product-header">
          <h5>
            {varient?.product?.name}{" "}
            <span style={{ fontSize: "16px" }}>({varient?.attributes})</span>
          </h5>
          <div>
            <button className="btn btn-dark me-2">&larr; BACK</button>
            <button className="btn btn-save" onClick={submitHandler}>
              SAVE &rarr;
            </button>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="originalPrice" className="form-label">
              Original Price :
            </label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                className="form-control"
                id="originalPrice"
                value={`${originalprice}.00`}
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="mrp" className="form-label">
              Selling Price:
            </label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                className="form-control"
                id="mrp"
                value={`${originalprice}.00`}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="mrp" className="form-label">
              Stock:
            </label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="stock"
                onChange={(e) => setStock(Number(e.target.value))}
                value={stock}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="container mt-5">
            <h2>Images:</h2>
            <p>Your Image Recommendations</p>
            <p>Upload your recommendations for product images</p>
            {/* <div className="image-upload-container">
              <div className="image-upload-box">
                <img src="image1.jpg" alt="Product Image" />
                <div className="actions">
                  <button className="btn btn-light">+</button>
                  <button className="btn btn-light">🗑️</button>
                </div>
              </div>
              <div className="image-upload-box">
                <img src="image2.jpg" alt="Product Image" />
                <div className="actions">
                  <button className="btn btn-light">+</button>
                  <button className="btn btn-light">🗑️</button>
                </div>
              </div>
              <div className="image-upload-box">
                <img src="image3.jpg" alt="Product Image" />
                <div className="actions">
                  <button className="btn btn-light">+</button>
                  <button className="btn btn-light">🗑️</button>
                </div>
              </div>
              <div className="image-upload-box">
                <img src="image4.jpg" alt="Product Image" />
                <div className="actions">
                  <button className="btn btn-light">+</button>
                  <button className="btn btn-light">🗑️</button>
                </div>
              </div>
              <div className="image-upload-box">
                <img src="image5.jpg" alt="Product Image" />
                <div className="actions">
                  <button className="btn btn-light">+</button>
                  <button className="btn btn-light">🗑️</button>
                </div>
              </div>
              <div className="image-upload-box">
                <img src="image6.jpg" alt="Product Image" />
                <div className="actions">
                  <button className="btn btn-light">+</button>
                  <button className="btn btn-light">🗑️</button>
                </div>
              </div>
            </div> */}
            <div className="col-12">
              <div className="row mt-3">
                <div className="col-lg-3 col-md-6">
                  <div className="multiupload_card uploaded_card mb-3">
                    <div className="upload_file upload_block w-100 mb-2">
                      {main ? (
                        <>
                          <img src={URL.createObjectURL(main)} alt="" />

                          <div className="row">
                            <div className="col-6 form-group">
                              <label htmlFor="main">
                                <i className="bx bx-plus-medical"></i>
                              </label>
                              <input
                                id="main"
                                type="file"
                                className="form-control d-none"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setmain(selectedFile);
                                }}
                              />
                            </div>
                            <div className="col-6">
                              <i
                                className="bx bxs-trash"
                                onClick={() => setmain(null)}
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {varient_imges[0]?.url ? (
                            <>
                              <img src={varient_imges[0]?.url} alt="" />
                              <div className="row">
                                <div className="col-6 form-group">
                                  <label htmlFor="main">
                                    <i className="bx bx-plus-medical"></i>
                                  </label>
                                  <input
                                    id="main"
                                    type="file"
                                    className="form-control d-none"
                                    onChange={(e) => {
                                      const selectedFile =
                                        e.target.files &&
                                        e.target.files.length > 0
                                          ? e.target.files[0]
                                          : null;
                                      setmain(selectedFile);
                                    }}
                                  />
                                </div>
                                <div className="col-6">
                                  <i
                                    className="bx bxs-trash"
                                    onClick={() => changeImageHandler(0)}
                                  ></i>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <label htmlFor="main">
                                <i className="bx bxs-camera"></i>
                              </label>
                              <input
                                type="file"
                                className="d-none"
                                id="main"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setmain(selectedFile);
                                }}
                              />
                              <p>Upload</p>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* file 1 */}
                <div className="col-lg-3 col-md-6">
                  <div className="multiupload_card uploaded_card mb-3">
                    <div className="upload_file upload_block w-100 mb-2">
                      {file1 ? (
                        <>
                          <img src={URL.createObjectURL(file1)} alt="" />

                          <div className="row">
                            <div className="col-6 form-group">
                              <label htmlFor="one">
                                <i className="bx bx-plus-medical"></i>
                              </label>
                              <input
                                id="one"
                                type="file"
                                className="form-control d-none"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setfile1(selectedFile);
                                }}
                              />
                            </div>
                            <div className="col-6">
                              <i
                                className="bx bxs-trash"
                                onClick={() => setfile1(null)}
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* <label htmlFor="one">
                            <i className="bx bxs-camera"></i>
                          </label>
                          <input
                            type="file"
                            className="d-none"
                            id="one"
                            onChange={(e) => {
                              const selectedFile =
                                e.target.files && e.target.files.length > 0
                                  ? e.target.files[0]
                                  : null;
                              setfile1(selectedFile);
                            }}
                          />
                          <p>Upload</p> */}

                          <>
                            {varient_imges[1]?.url ? (
                              <>
                                <img src={varient_imges[1]?.url} alt="" />
                                <div className="row">
                                  <div className="col-6 form-group">
                                    <label htmlFor="one">
                                      <i className="bx bx-plus-medical"></i>
                                    </label>
                                    <input
                                      type="file"
                                      className="d-none"
                                      id="one"
                                      onChange={(e) => {
                                        const selectedFile =
                                          e.target.files &&
                                          e.target.files.length > 0
                                            ? e.target.files[0]
                                            : null;
                                        setfile1(selectedFile);
                                      }}
                                    />
                                  </div>
                                  <div className="col-6">
                                    <i
                                      className="bx bxs-trash"
                                      onClick={() => changeImageHandler(1)}
                                    ></i>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <label htmlFor="one">
                                  <i className="bx bxs-camera"></i>
                                </label>
                                <input
                                  type="file"
                                  className="d-none"
                                  id="one"
                                  onChange={(e) => {
                                    const selectedFile =
                                      e.target.files &&
                                      e.target.files.length > 0
                                        ? e.target.files[0]
                                        : null;
                                    setfile1(selectedFile);
                                  }}
                                />
                                <p>Upload</p>
                              </>
                            )}
                          </>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* file 2  */}
                <div className="col-lg-3 col-md-6">
                  <div className="multiupload_card uploaded_card mb-3">
                    <div className="upload_file upload_block w-100 mb-2">
                      {file2 ? (
                        <>
                          <img src={URL.createObjectURL(file2)} alt="" />

                          <div className="row">
                            <div className="col-6 form-group">
                              <label htmlFor="two">
                                <i className="bx bx-plus-medical"></i>
                              </label>
                              <input
                                id="two"
                                type="file"
                                className="form-control d-none"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setfile2(selectedFile);
                                }}
                              />
                            </div>
                            <div className="col-6">
                              <i
                                className="bx bxs-trash"
                                onClick={() => setfile2(null)}
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {varient_imges[2]?.url ? (
                            <>
                              <img src={varient_imges[2]?.url} alt="" />
                              <div className="row">
                                <div className="col-6 form-group">
                                  <label htmlFor="two">
                                    <i className="bx bx-plus-medical"></i>
                                  </label>
                                  <input
                                    type="file"
                                    className="d-none"
                                    id="two"
                                    onChange={(e) => {
                                      const selectedFile =
                                        e.target.files &&
                                        e.target.files.length > 0
                                          ? e.target.files[0]
                                          : null;
                                      setfile2(selectedFile);
                                    }}
                                  />
                                </div>
                                <div className="col-6">
                                  <i
                                    className="bx bxs-trash"
                                    onClick={() => changeImageHandler(2)}
                                  ></i>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <label htmlFor="two">
                                <i className="bx bxs-camera"></i>
                              </label>
                              <input
                                type="file"
                                className="d-none"
                                id="two"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setfile2(selectedFile);
                                }}
                              />
                              <p>Upload</p>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* file 3  */}
                <div className="col-lg-3 col-md-6">
                  <div className="multiupload_card uploaded_card mb-3">
                    <div className="upload_file upload_block w-100 mb-2">
                      {file3 ? (
                        <>
                          <img src={URL.createObjectURL(file3)} alt="" />

                          <div className="row">
                            <div className="col-6 form-group">
                              <label htmlFor="three">
                                <i className="bx bx-plus-medical"></i>
                              </label>
                              <input
                                id="three"
                                type="file"
                                className="form-control d-none"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setfile3(selectedFile);
                                }}
                              />
                            </div>
                            <div className="col-6">
                              <i
                                className="bx bxs-trash"
                                onClick={() => setfile3(null)}
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {varient_imges[3]?.url ? (
                            <>
                              <img src={varient_imges[3]?.url} alt="" />
                              <div className="row">
                                <div className="col-6 form-group">
                                  <label htmlFor="three">
                                    <i className="bx bx-plus-medical"></i>
                                  </label>
                                  <input
                                    type="file"
                                    className="d-none"
                                    id="three"
                                    onChange={(e) => {
                                      const selectedFile =
                                        e.target.files &&
                                        e.target.files.length > 0
                                          ? e.target.files[0]
                                          : null;
                                      setfile3(selectedFile);
                                    }}
                                  />
                                </div>
                                <div className="col-6">
                                  <i
                                    className="bx bxs-trash"
                                    onClick={() => changeImageHandler(3)}
                                  ></i>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <label htmlFor="three">
                                <i className="bx bxs-camera"></i>
                              </label>
                              <input
                                type="file"
                                className="d-none"
                                id="three"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setfile3(selectedFile);
                                }}
                              />
                              <p>Upload</p>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* //file 4 */}
                <div className="col-lg-3 col-md-6">
                  <div className="multiupload_card uploaded_card mb-3">
                    <div className="upload_file upload_block w-100 mb-2">
                      {file4 ? (
                        <>
                          <img src={URL.createObjectURL(file4)} alt="" />

                          <div className="row">
                            <div className="col-6 form-group">
                              <label htmlFor="four">
                                <i className="bx bx-plus-medical"></i>
                              </label>
                              <input
                                id="four"
                                type="file"
                                className="form-control d-none"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setfile4(selectedFile);
                                }}
                              />
                            </div>
                            <div className="col-6">
                              <i
                                className="bx bxs-trash"
                                onClick={() => setfile4(null)}
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {varient_imges[4]?.url ? (
                            <>
                              <img src={varient_imges[4]?.url} alt="" />
                              <div className="row">
                                <div className="col-6 form-group">
                                  <label htmlFor="four">
                                    <i className="bx bx-plus-medical"></i>
                                  </label>
                                  <input
                                    type="file"
                                    className="d-none"
                                    id="four"
                                    onChange={(e) => {
                                      const selectedFile =
                                        e.target.files &&
                                        e.target.files.length > 0
                                          ? e.target.files[0]
                                          : null;
                                      setfile4(selectedFile);
                                    }}
                                  />
                                </div>
                                <div className="col-6">
                                  <i
                                    className="bx bxs-trash"
                                    onClick={() => changeImageHandler(4)}
                                  ></i>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <label htmlFor="four">
                                <i className="bx bxs-camera"></i>
                              </label>
                              <input
                                type="file"
                                className="d-none"
                                id="four"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setfile4(selectedFile);
                                }}
                              />
                              <p>Upload</p>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* file5  */}
                <div className="col-lg-3 col-md-6">
                  <div className="multiupload_card uploaded_card mb-3">
                    <div className="upload_file upload_block w-100 mb-2">
                      {file5 ? (
                        <>
                          <img src={URL.createObjectURL(file5)} alt="" />

                          <div className="row">
                            <div className="col-6 form-group">
                              <label htmlFor="five">
                                <i className="bx bx-plus-medical"></i>
                              </label>
                              <input
                                id="five"
                                type="file"
                                className="form-control d-none"
                                onChange={(e) => {
                                  const selectedFile =
                                    e.target.files && e.target.files.length > 0
                                      ? e.target.files[0]
                                      : null;
                                  setfile5(selectedFile);
                                }}
                              />
                            </div>
                            <div className="col-6">
                              <i
                                className="bx bxs-trash"
                                onClick={() => setfile5(null)}
                              ></i>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <label htmlFor="five">
                            <i className="bx bxs-camera"></i>
                          </label>
                          <input
                            type="file"
                            className="d-none"
                            id="five"
                            onChange={(e) => {
                              const selectedFile =
                                e.target.files && e.target.files.length > 0
                                  ? e.target.files[0]
                                  : null;
                              setfile5(selectedFile);
                            }}
                          />
                          <p>Upload</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <button
                    className="button"
                    onClick={uploadVarientImageHandler}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
