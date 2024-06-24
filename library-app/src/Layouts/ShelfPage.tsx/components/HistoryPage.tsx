import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import HistoryModel from '../../../Models/HistoryModel';
import { getHistoryByUsername } from '../../../Service/HistoryService';
import { Pagination } from '../../Utils/Pagination';

export const HistoryPage: React.FC<{manageLoan: boolean}> = (props) => {
    
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Histories
    const [histories, setHistories] = useState<HistoryModel[]>([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getHistoryByUsername(currentPage).then((response: any) => {
            console.log(response);
            setHistories(response.content);
            setTotalPages(response.totalPages);
            setIsLoadingHistory(false);
        }).catch((error: any) => {
            setHttpError(error.message);
            setIsLoadingHistory(false);
        })
    },[currentPage, props.manageLoan]);

    if (isLoadingHistory) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    return(
        <div className='mt-2'>
            {histories.length > 0 ? 
            <>
                <h5>Recent History:</h5>

                {histories.map(history => (
                    <div key={history.id}>
                        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
                            <div className='row g-0'>
                                <div className='col-md-2'>
                                    <div className='d-none d-lg-block'> 
                                            <img src={history.book.img} width='123' height='196' alt='Book' />
                                    </div>
                                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                                    <img src={history.book.img} width='123' height='196' alt='Book' />
                                    </div>
                                </div>
                                <div className='col'>
                                        <div className='card-body'>
                                            <h5 className='card-title'> {history.book.author} </h5>
                                            <h4>{history.book.title}</h4>
                                            <p className='card-text'>{history.book.description}</p>
                                            <hr/>
                                            <p className='card-text'> Checked out on: {history.checkoutDate}</p>
                                            <p className='card-text'> Returned on: {history.returnedDate}</p>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                ))}
            </>
            :
            <>
                <h3 className='mt-3'>Currently no history: </h3>
                <Link className='btn btn-primary' to={'/search'}>
                    Search for new book
                </Link>
            </>
        }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}