import { useEffect, useRef, useState } from "react";
import BookModel from "../../../Models/BookModel";
import CategoryModel from "../../../Models/CategoryModel";
import { fetchBookById, updateBook } from "../../../Service/BookService";
import { Navigate } from "react-router-dom";

export const UpdateBook: React.FC<{ bookId: number, categories: CategoryModel[], setBookUpdate: any, bookUpdate: boolean}> = (props) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('');
    const [categorySelected, setCategorySelected] = useState<CategoryModel | undefined>();
    const [img, setImg] = useState('');
    const [copiesAvailable, setCopiesAvailable] = useState(0);

    const [displayWarning, setDisplayWarning] = useState('');
    const [displaySuccess, setDisplaySuccess] = useState('');

    const modalRef = useRef<HTMLDivElement>(null);

    const fetchAndSetBookDetails = (bookId: number) => {
        fetchBookById(bookId).then((response: any) => {
            setTitle(response.title);
            setAuthor(response.author);
            setDescription(response.description);
            setCopies(response.copies);
            setCategory(response.category.name);
            setCategorySelected(response.category);
            setImg(response.img);
            setCopiesAvailable(response.copiesAvailable);
            setDisplayWarning('');
            setDisplaySuccess('');
        }).catch((error: any) => {
            setDisplayWarning(error.response.data);
            setDisplaySuccess('');
        });
    }

    useEffect(() => {
        fetchAndSetBookDetails(props.bookId);
    }, [props.bookId]);

    useEffect(() => {
        if (displaySuccess !== '') {
            const timeoutId = setTimeout(() => {
                if (modalRef.current) {
                    const modalElement = modalRef.current;
                    const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modalElement);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                }
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [displaySuccess]);

    const categoryField = (id: number, name: string) => {
        if (id === 0 && name === 'Select') {
            setCategory(name);
            setCategorySelected(undefined);
        } else {
            setCategory(name);
            setCategorySelected({
                id: id,
                name: name
            });
        }
    }

    const resetFields = () => {
        fetchAndSetBookDetails(props.bookId);
    }

    const handleUpdate = () => {
        if (title !== '' && author !== '' && categorySelected !== null && categorySelected !== undefined && description !== '') {
            const updatedBook = {
                id: props.bookId,
                title: title,
                author: author,
                category: categorySelected,
                description: description,
                copies: copies,
                copiesAvailable: copiesAvailable,
                img: img
            }
            updateBook(updatedBook).then((response: any) => {
                setDisplayWarning('');
                setDisplaySuccess("Book Updated successfully");
                props.setBookUpdate(true);

                setTimeout(() => {
                    props.setBookUpdate(false);
                }, 2000);
            }).catch((error: any) => {
                setDisplayWarning(error.response.data);
                setDisplaySuccess('');
            })
        } else {
            setDisplayWarning("All fields must be filled");
        }
    }

    return (<>
        <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target={`#updateModal${props.bookId}`} onClick={() => fetchAndSetBookDetails(props.bookId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>
        </button>

        <div className="modal fade" id={`updateModal${props.bookId}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Book</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetFields}></button>
                    </div>
                    <div className="modal-body">
                        {displaySuccess !== '' &&
                            <div className='alert alert-success' role='alert'>
                                {displaySuccess}
                            </div>
                        }
                        {displayWarning !== '' &&
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
                                        <li onClick={() => categoryField(0, 'Select')}>
                                            <a className='dropdown-item'>
                                                Select
                                            </a>
                                        </li>
                                        {props.categories.map(category => (
                                            <li key={category.id} onClick={() => categoryField(category.id, category.name)}>
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
                        <div className="row">
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Copies</label>
                            <input type='number' className='form-control' name='Copies' required
                                onChange={e => setCopies(Number(e.target.value))} value={copies} />
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Copies Available</label>
                            <input type='number' className='form-control' name='CopiesAvailable' required
                                onChange={e => setCopiesAvailable(Number(e.target.value))} value={copiesAvailable} />
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetFields}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
