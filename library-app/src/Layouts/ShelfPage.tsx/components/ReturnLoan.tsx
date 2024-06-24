import { Link } from "react-router-dom";
import CheckoutModel from "../../../Models/CheckoutModel";
import { renewLoan, returnBook } from "../../../Service/CheckoutService";
import { useState } from "react";

export const ReturnLoan: React.FC<{loan: CheckoutModel, setManageLoan: any}> = (props) => {

  const[httpError,setHttpError] = useState(null);

  const startDate = new Date();
  const endDate = new Date(props.loan.returnDate);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysLeft = Math.round(timeDiff / (1000 * 60 * 60 * 24));

  const checkout = new Date(props.loan.checkoutDate);
  const renewTimeDiff = endDate.getTime() - checkout.getTime();
  const renewStatus = Math.round(renewTimeDiff/(1000 * 60 * 60 * 24));

  const handleReturn = () => {
    returnBook(props.loan.id).then((response: any) => {
      props.setManageLoan(true);
      setHttpError(null);
    }).catch((error: any) => {
      setHttpError(error.message);
    })
  }

  const handleRenew = () => {
    renewLoan(props.loan.id).then((response: any) => {
      props.setManageLoan(true);
      setHttpError(null);
    }).catch((error: any) => {
      setHttpError(error.message);
    });
  }


    return (
        <div className="card mb-3 d-flex shadow-lg">
  <div className="row g-0">
    <div className="col-md-2 pt-2 d-flex justify-content-center align-items-center">
      <img src={props.loan.book.img} className="img-fluid rounded-start" alt="..." height="250" width="180"/>
    </div>
    <div className="col-md-6 mt-3">
      <div className="card-body">
        <h5 className="card-title">{props.loan.book.title}</h5>
        <p className="card-text">~ By {props.loan.book.author}</p>
        <p className="card-text"><small className="text muted mb-2">Return Date : {props.loan.returnDate}</small></p>
      </div>
    </div>
    <div className="col-md-4 p-2">
      <div className="card d-flex">
        <div className="card-body text-center">
        <h5 className="card-title mb-3">Manage Loans :</h5>
        {
          daysLeft >= 0 ?
          <p className="card-text text-secondary"><small className="mb-2">Due in {daysLeft} days.</small></p>
          :
          <p className="card-text text-danger"><small className="mb-2">Overdue by {daysLeft} days.</small></p>
        } 
        <div className="row">
          <div className="col">
          <button type="button" className="btn btn-success mb-2" onClick={handleReturn}>Return Book</button>
          </div>
          <div className="col">
            { renewStatus <= 7 &&
          <button type="button" className="btn btn-warning" disabled={daysLeft == 0 ? false : true} onClick={handleRenew}>Renew Loan</button>
            }
          </div>
        </div>
        <hr/>
        <p className="card-text">Help other find their adventure by reviewing your loan.</p>
        <Link type="button" className="btn btn-outline-dark" to={`/checkout/${props.loan.book.id}`}>
    Leave a review
    </Link>
        </div>
      </div>
    </div>
  </div>
</div>
    );
}