import ProductCard from '@/app/components/ProductCard/ProductCard'
import React from 'react'
import styles from './style.module.css'
const AllProduct = () => {
    return (
        <>
           {/* <ProductCard/> */}
           <div className={`${styles.section} mt-5`}>
                        <div className={`${styles.product_container}`}>
                            {/* {data && data.map((i, index) => <ProductCard data={i} key={index} />)} */}
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                        </div>
                        {/* {data && data.length === 0 ? (
                            <h1 className={`${styles.product_not_found}`}>
                                No products Found!
                            </h1>
                        ) : null} */}
            </div>
        </>
    )
}

export default AllProduct