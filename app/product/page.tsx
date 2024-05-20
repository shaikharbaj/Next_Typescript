"use client"
import ProductCard from '@/app/components/ProductCard/ProductCard'
import React, { useEffect } from 'react'
import styles from './style.module.css'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import { RootState } from '@/app/Redux/store'
import { loadallproductAsync } from '@/app/Redux/features/Product/productSlice'
import Navbar from '../components/Navbar/Navbar'
const AllProduct = () => {
    const { loading, products } = useAppSelector((state: RootState) => state.products)
    console.log(products)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadallproductAsync());
    }, [])
    return (
        <>
            <Navbar/>
            {/* <ProductCard/> */}
            <div className={`${styles.section} mt-5`}>
                <div className={`${styles.product_container}`}>
                    {
                        products && products.map((p: any) => {
                            return (
                                <ProductCard data={p} />
                            )
                        })
                    }
                </div>
                {products && products.length === 0 ? (
                    <h1 className={`${styles.product_not_found}`}>
                        No products Found!
                    </h1>
                ) : null}
            </div>
        </>
    )
}

export default AllProduct;