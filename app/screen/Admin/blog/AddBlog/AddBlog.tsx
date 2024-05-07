"use client"
import { useEffect, useState } from 'react';
import './addblog.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import { RootState } from '@/app/Redux/store';
import { getsubcategoryById, loadCategoriesAsync, loadsubcategoriesofsingleCategory } from '@/app/Redux/features/category/categorySlice';

const AddBlog = () => {
    const dispatch = useAppDispatch();
    const { loading, categories, subcategories } = useAppSelector((state: RootState) => state.category);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setsubCategory] = useState("");
    const [image, setImage] = useState("");

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, false] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blackquote', 'list', 'bullets', 'indent', 'link', 'image'
    ]
    useEffect(() => {
        dispatch(loadCategoriesAsync()).unwrap().then((res) => {
            //    setCategory(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    useEffect(() => {
        if (category) {
            dispatch(loadsubcategoriesofsingleCategory(Number(category)))
        }
    }, [category])
    return (
        <>
            <section className='section create-post'>
                <div className='containerr'>
                    <h2 className='h2 heading'>Create Blog</h2>
                    <form className="form create-post__form">
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='input' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Category</label>
                            <select value={category} name='category' onChange={(e) => setCategory(e.target.value)} className='input'>
                                <option value="" hidden>select category</option>
                                {
                                    categories.length > 0 && categories.map((c: any) => {
                                        return (
                                            <option value={c.id}>{c.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Sub-category</label>
                            <select value={subcategory} name='subcategory' onChange={(e) => setsubCategory(e.target.value)} className='input'>
                                <option value="" hidden>select sub-category</option>
                                {
                                    subcategories.length > 0 && subcategories.map((s: any) => {
                                        return (
                                            <option value={s.id}>{s.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Description</label>
                            <ReactQuill theme='snow' value={description} onChange={setDescription} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1 image_title'>Upload Image</label>
                            <input type="file" className='image_input' />
                        </div>
                        <div className="preview mt-2">
                            <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="" />
                        </div>
                        <div className='mt-2'>
                            <input type="submit" className='submit_btn' />
                        </div>
                    </form>


                </div>
            </section>
        </>
    )
}
export default AddBlog;