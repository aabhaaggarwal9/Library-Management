import BookModel from "./BookModel";

class CheckoutModel {
    id: number;
    username: string;
    checkoutDate: string;
    returnDate: string;
    book: BookModel;

    constructor( id: number, username: string, checkoutDate: string, returnDate: string, book: BookModel){
        this.id = id;
        this.username = username;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.book = book;
    }
}

export default CheckoutModel;