import BookModel from "./BookModel";

class ReviewModel {
    id: number;
    username: string;
    date: string;
    rating: number;
    bookId: BookModel;
    reviewDescription: string;

    constructor( id: number, username: string, date: string, rating: number, bookId: BookModel, reviewDescription: string){
        this.id = id;
        this.username = username;
        this.date = date;
        this.rating = rating;
        this.bookId = bookId;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewModel;