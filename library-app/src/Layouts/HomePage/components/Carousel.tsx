import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookModel from "../../../Models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ReturnBook } from "./../components/ReturnBook";
import { fetchBooksForCarousel } from "../../../Service/BookService";

export const Carousel= () => {

    const[books, setBooks] = useState<BookModel[]>([]);
    const[isLoading, setIsLoading] = useState(true);
    const[httpError, setHttpError] = useState(null);

    useEffect(() =>{
        
        fetchBooksForCarousel().then((response : any) =>{
        const loadedBooks: BookModel[] = [];
        for(let key in response){
        loadedBooks.push({
            id: response[key].id,
            title: response[key].title,
            description: response[key].description,
            author: response[key].author,
            copies: response[key].copies,
            copiesAvailable: response[key].copiesAvailable,
            category: response[key].category,
            img: response[key].img
        })
    } 
    setBooks(loadedBooks);
    setIsLoading(false);
        }).catch((error: any) =>{
            setIsLoading(false);
            setHttpError(error.message);
        })

    },[]);

    if(isLoading){
        return(
          <SpinnerLoading/>
        )
    }

    if(httpError){
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }
    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='text-center'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                          {books.slice(0,3).map(book =>(
                            <ReturnBook book={book} key={book.id}/>
                          ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                        {books.slice(3,6).map(book =>(
                            <ReturnBook book={book} key={book.id}/>
                          ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                        {books.slice(6,9).map(book =>(
                            <ReturnBook book={book} key={book.id}/>
                          ))}
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
            <ReturnBook book={books[7]} key={books[7].id}/>
            </div>
            <div className='d-flex justify-content-center align-items-center mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>
        </div>
    );
}