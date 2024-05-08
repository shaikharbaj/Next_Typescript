"use client"
import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import '../AddBlog/addblog.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import imageCompression from 'browser-image-compression'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import { RootState } from '@/app/Redux/store';
import { getsubcategoryById, loadCategoriesAsync, loadsubcategoriesofsingleCategory } from '@/app/Redux/features/category/categorySlice';
import { addblogAsync, editblogAsync, loadblogbyID } from '@/app/Redux/features/blog/blogSlice';
import { successtoast } from '@/app/utils/alerts/alerts';
import { useRouter } from 'next/navigation';

interface IEditFormPayload {
    title: string,
    description: string,
    category_id: number,
    subcategory_id: number,
    image: File
}
interface IEditBlogPayload {
    id: number,
    formdata: FormData
}
const EditBlog = ({ id }: { id: number }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading: blogloading, blogs } = useAppSelector((state: RootState) => state.blog);
    const { loading, categories, subcategories } = useAppSelector((state: RootState) => state.category);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setsubCategory] = useState("");
    const [imgcompressloading, setimgcompressloading] = useState(false);
    const [image, setImage] = useState<File | any>("");
    const [imagepreview, setImagePreview] = useState("");
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

    const HandleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setimgcompressloading(true);
        if (event?.target?.files) {
            const imageFile = event.target.files[0];
            if ((imageFile.size * 1024 * 1024) > (1 * 1024 * 1024)) {
                try {
                    const compressedFile = await imageCompression(imageFile, {
                        maxSizeMB: 1
                    });
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (typeof reader.result === 'string') {
                            setImagePreview(reader.result);
                        }
                    };
                    reader.readAsDataURL(compressedFile);
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
    useEffect(() => {
        dispatch(loadblogbyID(id)).unwrap().then((res) => {
            setsubCategory(res.data.subcategory_id)
            setCategory(res.data.category_id)
            setTitle(res.data.title);
            setDescription(res.data.description);
            setImagePreview(res.data.image);
            setTitle(res.data.title);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    useEffect(() => {
        if (category) {
            dispatch(loadCategoriesAsync()).unwrap().then((res) => {
                dispatch(loadsubcategoriesofsingleCategory(Number(category))).unwrap().then((res) => {
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [category]);
    useEffect(() => {
        if (category) {
            dispatch(loadsubcategoriesofsingleCategory(Number(category)))
        }
    }, [category])

    const inputchangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === "category") {
            setsubCategory("");
            setCategory(e.target.value);
        } else {
            setsubCategory(e.target.value);
        }
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formdata = new FormData();
        formdata.append('title', title);
        formdata.append('description', description);
        formdata.append('category_id', category);
        formdata.append('subcategory_id', subcategory);
        if (image) {
            formdata.append('image', image);
        }
        const payload: IEditBlogPayload = {
            id: id,
            formdata: formdata
        }
        dispatch(editblogAsync(payload)).unwrap().then((res) => {
            successtoast(res.message);
            router.replace("/admin/dashboard/blog");
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
            <section className='section create-post'>
                <div className='containerr'>
                    <h2 className='h2 heading'>UPDATE BLOG</h2>
                    <form className="form create-post__form" onSubmit={submitHandler}>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='input' />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" className='mb-1'>Category</label>
                            <select value={category} name='category' onChange={inputchangeHandler} className='input'>
                                <option value="" hidden>select category</option>
                                {
                                    categories.length > 0 && categories.map((c: any) => {
                                        return (
                                            <option value={c.id} key={c.id}>{c.name}</option>
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
                                            <option value={s.id} key={s.id}>{s.name}</option>
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
                            <label htmlFor="image" className='mb-1 image_title'>Upload Image</label>
                            <input type="file" className='image_input' id='image' onChange={HandleFileChange} />
                        </div>
                        <div className="preview mt-2">
                            {
                                imagepreview && <img src={imagepreview} alt="" />
                            }
                        </div>
                        <div className='mt-2'>
                            <input type="submit" className='submit_btn' value={blogloading ? "Blog is Updating" : (imgcompressloading ? "Image is Compressing" : "Update")} />
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
export default EditBlog;