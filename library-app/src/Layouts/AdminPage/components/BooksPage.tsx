import { useEffect, useRef, useState } from "react";
import CategoryModel from "../../../Models/CategoryModel";
import { BooksTable } from "./BooksTable";
import { addBook } from "../../../Service/BookService";
import { fetchCategories } from "../../../Service/CategoryService";

export const BooksPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState("Select");
    const [categorySelected, setCategorySelected] = useState<CategoryModel>();
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const [bookAdded, setBookAdded] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Displays
    const [displayWarning, setDisplayWarning] = useState('');
    const [displaySuccess, setDisplaySuccess] = useState('');

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [httpError, setHttpError] = useState(null);
    
    useEffect(() => {
        fetchCategories().then((response: any) => {
            const loadedCategories: CategoryModel[] = [];
            for (let key in response) {
                loadedCategories.push({
                    id: response[key].id,
                    name: response[key].name
                })
            }
            setCategories(loadedCategories);
            setHttpError(null);
        }).catch((error: any)=> {
            setHttpError(error.message);
        })
    }, []);

    function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    const handleAdd = () => {
        if (title !== '' && author !== '' && categorySelected !== null && categorySelected !== undefined && description !== '' && copies >= 0){
            const newBook = {
                title: title,
                author: author,
                category: categorySelected,
                description: description,
                copies: copies,
                copiesAvailable: copies,
                img: selectedImage
            }
        addBook(newBook).then((response: any) => {
            resetFields();
            setDisplayWarning('');
            setDisplaySuccess("Book Saved successfully");
            setBookAdded(true);
        }).catch((error: any) => {
            setDisplayWarning(error.message);
            setDisplaySuccess('');
        })
        }
        else{
            setDisplayWarning("All fields must be filled");   
        }
    }

    const resetFields = async () => {
        setTitle('');
        setAuthor('');
        setCategory('Select');
        setCategorySelected(undefined);
        setDescription('');
        setCopies(0);
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input value
        }
    }

    const categoryField = (id: number, name: string) => {
        if (id=== 0 && name=== 'Select') {
            setCategory(name);
        } else {
            setCategory(name);
            setCategorySelected({
                id: id,
                name: name
            });
        }
    }

    const handleClose = () => {
        resetFields();
        setDisplayWarning('');
        setDisplaySuccess('');
    }

    return (
        <>
        <div className="mt-4">
            <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addModal">+ Add new book</button>
            <div className="modal fade" id="addModal" tabIndex={-1} aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Add Book</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            {displaySuccess!=='' &&
                                <div className='alert alert-success' role='alert'>
                                    {displaySuccess}
                                </div>
                            }
                            {displayWarning!=='' &&
                                <div className='alert alert-danger' role='alert'>
                                    {displayWarning}
                                </div>
                            }
                            <div className='row'>
                                <div className='col-md-6 mb-3'>
                                    <label className='form-label'>Title</label>
                                    <input type="text" className='form-control' name='title' required
                                        onChange={e => setTitle(e.target.value)} value={title} />
                                </div>
                                <div className='col-md-3 mb-3'>
                                    <label className='form-label'> Author </label>
                                    <input type="text" className='form-control' name='author' required
                                        onChange={e => setAuthor(e.target.value)} value={author} />
                                </div>
                                <div className='col-md-3 mb-3'>
                                    <label className='form-label'>Category</label>
                                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {category}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li onClick={() => categoryField(0,'Select')}>
                                <a className='dropdown-item'>
                                    Select
                                </a>
                            </li>
                            {categories.map(category => (
                                <li key={category.id} onClick={() => categoryField(category.id,category.name)}>
                                    <a className='dropdown-item'>
                                        {category.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                                </div>
                            </div>
                            <div className='col-md-12 mb-3'>
                                <label className='form-label'>Description</label>
                                <textarea className='form-control' id='exampleFormControlTextarea1' rows={3}
                                    onChange={e => setDescription(e.target.value)} value={description}></textarea>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Copies</label>
                                <input type='number' className='form-control' name='Copies' required
                                    onChange={e => setCopies(Number(e.target.value))} value={copies} />
                            </div>
                            <input type='file' ref={fileInputRef} onChange={e => base64ConversionForImages(e)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container">
            <BooksTable categories={categories} bookAdded={bookAdded}/>
        </div>
        </>
    );
}