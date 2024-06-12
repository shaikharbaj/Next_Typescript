"use client"
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import { get_variation_optionsAsync } from '@/app/Redux/features/attributes/attributeSlice';
import { loadAllActiveCategoriesAsync } from '@/app/Redux/features/category/categorySlice';
import Loading from '@/app/components/Loading/Loading';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Select, { MultiValue, ActionMeta } from 'react-select';

const AddVarient = () => {
    const { slug } = useParams();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.attribute);
    const searchParams = useSearchParams();
    const categoryType = searchParams.get('categoryType');
    const isAttribute = searchParams.get('isAttribute');
    const [variationoptions, setVariationOption] = useState<any>({});
    // const [checkedfield, setCheckedField] = useState({});
    const [selectedOptions, setSelectedOptions] = useState<any>({});
    useEffect(() => {
        dispatch(get_variation_optionsAsync({ category_id: 1 })).unwrap().then((res) => {
            console.log(res.data);
            setVariationOption(res?.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    const handleChange = (attId: number) => (newValue: MultiValue<{ label: string; value: number }>, actionMeta: ActionMeta<{ label: string; value: number }>) => {
        setSelectedOptions((prevState: any) => {
            return ({
                ...prevState,
                [attId]: newValue,
            })
        });
    };
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            <div>
                <p>Choose Variation Type:</p>
                <div className='d-flex gap-3'>
                    {
                        variationoptions?.attributes
                            ?.map((att: any) => {
                                return (
                                    <div key={att?.id}>
                                        <input type="checkbox" id='one' className='me-1' checked={att?.required} disabled={att?.required} />
                                        <label htmlFor="one">{att?.name}</label>
                                    </div>
                                )
                            })
                    }
                </div>
                {variationoptions?.attributes?.map((att: any) => (
                    <div key={att.id}>
                        <label htmlFor={`select-${att.id}`}>{att.name}</label>
                        <Select
                            isMulti
                            value={selectedOptions[att.id] || []}
                            options={att.attributevalues.map((att_val: any) => {
                                return ({
                                    "label": att_val.name,
                                    "value": att_val.id,
                                })
                            })}
                            onChange={handleChange(att.id)}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default AddVarient;