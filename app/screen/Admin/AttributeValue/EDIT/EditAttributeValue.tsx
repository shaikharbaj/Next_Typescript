import React from "react";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  createAttributeUnitsAsync,
  createAttributeValueAsync,
  editattributevalueAsync,
  getattributevalueByIdAsync,
  loadattributeByIDAsync,
} from "@/app/Redux/features/attributes/attributeSlice";
import { loadAllActiveCategoriesAsync } from "@/app/Redux/features/category/categorySlice";
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditAttributeValue = ({
  attribute_id,
  attributevalue_id,
}: {
  attribute_id: number;
  attributevalue_id: number;
}) => {
  const dispatch = useAppDispatch();
  const [attributevalueName, setAttributeValueName] = useState("");
  const router = useRouter();
  const [moduleName, setModuleName] = useState("");
  const [unit_id, setUnitId] = useState("");
  const [units, setUnits] = useState<any>([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    dispatch(loadattributeByIDAsync({ id: Number(attribute_id) }))
      .unwrap()
      .then((res) => {
        setUnits(res?.data?.category?.attributeUnit);
        dispatch(getattributevalueByIdAsync({ id: Number(attributevalue_id) }))
          .unwrap()
          .then((res) => {
            setAttributeValueName(res?.data?.name);
            setUnitId(res?.data?.attributeunit?.id);
            setStatus(res?.data?.status);
            setModuleName(res?.data?.attributes?.name);
          })
          .catch((err) => {
            console.log(err);
            errortoast(err.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const submitHandler = () => {
    const payload: any = {
      id: attributevalue_id,
      attributes_id: Number(attribute_id),
      status,
      attributevalueName,
    };
    if (unit_id) {
      payload["attributeunit_id"] = Number(unit_id);
    }
    dispatch(editattributevalueAsync(payload))
      .unwrap()
      .then((res) => {
        successtoast(res?.message);
        router.replace(`/admin/dashboard/attributes/${attribute_id}/values`);
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
                    <h6 className="mb-2 text-primary">
                      Edit {`${moduleName} value`}
                    </h6>
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

export default EditAttributeValue;
