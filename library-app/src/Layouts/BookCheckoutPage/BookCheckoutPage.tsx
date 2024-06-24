import { useEffect, useState } from "react";
import BookModel from "../../Models/BookModel";
import ReviewModel from "../../Models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReview } from "./components/CheckoutAndReview";
import { LatestReviews } from "./components/LatestReviews";
import { fetchBookById } from "../../Service/BookService";
import { fetchReviewsByBook } from "../../Service/ReviewService";
import { isBookCheckout } from "../../Service/CheckoutService";

export const BookCheckoutPage = () => {
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //ReviewState
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);
    const [bookCheckout, setBookCheckout] = useState(false);
    const [reviewPosted, setReviewPosted] = useState(false);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        fetchBookById(Number(bookId)).then((response: any) => {
            const loadedBook: BookModel = {
                id: response.id,
                title: response.title,
                description: response.description,
                author: response.author,
                copies: response.copies,
                copiesAvailable: response.copiesAvailable,
                category: response.category,
                img: response.img
            };
            setBook(loadedBook);
            setIsLoading(false);
        }).catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

    }, [bookCheckout]);

    useEffect(() => {
        fetchReviewsByBook(Number(bookId)).then((response: any) => {
            const loadedReviews: ReviewModel[] = [];
            let weightedStarReviews: number = 0;
            for (const key in response) {
                loadedReviews.push({
                    id: response[key].id,
                    username: response[key].username,
                    date: response[key].date,
                    rating: response[key].rating,
                    bookId: response[key].bookId,
                    reviewDescription: response[key].reviewDescription
                });
                weightedStarReviews = weightedStarReviews + response[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        }).catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })

    }, [reviewPosted]);

    if (isLoading || isLoadingReview) {
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

    return (
        <div className="container mt-5">
            <div className="row gap-2">
                <div className="col-md-2 pb-3 d-flex justify-content-center align-items-center">
                    {
                        book?.img ?
                            <img
                                src={book?.img}
                                width='151'
                                height='233'
                                alt="book"
                            />
                            :
                            <img
                                src={require("./../../Images/BookImages/new-book-1.png")}
                                width='151'
                                height='233'
                                alt="book"
                            />
                    }
                </div>
                <div className="col-lg-5 col-md m-auto">
                    <h5>{book?.title}</h5>
                    <h6 className="mb-2 text-muted">{book?.author}</h6>
                    <p>{book?.description}</p>
                    <StarsReview rating={totalStars} size={32} />
                </div>
                <div className="col-lg-4 col-md-4 col-sm d-flex">
                    <CheckoutAndReview book={book} setBookCheckout={setBookCheckout} bookCheckout={bookCheckout} reviewPosted={reviewPosted} setReviewPosted={setReviewPosted}/>
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} />
            </div>
        </div>);
}