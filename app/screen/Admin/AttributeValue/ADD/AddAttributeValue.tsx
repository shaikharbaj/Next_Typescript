"use client"
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { createAttributeUnitsAsync, loadattributeByIDAsync } from "@/app/Redux/features/attributes/attributeSlice";
import { loadAllActiveCategoriesAsync } from "@/app/Redux/features/category/categorySlice";
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddAttributeValue = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const [attributename, setAttributeName] = useState("");
    const [unit, setUnit] = useState("");
    const [units,setUnits] = useState<any>([]);
    const [required, setRequired] = useState(false);

    useEffect(() => {
          dispatch(loadattributeByIDAsync({id:Number(id)})).unwrap().then((res)=>{
                setUnits(res?.data?.category?.attributeUnit);
          }).catch((error)=>{
               console.log(error.message);
          })
    }, []);
    const submitHandler = () => {
        const payload: any = {
            // name,
            // category_id,
            // status,
        };
        console.log(payload);
        dispatch(createAttributeUnitsAsync(payload))
            .unwrap()
            .then((res) => {
                
                // successtoast(res.message);
                // setCategoryId("");
                // setName("");
                // setStatus(false);
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
                                                value={attributename}
                                                onChange={(e) => setAttributeName(e.target.value)}
                                            />
                                            {/* {error?.title && <span className="error">{error.title}</span>} */}
                                        </div>
                                    </div>
                                   {
                                      (units && units?.length>0) && (
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
                                                value={unit}
                                                onChange={(e) => setUnit(e.target.value)}
                                            >
                                            <option value="">Select Unit</option>
                                            {
                                                units?.map((u:any)=>{
                                                    return <option value={u?.loadattributeunitByID} key={u?.id}>{u?.name}</option>
                                                })
                                            }
                                            </select>
                                            {/* {error?.title && <span className="error">{error.title}</span>} */}
                                        </div>
                                    </div>
                                            </>
                                      )
                                   }
                                    <div className="col-12 mb-2 mt-4 ms-1">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={required}
                                                id="flexCheckDefault"
                                                onChange={() => setRequired(!required)}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Required
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
