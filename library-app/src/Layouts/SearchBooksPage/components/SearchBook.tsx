import { ReactHTMLElement } from "react"
import { Link } from "react-router-dom"
import BookModel from "../../../Models/BookModel"

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
    return (
        <div className="card mb-3 shadow-lg mt-3">
            <div className="row g-0">
                <div className="col-md-2 m-4">
                    {props.book.img ?
                        <img src={props.book.img} className="rounded-start" alt="..." height="250" width="160"/>
                        :
                        <img src={require("./../../../Images/BookImages/new-book-1.png")} className="img-fluid rounded-start" alt="..." />
                    }

                </div>
                <div className="col-md-6 mx-auto">
                    <div className="card-body">
                        <h5 className="card-title">{props.book.title}</h5>
                        <p className="card-text">{props.book.description}</p>
                        <p className="card-text"><small className="text-muted">~By {props.book.author}</small></p>
                    </div>
                </div>
                <div className="col-md-2 m-5 d-flex justify-content-center align-items-center">
                <Link className="btn btn-primary" to={`/checkout/${props.book.id}`} role="button">View Details</Link>
                </div>
            </div>
        </div>
    )
}