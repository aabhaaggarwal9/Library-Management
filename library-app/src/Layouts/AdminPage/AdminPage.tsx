import { useEffect, useState } from "react";
import { BooksPage } from "./components/BooksPage";
import CategoryModel from "../../Models/CategoryModel";
import { fetchCategories } from "../../Service/CategoryService";
import { CategoryPage } from "./components/CategoryPage";

export const AdminPage = () => {
    

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
                            <BooksPage/>
                    </div>
                    <div className='tab-pane fade' id='nav-history' role='tabpanel'
                        aria-labelledby='nav-history-tab'>
                        <CategoryPage/>
                    </div>
                </div>
            </div>
        </div>
    );
}

