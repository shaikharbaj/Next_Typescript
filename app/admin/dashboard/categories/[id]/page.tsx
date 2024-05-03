import Allsubcategories from '@/app/screen/Admin/Category/SubCategory/All/Allsubcategories'
import React from 'react'

const page = ({params}:{params:{id:number}}) => {
  return (
          <Allsubcategories id={params.id}/>
  )
}

export default page