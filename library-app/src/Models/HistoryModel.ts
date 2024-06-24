import BookModel from "./BookModel";

class HistoryModel {
    id: number;
    username: string;
    checkoutDate: string;
    returnedDate: string;
    book: BookModel;

    constructor( id: number, username: string, checkoutDate: string, returnedDate: string, book: BookModel){
        this.id = id;
        this.username = username;
        this.checkoutDate = checkoutDate;
        this.returnedDate = returnedDate;
        this.book = book;
    }
}

export default HistoryModel;