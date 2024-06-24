import { useState, useEffect } from "react";
import BookModel from "../../Models/BookModel";
import { Pagination } from "../Utils/Pagination";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { fetchBooksForSearch } from "../../Service/BookService";
import CategoryModel from "../../Models/CategoryModel";
import { fetchCategories } from "../../Service/CategoryService";

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Select Category');
    const [categories, setCategories] = useState<CategoryModel[]>([])

    const booksPerPage = 5;

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

    useEffect(() => {
        fetchBooksForSearch(searchUrl, currentPage, booksPerPage).then((response: any) => {
            setTotalAmountOfBooks(response.totalElements);
            setTotalPages(response.totalPages);

            const loadedBooks: BookModel[] = [];
            for (let key in response.content) {
                loadedBooks.push({
                    id: response.content[key].id,
                    title: response.content[key].title,
                    description: response.content[key].description,
                    author: response.content[key].author,
                    copies: response.content[key].copies,
                    copiesAvailable: response.content[key].copiesAvailable,
                    category: response.content[key].category,
                    img: response.content[key].img
                })
            }
            setBooks(loadedBooks);
            setIsLoading(false);
        }).catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const categoryField = (id: number, name: string) => {
        setCurrentPage(1);
        if (id!== 0 && name!== 'Select Category') {
            setCategorySelection(name);
            setSearchUrl(`/search/findByCategory?categoryId=${id}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setCategorySelection(name);
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
    }


    const handleSearch = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        }
        else {
            setSearchUrl(`/search/findByTitle?title=${search}&page=<pageNumber>&size=${booksPerPage}`);
            setCategorySelection('Select Category');
        }
    }

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6">
                    <div className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            onChange={e => setSearch(e.target.value)} />
                        <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="col-4">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {categorySelection}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li onClick={() => categoryField(0,'Select Category')}>
                                <a className='dropdown-item'>
                                    Select Category
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
            {
                totalAmountOfBooks > 0 ?
                    <>
                        <div className="mt-3">
                            <h5>Number of results: ({totalAmountOfBooks})</h5>
                        </div>
                        <p>{indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:</p>
                        {books.map(book => (
                            <SearchBook book={book} key={book.id} />
                        ))}
                    </>
                    :
                    <div className='m-5'>
                        <h3>
                            Can't find what you are looking for?
                        </h3>
                        <a type='button' className='btn btn-primary btn-md px-4 me-md-2 fw-bold'>Library Services</a>
                    </div>
            }

            {totalPages > 1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
        </div>
    )
}