"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import imageCompression from 'browser-image-compression'
import '../Add/addproduct.css';
interface IEditProps {
    id: number
}
const Edit: React.FC<IEditProps> = ({ id }) => {
    const [title, setTitle] = useState("");
    const [imgcompressloading, setimgcompressloading] = useState(false);
    const [image, setImage] = useState<File | any>("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubCategory] = useState([]);
    const [originalPrice, setOriginalPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [stock, setStock] = useState("");

    const HandleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setimgcompressloading(true);
        if (event?.target?.files) {
            const imageFile = event.target.files[0];
            if ((imageFile.size * 1024 * 1024) > (1 * 1024 * 1024)) {
                try {
                    const compressedFile = await imageCompression(imageFile, {
                        maxSizeMB: 1
                    });
                    setImage(compressedFile);
                    return;
                } catch (error) {
                    console.log(error);
                } finally {
                    setimgcompressloading(false);
                }
            }
            setImage(imageFile);
        }

    }

    const submitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(title);
        
    }

    return (
        <>
           <section className='section create-post'>
                <div className='containerr'>
                    <h2 className='h2 heading'>Edit Product</h2>
                    <form className="form create-post__form" onSubmit={submitHandler}>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='input' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Description</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='input' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Category</label>
                            <select value={category} name='category' onChange={(e) => setCategory(e.target.value)} className='input'>
                                <option value="" hidden>select category</option>
                                {/* {
                                    categories.length > 0 && categories.map((c: any) => {
                                        return (
                                            <option value={c.id} key={c.id}>{c.name}</option>
                                        )
                                    })
                                } */}
                            </select>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Sub-category</label>
                            <select value={subcategory} name='subcategory' className='input'>
                                <option value="" hidden>select sub-category</option>
                                {
                                    subcategory.length > 0 && subcategory.map((s: any) => {
                                        return (
                                            <option value={s.id} key={s.id}>{s.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>OriginalPrice</label>
                            <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className='input' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Discount Price</label>
                            <input type="number" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} className='input' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Stock</label>
                            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className='input' />
                        </div>


                        <div className='mb-2'>
                            <label htmlFor="image" className='mb-1 image_title'>Upload Image</label>
                            <input type="file" className='image_input' id='image' onChange={HandleFileChange} />
                        </div>
                        <div className="preview mt-2">
                            {
                                image && <img src={URL.createObjectURL(image)} alt="" />
                            }
                        </div>
                        <div className='mt-2'>
                            <input type="submit" className='submit_btn'
                                // value={blogloading ? "Blog is Publishing" : (imgcompressloading ? "Image is Compressing" : "Publish")}
                                value={"Add Product"}
                                disabled={imgcompressloading}
                            />
                        </div>
                    </form>
                </div>
           </section>
        </>
    )
}

export default Edit;