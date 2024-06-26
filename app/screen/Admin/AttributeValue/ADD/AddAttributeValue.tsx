"use client";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  createAttributeUnitsAsync,
  createAttributeValueAsync,
  loadattributeByIDAsync,
} from "@/app/Redux/features/attributes/attributeSlice";
import { loadAllActiveCategoriesAsync } from "@/app/Redux/features/category/categorySlice";
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddAttributeValue = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [attributevalueName, setAttributeValueName] = useState("");
  const [unit_id, setUnitId] = useState("");
  const [units, setUnits] = useState<any>([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    dispatch(loadattributeByIDAsync({ id: Number(id) }))
      .unwrap()
      .then((res) => {
        setUnits(res?.data?.category?.attributeUnit);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const submitHandler = () => {
    const payload: any = {
      attributes_id: Number(id),
      status,
      attributevalueName,
    };
    if (unit_id) {
      payload["attributeunit_id"] = Number(unit_id);
    }
    dispatch(createAttributeValueAsync(payload))
      .unwrap()
      .then((res) => {
        successtoast(res.message);
        setAttributeValueName("");
        setUnitId("");
        setStatus(false);
      })
      .catch((error) => {
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
                    <h6 className="mb-2 text-primary">Add Unit</h6>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="attributevalue" className="mb-1">
                        Attribute Value<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="attributevalue"
                        placeholder="Enter attrubute value"
                        value={attributevalueName}
                        onChange={(e) => setAttributeValueName(e.target.value)}
                      />
                      {/* {error?.title && <span className="error">{error.title}</span>} */}
                    </div>
                  </div>
                  {units && units?.length > 0 && (
                    <>
                      <div className="col-12 mb-2">
                        <div className="form-group">
                          <label htmlFor="unit" className="mb-1">
                            Unit
                          </label>
                          <select
                            name="unit"
                            id="unit"
                            className="form-control"
                            value={unit_id}
                            onChange={(e) => setUnitId(e.target.value)}
                          >
                            <option value="">Select Unit</option>
                            {units?.map((u: any) => {
                              return (
                                <option value={u?.id} key={u?.id}>
                                  {u?.name}
                                </option>
                              );
                            })}
                          </select>
                          {/* {error?.title && <span className="error">{error.title}</span>} */}
                        </div>
                      </div>
                    </>
                  )}
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
                        status
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

export default AddAttributeValue;
