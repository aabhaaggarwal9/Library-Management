import React, { useEffect, useState } from 'react';
import BookModel from '../../../Models/BookModel';
import { Link} from 'react-router-dom';
import { isUserLoggedIn } from '../../../Service/AuthService';
import { useAuth } from '../../Utils/AuthContext';

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {

    const {isLoggedIn} = useAuth();

    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {
                    props.book.img ?
                        <img
                            src={props.book.img}
                            width='151'
                            height='233'
                            alt="book"
                        />
                        :
                        <img
                            src={require("./../../../Images/BookImages/new-book-1.png")}
                            width='151'
                            height='233'
                            alt="book"
                        />
                }
                <h6 className='mt-2'>{props.book.title}</h6>
                <p>{props.book.author}</p>
                {
                    isLoggedIn ?
                        <Link className='btn btn-primary' to={`/checkout/${props.book.id}`}>Reserve</Link>
                        :
                        <Link className='btn btn-primary' to={`/login`}>Reserve</Link>
                }
            </div>
        </div>
    );
}