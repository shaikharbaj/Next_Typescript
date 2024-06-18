"use client";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import styles from "./add/add.module.css";
import {
  addproductVarientAsync,
  loadsingleproductByID,
} from "@/app/Redux/features/Product/productSlice";
import { get_variation_optionsAsync } from "@/app/Redux/features/attributes/attributeSlice";
import { loadAllActiveCategoriesAsync } from "@/app/Redux/features/category/categorySlice";
import Loading from "@/app/components/Loading/Loading";
import { slugify } from "@/app/utils/slug/slug_generator";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select, { MultiValue, ActionMeta } from "react-select";

type AttributeValue = {
  id: number;
  name: string;
  status: boolean;
  attributes_id: number;
  attributeunit_id: number | null;
  createdAt: string;
  updatedAt: string;
};

type Attribute = {
  id: number;
  name: string;
  status: boolean;
  required: boolean;
  createdAt: string;
  updatedAt: string;
  category_id: number;
  attributevalues: AttributeValue[];
};

type VariationOptions = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  parent_id: number | null;
  category_status: boolean;
  subcategory_status: boolean | null;
  attributes: Attribute[];
};
const EditVarient = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.attribute);
  const searchParams = useSearchParams();
  console.log(slug);
  const categoryType = searchParams.get("categoryType");
  const isAttribute = searchParams.get("isAttribute");
  const [product, setProduct] = useState<any>({});
  const [variationoptions, setVariationOption] =
    useState<VariationOptions | null>(null);
  const [variants, setVariants] = useState<any[]>([]);
  // const [checkedfield, setCheckedField] = useState({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, MultiValue<{ label: string; value: number }>>
  >({});
  const [checkedAttributes, setCheckedAttributes] = useState<
    Record<number, boolean>
  >({});
  useEffect(() => {
    dispatch(loadsingleproductByID({ id: Number(slug) }))
      .unwrap()
      .then((res) => {
        setProduct(res?.data);
        console.log();
        dispatch(
          get_variation_optionsAsync({
            category_id: Number(res?.data?.category?.id),
          })
        )
          .unwrap()
          .then((res) => {
            setVariationOption(res?.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {});
  }, []);

  const handleCheckboxChange = (attId: number) => {
    setCheckedAttributes((prevState) => ({
      ...prevState,
      [attId]: !prevState[attId],
    }));
  };

  const handleChange =
    (attId: number) =>
    (
      newValue: MultiValue<{ label: string; value: number }>,
      actionMeta: ActionMeta<{ label: string; value: number }>
    ) => {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [attId]: newValue,
      }));
    };

  const combineAttributes = (
    selectedOptions: Record<
      number,
      MultiValue<{ label: string; value: number }>
    >
  ): { attributeID: number; attributevalue_id: number }[][] => {
    const attributeEntries = Object.entries(selectedOptions);
    if (attributeEntries.length === 0) return [];

    const combinations: { attributeID: number; attributevalue_id: number }[][] =
      attributeEntries.reduce(
        (
          acc: { attributeID: number; attributevalue_id: number }[][],
          [attributeID, attrValues]
        ) => {
          const values = attrValues.map((a) => ({
            attributeID: Number(attributeID),
            attributevalue_id: a.value,
          }));
          if (acc.length === 0) return values.map((value) => [value]);
          return acc.flatMap((comb) => values.map((value) => [...comb, value]));
        },
        []
      );

    return combinations;
  };

  const generateVariants = () => {
    // Filter the selected options to only include required and checked attributes
    const filteredSelectedOptions = Object.entries(selectedOptions).reduce(
      (acc, [key, value]) => {
        const attId = Number(key);
        const attribute = variationoptions?.attributes.find(
          (att) => att.id === attId
        );
        if (attribute && (attribute.required || checkedAttributes[attId])) {
          acc[attId] = value;
        }
        return acc;
      },
      {} as Record<number, MultiValue<{ label: string; value: number }>>
    );

    const combinations = combineAttributes(filteredSelectedOptions);

    const newVariants = combinations.map((comb, index) => ({
      sku: `${slugify(product.name)}-${comb
        .map((c) => {
          const attribute = variationoptions?.attributes.find(
            (att) => att.id === c.attributeID
          );
          const attributeValue = attribute?.attributevalues.find(
            (val) => val.id === c.attributevalue_id
          );
          return attributeValue?.name.toLowerCase().replace(/\s+/g, "-");
        })
        .join("-")}`,
      originalprice: 0,
      discountprice: 0,
      stock: 0,
      attributes: comb,
      id: index,
    }));
    setVariants(newVariants);
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };
  const removeVariant = (id: number) => {
    setVariants((prevVariants) =>
      prevVariants.filter((variant) => variant.id !== id)
    );
  };

  const submitHandler = () => {
    // const combinations = combineAttributes(selectedOptions);
    // console.log(combinations);
    dispatch(addproductVarientAsync({ product_id: Number(slug), variants }));
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="p-2">
        <div className="vendor_dashboard mt-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="title mb-0">{product?.name}</h4>
                    <Link href={"/"}>Back</Link>
                  </div>
                </div>
              </div>
              {/* <div className="mt-2">
                         <div className="MuiBox-root css-mmst5v">
                          <div className="MuiBox-root css-0">
                            <div className="MuiTabs-scroller MuiTabs-fixed css-1anid1y" style={{overflow:"hidden",marginBottom:"0px"}}>
                                <div className="MuiTabs-flexContainer MuiTabs-centered css-1l4w6pd" role="tablist">
                                    
                                </div>
                            </div>
                          </div>

                         </div>
                     </div> */}

              {/* <div className="onboarding-section"> */}
              {/* <form autoComplete="off">
                             <div className="row">
                                 <div className="col-lg-12">
                                     <div className="card card_v1">
                                         <div className="card-body">
                                             <h5>Choose Variation Type:</h5>
                                             <div className="d-flex flex-wrap prod_variation_check my-1">
                                                 <span>Sorry! No variations found for this category</span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </form> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-lg-12">
            <div className={`card ${styles.card}`}>
              <div className="card-body">
                <h5>Choose Variation Type:</h5>
                <div className="d-flex flex-wrap prod_variation_check my-1">
                  {variationoptions?.attributes?.map((att: any) => {
                    return (
                      <div className="form-check mr-20">
                        <label
                          htmlFor={att?.id}
                          className="d-flex flex-row align-items-center justify-content-start"
                        ></label>
                        <input
                          type="checkbox"
                          id={att?.id}
                          className="form-check-input"
                          checked={att.required || checkedAttributes[att.id]}
                          disabled={att.required}
                          onChange={() => handleCheckboxChange(att.id)}
                        />
                        &nbsp;
                        <span className="mt-1">{att?.name}</span>
                      </div>
                    );
                  })}
                </div>
                <hr />
                <h5 className="fs-5">
                  List of all variants for the variation types below.
                </h5>
                <p className="desc mt-1">
                  For the fields below, list the variations that exists for
                  products. For example, if you are selling pirate Shirts in the
                  sizes Small, Medium and Large, and in the colours White and
                  Black, list all those terms.
                </p>

                {variationoptions?.attributes?.map(
                  (att) =>
                    (att.required || checkedAttributes[att.id]) && (
                      <div className="card card mt-1">
                        <div className="card-body row">
                          <div className="col-lg-6">
                            <div key={att.id}>
                              <label htmlFor={`select-${att.id}`}>
                                {att.name}
                              </label>
                              <Select
                                isMulti
                                value={selectedOptions[att.id] || []}
                                options={att.attributevalues
                                  .filter((att_val: any) => att_val.status)
                                  .map((att_val: any) => ({
                                    label: `${
                                      att_val?.attributeunit?.name
                                        ? att_val.name +
                                          att_val?.attributeunit?.name
                                        : att_val.name
                                    }`,
                                    value: att_val.id,
                                  }))}
                                onChange={handleChange(att.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-2">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <button
                  onClick={generateVariants}
                  className={styles.generate_varient_btn}
                >
                  Generate Variants
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 mt-2">
          <div className="card">
            <div className="card-body">
              <div
                className={`${styles.table_wrapper} ${styles.table_responsive}`}
              >
                {/* <table className="table table-hover"> */}
                {variants.length > 0 && (
                  <table className={"table table-hover"}>
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>originalprice</th>
                        <th>discountprice</th>
                        <th>stock</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants?.map((variant) => (
                        <tr key={variant.id}>
                          <td className="v-title">{variant.sku}</td>
                          <td>
                            <input
                              type="text"
                              value={variant.originalprice}
                              className="form-control variant-control"
                              onChange={(e) =>
                                handleInputChange(
                                  variant.id,
                                  "originalprice",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={variant?.discountprice}
                              className="form-control variant-control"
                              onChange={(e) =>
                                handleInputChange(
                                  variant.id,
                                  "discountprice",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control variant-control"
                              value={variant.stock}
                              onChange={(e) =>
                                handleInputChange(
                                  variant.id,
                                  "stock",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className={styles.remove_wrapper}>
                            <button
                              className=""
                              onClick={() => removeVariant(variant.id)}
                            >
                              <i
                                className={`bx bxs-trash-alt ${styles.trash}`}
                              ></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {/* </table> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 mt-2">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <button
                  onClick={submitHandler}
                  className={styles.generate_varient_btn}
                >
                  Save And Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditVarient;
