import EditBanner from '@/app/screen/Admin/EditBanner/EditBanner';
import React from 'react'

const page = ({params}:{params:any}) => {
  const editid=params.id;
    return (
        <>
          <EditBanner editid={editid}/>
        </>
    )
}

export default page;