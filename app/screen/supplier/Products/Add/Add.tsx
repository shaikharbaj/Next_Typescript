"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./addproduct.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import imageCompression from "browser-image-compression";
import {
  loadCategoriesAsync,
  loadsubcategoriesofsingleCategory,
} from "@/app/Redux/features/category/categorySlice";
import Loading from "@/app/components/Loading/Loading";
import { addproductAsync } from "@/app/Redux/features/Product/productSlice";
import { successtoast } from "@/app/utils/alerts/alerts";
import { useRouter } from "next/navigation";
import { validateProductData } from "@/app/utils/validation/supplier/addproductvalidation";
const Add = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories, loading: categoryloading } = useAppSelector(
    (state: RootState) => state.category
  );
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [imgcompressloading, setimgcompressloading] = useState(false);
  const [images, setImages] = useState<File | any>("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [subcategory_id, setsubcategory_id] = useState("");
  const [originalprice, setOriginalPrice] = useState("");
  const [discountprice, setDiscountPrice] = useState("");
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [imagePreview,setPreviews] = useState<any>([])
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
    dispatch(loadCategoriesAsync())
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
        })
        .catch((err) => {});
    }
  }, [category]);
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
    };
    const validate: any = validateProductData(payload);
    if (Object.keys(validate)?.length > 0) {
      setErrors(validate);
    } else {
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
                        className={`h-auto max-w-full rounded-lg ${primaryImageIndex==index?"primary_image":""}`}
                        src={i}
                        alt=""
                        onClick={()=>setPrimaryImageIndex(index)}
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
