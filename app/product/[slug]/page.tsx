"use client"
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import { getsingleproductAsync } from '@/app/Redux/features/Product/productSlice'
import { RootState } from '@/app/Redux/store'
import Loading from '@/app/components/Loading/Loading'
import Navbar from '@/app/components/Navbar/Navbar'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swiper from 'swiper';
import './style.css'
const ProductDescription = () => {
  const { slug } = useParams();
  const {loading} = useAppSelector((state:RootState)=>state.products);
  const [product, setProduct] = useState({})
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (slug) {
      const payload: any = {
        slug
      }
      dispatch(getsingleproductAsync(payload)).unwrap().then((res)=>{
              console.log(res);
      }).catch((err)=>{
               console.log(err);
      })
    }
  }, [slug])

  if(loading){
      return <Loading/>
  }
  return (
    <>
      <Navbar />
    </>
  )
}


export default ProductDescription