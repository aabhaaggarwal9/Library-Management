import CategoryModel from "./CategoryModel";

class BookModel {
    id: number;
    title: string;
    author? : string;
    description?: string;
    copies: number;
    copiesAvailable: number;
    category?: CategoryModel;
    img?: string;

    constructor(id: number, title: string, author: string, description: string, copies: number, copiesAvailable: number, category: CategoryModel, img: string){
        this.id = id;
        this.author = author;
        this.category = category;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.description = description;
        this.img = img;
        this.title = title;
    }     
}

export default BookModel;