import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { createAttributeUnitsAsync, loadattributeunitByID } from "@/app/Redux/features/attributes/attributeSlice";
import { loadAllActiveCategoriesAsync } from "@/app/Redux/features/category/categorySlice";
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
import React, { useEffect, useState } from "react";

const Edit = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const { activeCategories: categories } = useAppSelector(
    (state) => state.category
  );
  const [category_id, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    dispatch(loadAllActiveCategoriesAsync()).unwrap().then((res)=>{
             dispatch(loadattributeunitByID({id})).unwrap().then((res)=>{
                    console.log(res.data);
                    setCategoryId(res?.data?.category_id);
                    setName(res?.data?.name);
                    setStatus(res?.data?.status);
             }).catch((err)=>{

             })
    }).catch((err)=>{
          
    });
  }, []);
  useEffect(()=>{

  },[])
  const submitHandler = () => {
    const payload: any = {
      name,
      category_id,
      status,
    };
    // console.log(payload);
    // dispatch(createAttributeUnitsAsync(payload))
    //   .unwrap()
    //   .then((res) => {
    //     successtoast(res.message);
    //     setCategoryId("");
    //     setName("");
    //     setStatus(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     errortoast(error?.message);
    //   });
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
                    <h6 className="mb-2 text-primary">Add Unit</h6>
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
                      <label htmlFor="unit" className="mb-1">
                        Unit <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="unit"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {/* {error?.title && <span className="error">{error.title}</span>} */}
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

export default Edit;
