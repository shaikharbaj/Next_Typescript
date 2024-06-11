"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./addproduct.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import imageCompression from "browser-image-compression";
import {
  loadAllActiveCategoriesAsync,
  loadCategoriesAsync,
  loadsubcategoriesofsingleCategory,
} from "@/app/Redux/features/category/categorySlice";
import Loading from "@/app/components/Loading/Loading";
import { addproductAsync } from "@/app/Redux/features/Product/productSlice";
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
import { useRouter } from "next/navigation";
import { validateProductData } from "@/app/utils/validation/supplier/addproductvalidation";
import {
  createAttributeUnitsAsync,
  getattributeby_categoryid,
  getattributeunitby_categoryid,
  getattributevalueby_attributeid,
} from "@/app/Redux/features/attributes/attributeSlice";
const Add = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { activeCategories: categories, loading: categoryloading } =
    useAppSelector((state: RootState) => state.category);
  const { activeAttributes, activeAttributeUnit, activeAttributeValue } =
    useAppSelector((state) => state.attribute);
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [imgcompressloading, setimgcompressloading] = useState(false);
  const [images, setImages] = useState<File | any>("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [attributeId, setAttributeId] = useState("");
  const [attributeunit_id, setAttributeUnitID] = useState("");
  const [attributevalue_id, setAttributeValueId] = useState("");
  const [subcategory_id, setsubcategory_id] = useState("");
  const [originalprice, setOriginalPrice] = useState("");
  const [discountprice, setDiscountPrice] = useState("");
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [imagePreview, setPreviews] = useState<any>([]);
  const [isaddAttributeUnit, setIsAddAttributeUnit] = useState(false);
  const [variants, setVariants] = useState<any[]>([]);

  //add unit.......
  const [unit_name, setUnitName] = useState("");
  const HandleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setimgcompressloading(true);
    if (event?.target?.files) {
      const files = Array.from(event.target.files);
      const compressedFiles: File[] = [];
      const imagePreviews: string[] = []; // Array to store image URLs for previews

      for (const file of files) {
        if (file.size > 1 * 1024 * 1024) {
          try {
            const compressedFile = await imageCompression(file, {
              maxSizeMB: 1,
            });
            compressedFiles.push(compressedFile);
            // Generate preview for the compressed image
            const previewURL = URL.createObjectURL(compressedFile);
            imagePreviews.push(previewURL);
          } catch (error) {
            console.log(error);
          }
        } else {
          compressedFiles.push(file);
          // Generate preview for the original image
          const previewURL = URL.createObjectURL(file);
          imagePreviews.push(previewURL);
        }
      }

      setImages(compressedFiles);
      setimgcompressloading(false);
      setPreviews(imagePreviews); // Set the image previews in state
    }
  };
  useEffect(() => {
    dispatch(loadAllActiveCategoriesAsync())
      .unwrap()
      .then((res) => {
        //    setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (category) {
      dispatch(loadsubcategoriesofsingleCategory(Number(category)))
        .unwrap()
        .then((res) => {
          setSubCategory(res.data);
          dispatch(getattributeby_categoryid({ categoty_id: Number(category) }))
            .unwrap()
            .then((res) => {})
            .catch((error) => {
              console.log(error);
            });
          dispatch(
            getattributeunitby_categoryid({ categoty_id: Number(category) })
          )
            .unwrap()
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((err) => {});
    }
  }, [category]);

  useEffect(() => {
    if (attributeId) {
      dispatch(
        getattributevalueby_attributeid({ attribute_id: Number(attributeId) })
      )
        .unwrap()
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [attributeId]);

  const addunitHandler = () => {
    const error: any = {};
    if (!category) {
      error.category_id = "category is required";
    }
    if (!unit_name) {
      error.unit_name = "unit is required";
    }
    if (Object.keys(error).length > 0) {
      console.log(error);

      setErrors(error);
    } else {
      setErrors({});
      const payload: any = {};
      payload.category_id = category;
      payload.status = true;
      payload.name = unit_name;
      dispatch(createAttributeUnitsAsync(payload))
        .unwrap()
        .then((res) => {
          successtoast(res?.message);
        })
        .catch((err) => {
          errortoast(err?.message);
        });
    }
  };

  const handleAddVariant = () => {
    const newVariant = {
      attributes: activeAttributes.map((attribute: any) => ({
        attributeId: attribute.id,
        attributeValueId: "",
      })),
      originalprice: "",
      discountprice: "",
      stock: "",
      images: [],
      primaryImageIndex: 0,
    };
    setVariants([...variants, newVariant]);
  };

  const handleAttributeChange = (
    variantIndex: number,
    attributeIndex: number,
    value: string
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex][attributeIndex].attributeValueId =
      Number(value);
    setVariants(updatedVariants);
  };

  const handleVariantChange = (
    variantIndex: number,
    field: string,
    value: any
  ) => {
    const updatedVariants = [...variants];
    if (field === "attributeValueId") {
      updatedVariants[variantIndex].attributes[value.index].attributeValueId =
        value.value;
    } else if (field === "images") {
      console.log(value);
      console.log(updatedVariants);
      updatedVariants[variantIndex][field] = value.files;
      updatedVariants[variantIndex].primaryImageIndex = 0; // Reset primary image index
    } else {
      console.log(value);
      updatedVariants[variantIndex][field] = value;
    }
    setVariants(updatedVariants);
  };

  const handleVariantImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    variantIndex: number
  ) => {
    setimgcompressloading(true);
    if (event?.target?.files) {
      const files = Array.from(event.target.files);
      const compressedFiles: File[] = [];
      const imagePreviews: string[] = [];

      for (const file of files) {
        if (file.size > 1 * 1024 * 1024) {
          try {
            const compressedFile = await imageCompression(file, {
              maxSizeMB: 1,
            });
            compressedFiles.push(compressedFile);
            const previewURL = URL.createObjectURL(compressedFile);
            imagePreviews.push(previewURL);
          } catch (error) {
            console.log(error);
          }
        } else {
          compressedFiles.push(file);
          const previewURL = URL.createObjectURL(file);
          imagePreviews.push(previewURL);
        }
      }

      handleVariantChange(variantIndex, "images", {
        files: compressedFiles,
        previews: imagePreviews,
      });
      setimgcompressloading(false);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: title,
      description: discription,
      category_id: category,
      subcategory_id: subcategory_id,
      originalprice,
      discountprice,
      stock,
      images,
      primaryImageIndex,
      // attribute_id: attributeId,
      // attributevalue_id: attributevalue_id,
      // attributeunit_id: attributeunit_id,
      variants: variants,
    };
    console.log(payload);
    const validate: any = validateProductData(payload);
    if (Object.keys(validate)?.length > 0) {
      setErrors(validate);
    } else {
      setErrors({});
      const formdata = new FormData();
      formdata.append("name", title);
      formdata.append("description", discription);
      formdata.append("category_id", category);
      formdata.append("subcategory_id", subcategory_id);
      formdata.append("originalprice", originalprice);
      formdata.append("discountprice", discountprice);
      formdata.append("stock", stock);

      images.forEach((image: any, index: number) => {
        formdata.append("images", image);
      });
      if (primaryImageIndex !== null) {
        formdata.append("primaryImageIndex", primaryImageIndex.toString());
      }

      variants.forEach((variant, variantIndex) => {
        formdata.append(
          `variants[${variantIndex}][originalprice]`,
          variant.originalprice
        );
        formdata.append(
          `variants[${variantIndex}][discountprice]`,
          variant.discountprice
        );
        formdata.append(`variants[${variantIndex}][stock]`, variant.stock);

        variant.images.forEach((image: any, imageIndex: any) => {
          formdata.append(`variants[${variantIndex}][images]`, image);
        });

        formdata.append(
          `variants[${variantIndex}][primaryImageIndex]`,
          variant.primaryImageIndex.toString()
        );

        variant.attributes.forEach((attribute: any, attributeIndex: number) => {
          if (attribute.attributeValueId !== "") {
            formdata.append(
              `variants[${variantIndex}][attributes][${attributeIndex}][attributeId]`,
              attribute.attributeId
            );
            formdata.append(
              `variants[${variantIndex}][attributes][${attributeIndex}][attributeValueId]`,
              attribute.attributeValueId
            );
          }
        });
      });

      dispatch(addproductAsync(formdata))
        .unwrap()
        .then((res) => {
          successtoast(res.message);
          router.replace("/supplier/dashboard/product");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  if (categoryloading) {
    return <Loading />;
  }
  return (
    <>
      <section className="section create-post">
        <div className="containerr">
          <h2 className="h2 heading">ADD Product</h2>
          <form className="form create-post__form" onSubmit={submitHandler}>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
              />
              {errors?.name && <p className="error">{errors?.name}</p>}
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Description
              </label>
              <input
                type="text"
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
                className="input"
              />
              {errors?.description && (
                <p className="error">{errors?.description}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Category
              </label>
              <select
                value={category}
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                className="input"
              >
                <option value="" hidden>
                  select category
                </option>
                {categories.length > 0 &&
                  categories.map((c: any) => {
                    return (
                      <option value={c.id} key={c.id}>
                        {c.name}
                      </option>
                    );
                  })}
              </select>
              {errors?.category_id && (
                <p className="error">{errors?.category_id}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Sub-category
              </label>
              <select
                value={subcategory_id}
                name="subcategory"
                className="input"
                onChange={(e) => setsubcategory_id(e.target.value)}
              >
                <option value="" hidden>
                  select sub-category
                </option>
                {subcategory.length > 0 &&
                  subcategory.map((s: any) => {
                    return (
                      <option value={s.id} key={s.id}>
                        {s.name}
                      </option>
                    );
                  })}
              </select>
              {errors?.subcategory_id && (
                <p className="error">{errors?.subcategory_id}</p>
              )}
            </div>

            <p className="mb-1">Add Varient</p>
            <div className="mb-2 varient">
              <div className="">
                {variants.map((variant, variantIndex) => (
                  <div key={variantIndex} className="mb-2 row variant_box">
                    <h5 className="h5 heading">Variant {variantIndex + 1}</h5>
                    {variant?.attributes?.map(
                      (attribute: any, attributeIndex: any) => {
                        const attributeName =
                          activeAttributes[attributeIndex]?.name || "";
                        const attributeValues =
                          activeAttributes[attributeIndex]?.attributevalues ||
                          [];
                        return (
                          <div
                            key={attributeIndex}
                            className="mb-2 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12"
                          >
                            <div className="form-group">
                              <label className="mb-1">{attributeName}</label>
                              <select
                                value={attribute.attributeValueId}
                                onChange={(e) =>
                                  handleVariantChange(
                                    variantIndex,
                                    "attributeValueId",
                                    {
                                      index: attributeIndex,
                                      value: e.target.value,
                                    }
                                  )
                                }
                                className="select form-control"
                              >
                                <option value="">Select {attributeName}</option>
                                {attributeValues.map((value: any) => (
                                  <option key={value.id} value={value.id}>
                                    {value?.name}
                                  </option>
                                ))}
                              </select>
                              {errors?.variants &&
                                errors?.variants[variantIndex] &&
                                errors?.variants[variantIndex][
                                  attributeIndex
                                ] && (
                                  <p className="error">
                                    {
                                      errors?.variants[variantIndex][
                                        attributeIndex
                                      ]
                                    }
                                  </p>
                                )}
                            </div>
                          </div>
                        );
                      }
                    )}
                    <div className="mb-2">
                      <label htmlFor="" className="mb-1">
                        Original Price
                      </label>
                      <input
                        type="number"
                        value={variant.originalprice}
                        onChange={(e) =>
                          handleVariantChange(
                            variantIndex,
                            "originalprice",
                            e.target.value
                          )
                        }
                        className="input"
                      />
                      {errors?.variants &&
                        errors?.variants[variantIndex] &&
                        errors?.variants[variantIndex].originalprice && (
                          <p className="error">
                            {errors?.variants[variantIndex].originalprice}
                          </p>
                        )}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="" className="mb-1">
                        Discount Price
                      </label>
                      <input
                        type="number"
                        value={variant.discountprice}
                        onChange={(e) =>
                          handleVariantChange(
                            variantIndex,
                            "discountprice",
                            e.target.value
                          )
                        }
                        className="input"
                      />
                      {errors?.variants &&
                        errors?.variants[variantIndex] &&
                        errors?.variants[variantIndex].discountprice && (
                          <p className="error">
                            {errors?.variants[variantIndex].discountprice}
                          </p>
                        )}
                    </div>
                    <div className="mb-2">
                      <label htmlFor="" className="mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) =>
                          handleVariantChange(
                            variantIndex,
                            "stock",
                            e.target.value
                          )
                        }
                        className="input"
                      />
                      {errors?.variants &&
                        errors?.variants[variantIndex] &&
                        errors?.variants[variantIndex].stock && (
                          <p className="error">
                            {errors?.variants[variantIndex].stock}
                          </p>
                        )}
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor={`variantImageUpload-${variantIndex}`}
                        className="mb-1"
                      >
                        Upload Images
                      </label>
                      <input
                        type="file"
                        id={`variantImageUpload-${variantIndex}`}
                        accept="image/*"
                        onChange={(e) =>
                          handleVariantImageChange(e, variantIndex)
                        }
                        multiple
                      />
                      {imgcompressloading ? (
                        <p>Loading...</p>
                      ) : (
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                          {variant.images.map((image: File, index: number) => {
                            return (
                              <div key={index}>
                                <img
                                  className={`varient_image-preview rounded-lg ${
                                    variant?.primaryImageIndex == index
                                      ? "primary_image"
                                      : ""
                                  }`}
                                  src={URL.createObjectURL(image)}
                                  alt={`Preview ${index}`}
                                  // onClick={() => setPrimaryImageIndex(index)}
                                  onClick={() =>
                                    handleVariantChange(
                                      variantIndex,
                                      "primaryImageIndex",
                                      index
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                        // <div className="image-preview-container d-flex">
                        //   {variant.images.map((image: File, index: number) => (
                        //     <div key={index} className="varient_image-preview">
                        //       <img
                        //         src={URL.createObjectURL(image)}
                        //         alt={`Preview ${index}`}
                        //       />
                        //       <div>
                        //         <label>
                        //           <input
                        //             type="radio"
                        //             name={`primaryImage-${variantIndex}`}
                        //             value={index}
                        //             checked={
                        //               index === variant.primaryImageIndex
                        //             }
                        //             onChange={() =>
                        //               handleVariantChange(
                        //                 variantIndex,
                        //                 "primaryImageIndex",
                        //                 index
                        //               )
                        //             }
                        //           />
                        //           Primary
                        //         </label>
                        //       </div>
                        //     </div>
                        //   ))}
                        // </div>
                      )}
                      {errors?.variants &&
                        errors?.variants[variantIndex] &&
                        errors?.variants[variantIndex].images && (
                          <p className="error">
                            {errors?.variants[variantIndex].images}
                          </p>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={handleAddVariant} type="button">
                Add Variant
              </button>
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                OriginalPrice
              </label>
              <input
                type="number"
                value={originalprice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="input"
              />
              {errors?.originalprice && (
                <p className="error">{errors?.originalprice}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Discount Price
              </label>
              <input
                type="number"
                value={discountprice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="input"
              />
              {errors?.discountprice && (
                <p className="error">{errors?.discountprice}</p>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="input"
              />
              {errors?.stock && <p className="error">{errors?.stock}</p>}
            </div>

            <div className="mb-2">
              <label htmlFor="image" className="mb-1 image_title">
                Upload Image
              </label>
              <input
                type="file"
                className="image_input"
                id="image"
                onChange={HandleFileChange}
                multiple
              />
              {errors?.images && <p className="error">{errors?.images}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreview &&
                imagePreview?.map((i: any, index: number) => {
                  return (
                    <div key={index}>
                      <img
                        className={`h-auto max-w-full rounded-lg ${
                          primaryImageIndex == index ? "primary_image" : ""
                        }`}
                        src={i}
                        alt=""
                        onClick={() => setPrimaryImageIndex(index)}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="mt-2">
              <input
                type="submit"
                className="submit_btn"
                // value={blogloading ? "Blog is Publishing" : (imgcompressloading ? "Image is Compressing" : "Publish")}
                value={"Add Product"}
                disabled={imgcompressloading}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Add;
