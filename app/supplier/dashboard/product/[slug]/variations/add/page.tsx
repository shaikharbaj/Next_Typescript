"use client";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  addproductVarientAsync,
  loadsingleproductByID,
} from "@/app/Redux/features/Product/productSlice";
import { get_variation_optionsAsync } from "@/app/Redux/features/attributes/attributeSlice";
import { loadAllActiveCategoriesAsync } from "@/app/Redux/features/category/categorySlice";
import Loading from "@/app/components/Loading/Loading";
import { slugify } from "@/app/utils/slug/slug_generator";
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
const AddVarient = () => {
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
  useEffect(() => {
    dispatch(loadsingleproductByID({ id: Number(slug) }))
      .unwrap()
      .then((res) => {
        setProduct(res?.data);
      })
      .catch((error) => {});
    dispatch(get_variation_optionsAsync({ category_id: 17 }))
      .unwrap()
      .then((res) => {
        setVariationOption(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        [] as { attributeID: number; attributevalue_id: number }[][]
      );

    return combinations;
  };

  const generateVariants = () => {
    const combinations = combineAttributes(selectedOptions);
    console.log(combinations);
    const newVariants = combinations.map((comb: any, index) => ({
      sku: `${slugify(product?.name)}-${comb
        .map((c: any) => {
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
    dispatch(
      addproductVarientAsync({ product_id: Number(slug), variants })
    );
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        <p>Choose Variation Type:</p>
        <div className="d-flex gap-3">
          {variationoptions?.attributes?.map((att: any) => {
            return (
              <div key={att?.id}>
                <input
                  type="checkbox"
                  id="one"
                  className="me-1"
                  checked={att?.required}
                  disabled={att?.required}
                />
                <label htmlFor="one">{att?.name}</label>
              </div>
            );
          })}
        </div>
        {variationoptions?.attributes?.map((att) => (
          <div key={att.id}>
            <label htmlFor={`select-${att.id}`}>{att.name}</label>
            <Select
              isMulti
              value={selectedOptions[att.id] || []}
              options={att.attributevalues
                .filter((att_val: any) => att_val.status)
                .map((att_val: any) => ({
                  label: `${
                    att_val?.attributeunit?.name
                      ? att_val.name + att_val?.attributeunit?.name
                      : att_val.name
                  }`,
                  value: att_val.id,
                }))}
              onChange={handleChange(att.id)}
            />
          </div>
        ))}

        <div>
          <button onClick={generateVariants}>Generate Variants</button>
        </div>

        {variants.length > 0 && (
          <table className="table">
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
              {variants.map((variant) => (
                <tr key={variant.id}>
                  <td>{variant.sku}</td>
                  <td>
                    <input
                      type="text"
                      value={variant.originalprice}
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
                      value={variant.discountprice}
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
                      value={variant.stock}
                      onChange={(e) =>
                        handleInputChange(variant.id, "stock", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => removeVariant(variant.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div>
          <button onClick={submitHandler} className="btn btn-primary">
            Save And Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVarient;
