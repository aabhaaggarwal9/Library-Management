import { useEffect, useState } from "react";
import { BooksPage } from "./components/BooksPage";
import CategoryModel from "../../Models/CategoryModel";
import { fetchCategories } from "../../Service/CategoryService";

export const AdminPage = () => {
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
        }).catch((error: any)=> {
            setHttpError(error.message);
        })
    }, []);

    return(
        <div className='container'>
            <div className='mt-3'>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button className='nav-link active' id='nav-loans-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-loans' type='button' role='tab' aria-controls='nav-loans'
                            aria-selected='true'>
                                Books
                        </button>
                        <button className='nav-link' id='nav-history-tab' data-bs-toggle='tab' 
                            data-bs-target='#nav-history' type='button' role='tab' aria-controls='nav-history'
                            aria-selected='false'>
                                Category
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-loans' role='tabpanel'
                        aria-labelledby='nav-loans-tab'>
                            <BooksPage categories={categories}/>
                    </div>
                    <div className='tab-pane fade' id='nav-history' role='tabpanel'
                        aria-labelledby='nav-history-tab'>
                        category
                    </div>
                </div>
            </div>
        </div>
    );
}

