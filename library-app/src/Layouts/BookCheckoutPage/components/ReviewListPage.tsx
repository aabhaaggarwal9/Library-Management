import { useEffect, useState } from 'react';
import { Pagination } from '../../Utils/Pagination';
import { Review } from '../../Utils/Review';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import ReviewModel from '../../../Models/ReviewModel';
import { fetchReviewsByBookWithPagination } from '../../../Service/ReviewService';

export const ReviewListPage = () => {

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Book to lookup reviews
    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        fetchReviewsByBookWithPagination(Number(bookId), currentPage - 1, reviewsPerPage).then((response: any) => {
            console.log(response,"this is response");
            setTotalAmountOfReviews(response.totalElements);
            setTotalPages(response.totalPages);

            const loadedReviews: ReviewModel[] = [];

            for (const key in response.content) {
                loadedReviews.push({
                    id: response.content[key].id,
                    username: response.content[key].username,
                    date: response.content[key].date,
                    rating: response.content[key].rating,
                    bookId: response.content[key].bookId,
                    reviewDescription: response.content[key].reviewDescription,
                });
            }

            setReviews(loadedReviews);
            setIsLoading(false);
        }).catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message); 
        });
    }, [currentPage]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }


    const indexOfLastReview: number = currentPage * reviewsPerPage;
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

    let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ? 
            reviewsPerPage * currentPage : totalAmountOfReviews;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <div className="container mt-5">
            <div>
                <h3>Comments: ({reviews.length})</h3>
            </div>
            <p>
                {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items:
            </p>
            <div className="row">
                {reviews.map(review => (
                    <Review review={review} key={review.id} />
                ))}
            </div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );
}