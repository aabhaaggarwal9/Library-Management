import { useState, useEffect } from "react";
import BookModel from "../../../Models/BookModel";
import { isUserLoggedIn } from "../../../Service/AuthService";
import { addCheckout, getLoanCount, isBookCheckout } from "../../../Service/CheckoutService";
import { useAuth } from "../../Utils/AuthContext";
import { Link } from "react-router-dom";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { StarsReview } from "../../Utils/StarsReview";
import { addReview, reviewBookByUser } from "../../../Service/ReviewService";
import { error } from "console";

export const CheckoutAndReview: React.FC<{ book: BookModel | undefined, bookCheckout: boolean, setBookCheckout: any, reviewPosted: boolean, setReviewPosted: any }> = (props) => {
  const [loanCount, setLoanCount] = useState(0);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  const [rating, setRating] = useState("Leave a review");
  const [reviewDescription, setReviewDescription] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      getLoanCount().then((response: any) => {
        setLoanCount(response);
        setIsLoading(false);
        setHttpError(null);
      }).catch((error: any) => {
        setHttpError(error.message);
        setIsLoading(false);
      });

      isBookCheckout(props.book?.id).then((response: any) => {
        props.setBookCheckout(response);
        setHttpError(null);
        setIsLoading(false);
      }).catch((error: any) => {
        setHttpError(error.message);
        setIsLoading(false);
      });
    }
    else{
      setIsLoading(false);
    }
  }, [props.bookCheckout, isLoggedIn]);

  useEffect(()=>{
    if(isLoggedIn){
    reviewBookByUser(props.book?.id).then((response: any) => {
      props.setReviewPosted(response);
      setHttpError(null);
      setIsLoading(false);
    }).catch((error: any) => {
      setHttpError(error.message);
      setIsLoading(false);
    })
  }
  else{
    setIsLoading(false);
  }
  },[props.reviewPosted, props.bookCheckout, isLoggedIn]);

  const handleReview = () => {

    const reviewPayload = {
      bookId: props.book?.id,
      rating: rating,
      reviewDescription: reviewDescription === '' ? null : reviewDescription
    }
    addReview(reviewPayload).then((response: any) => {
      props.setReviewPosted(true);
      setHttpError(null);
      setIsLoading(false);
    }).catch((error: any) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }

  const handleCheckout = () => {
    addCheckout(props.book?.id).then((response: any) => {
      setHttpError(null);
      setIsLoading(false);
      props.setBookCheckout(true);
    }).catch((error: any) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }

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

  return (
    <div className="card m-2 d-flex w-100">
      <div className="card-body">
        {
          isLoggedIn &&
          <div>
            <p className="card-text mb-2"><b>{loanCount}/5</b> Books checked out</p>
            <hr />
          </div>
        }
        {
          props.book?.copiesAvailable !==0 ?
          <h3 className="card-title mb-2 text-success">Available</h3>
          :
          <h3 className="card-title mb-2 text-danger">Wait List</h3>
        }
        
        <div className="row">
          <div className="col">
            <p className="lead"><b>{props.book?.copies}</b> Copies</p>
          </div>
          <div className="col">
            <p className="lead"><b>{props.book?.copiesAvailable}</b> Available</p>
          </div>

        </div>
        {isLoggedIn ?
          (
            props.bookCheckout ? (
              <p className="fw-bold">Book checked out! Enjoy</p>

            ) : (
              <button type="button" className="btn btn-success" onClick={handleCheckout} disabled={loanCount >= 5 ? true : false}>
                Checkout
              </button>
            )
          )
          :
          (
            <Link type="button" className="btn btn-success" to={"/login"}>
              Sign in
            </Link>
          )
        }
        <hr />
        {
          !props.bookCheckout &&
        <p className="mb-3">This number can change until placing order has been complete</p>
        }
        {/* <p className="mb-3">This number can change until placing order has been complete</p> */}
        {
          isLoggedIn ?
            (
              props.reviewPosted ?
                (
                  <p className="fw-bold">Thank you for your review!</p>
                ) :
                (
                  <div>
                    <select className="form-select mb-3 w-50" aria-label="Default select example" value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option selected>Leave a review</option>
                      <option value="0.5">0.5</option>
                      <option value="1">1</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2</option>
                      <option value="2.5">2.5</option>
                      <option value="3">3</option>
                      <option value="3.5">3.5</option>
                      <option value="4">4</option>
                      <option value="4.5">4.5</option>
                      <option value="5">5</option>
                    </select>
                    <StarsReview rating={rating === 'Leave a review' ? 0 : Number(rating)} size={32} />
                    <div className="mt-3" hidden={rating === 'Leave a review' ? true : false}>
                      <hr/>
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder="Optional" value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)}></textarea>
                      </div>
                      <button type="button" className="btn btn-primary" onClick={handleReview}>Submit Review</button>
                    </div>
                  </div>
                 
          )) :
            (
              <p>Sign in to be able to leave a review</p>
            )
        }
      </div>
    </div>
  );
}