import React from "react";
import { useEffect, useState } from "react";
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { Pagination } from '../../Utils/Pagination';
import BookModel from "../../../Models/BookModel";
import { fetchBooksForSearch } from "../../../Service/BookService";
import { UpdateBook } from "./UpdateBook";
import { DeleteBook } from "./DeleteBook";
import CategoryModel from "../../../Models/CategoryModel";

export const BooksTable: React.FC<{categories: CategoryModel[], bookAdded: boolean}> = (props) => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [bookDelete, setBookDelete] = useState(false);
    const [bookUpdate, setBookUpdate] = useState(false);

    useEffect(() => {
        fetchBooksForSearch("", currentPage, booksPerPage).then((response: any) => {
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
    }, [currentPage, bookDelete ,props.bookAdded, bookUpdate]);

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ?
        booksPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className='container border mt-4'>
            {totalAmountOfBooks > 0 ?
                <>
                    <table className="mt-3 table table-striped table-bordered">
                        <thead>
                            <tr className="table-dark">
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Copies</th>
                                <th>Copies Available</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.category?.name}</td>
                                        <td>{book.copies}</td>
                                        <td>{book.copiesAvailable}</td>
                                        <td><UpdateBook bookId={book.id} categories={props.categories} setBookUpdate={setBookUpdate} bookUpdate={bookUpdate} key={book.id}/></td>
                                        <td><DeleteBook bookId={book.id} setBookDelete={setBookDelete}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>
                :
                <h5>Add a book before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}