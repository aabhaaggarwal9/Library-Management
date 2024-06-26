import { useState, useEffect } from "react";
import CategoryModel from "../../../Models/CategoryModel";
import { addCategory, deleteCategory, fetchCategories, updateCategory } from "../../../Service/CategoryService";
import { error } from "console";

export const CategoryPage = () => {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [httpError, setHttpError] = useState(null);
    const [addedCategory, setAddedCategory] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState('');
    const [displayWarning, setDisplayWarning] = useState('');
    const [displayUpdateSuccess, setDisplayUpdateSuccess] = useState('');
    const [displayUpdateWarning, setDisplayUpdateWarning] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState<CategoryModel| any>();
    const [isUpdateCategory, setIsUpdateCategory] = useState(false);
    const [categoryDeleted, setCategoryDeleted] = useState(false);

    useEffect(() => {
        setIsUpdateCategory(false);
        setCategoryDeleted(false);
        setAddedCategory(false);
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
        }).catch((error: any) => {
            setHttpError(error.response.data);
        })
    }, [addedCategory, isUpdateCategory, categoryDeleted]);

    const handleAdd = () => {
        if (categoryName !== '') {
            addCategory(categoryName).then((response: any) => {
                setAddedCategory(true);
                setDisplaySuccess('Category Added successfully !');
                setDisplayWarning('');
                setCategoryName('');
            }).catch((error: any) => {
                setDisplayWarning(error.response.data);
                setDisplaySuccess('');
            })
        }
    }

    const resetFields = () => {
        setDisplaySuccess('');
        setDisplayWarning('');
        setAddedCategory(false);
        setCategoryName('');
    }
    const handleClose = () => {
        resetFields();
    }

    const handleUpdate = () => {
        if(updatedCategory !== null){
        updateCategory(updatedCategory).then((response: any) => {
            setIsUpdateCategory(true);
            setUpdatedCategory(null);
            setDisplayUpdateSuccess('Category Updated Successfully !');
            setDisplayUpdateWarning('');
        }).catch((error:any)=>{
            setDisplayUpdateWarning(error.response.data);
            setDisplaySuccess('');
            setIsUpdateCategory(false);
        })
        }
    }

    const handleUpdateClose = () => {
            setIsUpdateCategory(false);
            setUpdatedCategory(null);
            setDisplayUpdateSuccess('');
            setDisplayUpdateWarning('');
    }

    const handleDelete = (categoryId: number) => {
        deleteCategory(categoryId).then((response: any)=> {
            setDisplayUpdateSuccess(response);
            setDisplayUpdateWarning('');
            setCategoryDeleted(true);
        }).catch((error: any) => {
            setDisplayUpdateSuccess('');
            setDisplayUpdateWarning(error.response.data);
            setCategoryDeleted(false);
        })
    }
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }
    return (
        <>
            <div className="mt-3 mb-3">
                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    + Add Category
                </button>

                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                {
                                    displaySuccess !== '' &&
                                    <div className="alert alert-success" role="alert">
                                        {displaySuccess}
                                    </div>
                                }
                                {
                                    displayWarning !== '' &&
                                    <div className="alert alert-danger" role="alert">
                                        {displayWarning}
                                    </div>

                                }

                            </div>
                            <div className="modal-body">
                                <label htmlFor="name" className="form-label">Category Name</label>
                                <input type="text" id="name" className="form-control" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                displayUpdateSuccess !== '' &&
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {displayUpdateSuccess}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setDisplayUpdateSuccess('')}></button>
                </div>
            }
            {displayUpdateWarning !== '' &&
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                {displayUpdateWarning}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>setDisplayUpdateWarning('')}></button>
            </div>
            }

            {
                categories.length > 0 &&
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {
                        categories.map(category => (
                            updatedCategory?.id !== category.id ?
                                (
                                    <tr key={category.id}>
                                        <td>{category.name}</td>
                                        <td>
                                            <button type="button" className="btn btn-outline-dark" onClick={() => setUpdatedCategory(category)}>
                                                <svg key={category.id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-outline-dark" onClick={()=>handleDelete(category.id)}>
                                                <svg key={category.id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ) :

                                (
                                    <tr key={category.id}>
                                        <td>
                                            <input
                                                type="text"
                                                value={updatedCategory.name}
                                                onChange={(e) => setUpdatedCategory({ ...updatedCategory, name: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-outline-dark" onClick={handleUpdate}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                            </svg>
                                            </button>
                                        </td>
                                        <td>
                                        <button type="button" className="btn btn-outline-dark" onClick={handleUpdateClose}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>
                                            </button>
                                        </td>
                                    </tr>
                                )))
                    }
                </tbody>
            </table>
}
        </>
    );
}