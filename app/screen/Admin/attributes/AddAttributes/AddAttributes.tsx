"use client";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  createAttributeAsync,
  createAttributeUnitsAsync,
} from "@/app/Redux/features/attributes/attributeSlice";
import { loadAllActiveCategoriesAsync } from "@/app/Redux/features/category/categorySlice";
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
import React, { useEffect, useState } from "react";

const AddAttributes = () => {
  const dispatch = useAppDispatch();
  const { activeCategories: categories } = useAppSelector(
    (state) => state.category
  );
  const [category_id, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);
  const [required, setRequired] = useState(false);

  useEffect(() => {
    dispatch(loadAllActiveCategoriesAsync());
  }, []);
  const submitHandler = () => {
    const payload: any = {
      name,
      category_id,
      status,
      required,
    };
    dispatch(createAttributeAsync(payload))
      .unwrap()
      .then((res) => {
        successtoast(res.message);
        setCategoryId("");
        setName("");
        setStatus(false);
        setRequired(false);
      })
      .catch((error) => {
        console.log(error);
        errortoast(error?.message);
      });
  };
  return (
    <>
      <div className="container mt-5 mb-2">
        <div className="row gutters">
          <div className="col-md-8 m-auto">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Create Attribute</h6>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="category" className="mb-1">
                        Category <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name=""
                        id="category"
                        className="form-control"
                        value={category_id}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories?.map((c: any) => {
                          return (
                            <option value={c?.id} key={c?.id}>
                              {c?.name}
                            </option>
                          );
                        })}
                      </select>
                      {/* {error?.title && <span className="error">{error.title}</span>} */}
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="name" className="mb-1">
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {/* {error?.title && <span className="error">{error.title}</span>} */}
                    </div>
                  </div>
                  <div className="col-12 mb-1 mt-4 ms-1">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={required}
                        id="required"
                        onChange={() => setRequired(!required)}
                      />
                      <label className="form-check-label" htmlFor="required">
                        Required
                      </label>
                    </div>
                  </div>
                  <div className="col-12 mb-2 mt-4 ms-1">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={status}
                        id="flexCheckDefault"
                        onChange={() => setStatus(!status)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row gutters mt-2">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-primary w-100"
                        onClick={submitHandler}
                      >
                        SUBMIT
                      </button>
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

export default AddAttributes;
