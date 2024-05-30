"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import "../Add/addproduct.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  loadCategoriesAsync,
  loadsubcategoriesofsingleCategory,
} from "@/app/Redux/features/category/categorySlice";
import { RootState } from "@/app/Redux/store";
import {
  editproductAsync,
  getsingleproductAsync,
  loadsingleproductByID,
} from "@/app/Redux/features/Product/productSlice";
import { successtoast } from "@/app/utils/alerts/alerts";
interface IEditProps {
  id: number;
}
const Edit: React.FC<IEditProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { categories, loading: categoryloading } = useAppSelector(
    (state: RootState) => state.category
  );
  const { loading:productloading } = useAppSelector(
    (state: RootState) => state.products
  );
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [imgcompressloading, setimgcompressloading] = useState(false);
  const [image, setImage] = useState<File | any>("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [subcategory_id, setsubcategory_id] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  const HandleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setimgcompressloading(true);
    if (event?.target?.files) {
      const imageFile = event.target.files[0];
      if (imageFile.size * 1024 * 1024 > 1 * 1024 * 1024) {
        try {
          const compressedFile = await imageCompression(imageFile, {
            maxSizeMB: 1,
          });
          setImage(compressedFile);
          return;
        } catch (error) {
          console.log(error);
        } finally {
          setimgcompressloading(false);
        }
      }
      setImage(imageFile);
    }
  };

  useEffect(() => {
    dispatch(loadCategoriesAsync())
      .unwrap()
      .then((res) => {
        //load product..............
        dispatch(loadsingleproductByID({ id: Number(id) }))
          .unwrap()
          .then((res) => {
            console.log(res)
            setTitle(res?.data?.name);
            setDiscription(res?.data?.description);
            setCategoryId(res?.data?.category?.id)
            setsubcategory_id(res?.data?.subcategory?.id)
            setOriginalPrice(res?.data?.originalprice);
            setDiscountPrice(res?.data?.discountprice);
            setStock(res?.data?.stock);
          })
          .catch((err) => {
            console.log(err);
          });
        //    setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (categoryId) {
      dispatch(loadsubcategoriesofsingleCategory(Number(categoryId)))
        .unwrap()
        .then((res) => {
          setSubCategory(res.data);
        })
        .catch((err) => { });
    }
  }, [categoryId]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(title);
    const formdata = new FormData();
    formdata.append("name", title);
    formdata.append("description", description);
    formdata.append("category_id", categoryId);
    formdata.append("subcategory_id", subcategory_id);
    formdata.append("originalprice", originalPrice);
    formdata.append("discountprice", discountPrice);
    formdata.append("stock", stock);

    dispatch(editproductAsync({id:Number(id),data:formdata})).unwrap().then((res)=>{
         successtoast(res.message);
         console.log(res.data);
    }).catch((error)=>{
           console.log(error);
    });
    // dispatch(editproductAsync({id:Number(id),data:formdata})).unwrap().then((res)=>{
    //       console.log(res.data);
    // })

  };

  console.log(description)

  return (
    <>
      <section className="section create-post">
        <div className="containerr">
          <h2 className="h2 heading">Edit Product</h2>
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
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDiscription(e.target.value)}
                className="input"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Category
              </label>
              <select
                value={categoryId}
                name="category"
                onChange={(e) => setCategoryId(e.target.value)}
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
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Sub-category
              </label>
              <select name="subcategory" className="input" value={subcategory_id}>
                <option value="" hidden>
                  select sub-category
                </option>
                {subcategory?.length > 0 &&
                  subcategory.map((s: any) => {
                    return (
                      <option value={s.id} key={s.id}>
                        {s.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                OriginalPrice
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="input"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="" className="mb-1">
                Discount Price
              </label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="input"
              />
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
              />
            </div>
            <div className="preview mt-2">
              {image && <img src={URL.createObjectURL(image)} alt="" />}
            </div>
            <div className="mt-2">
              <input
                type="submit"
                className="submit_btn"
                // value={blogloading ? "Blog is Publishing" : (imgcompressloading ? "Image is Compressing" : "Publish")}
                value={productloading?"wait":"Edit Product"}
                disabled={imgcompressloading}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Edit;
