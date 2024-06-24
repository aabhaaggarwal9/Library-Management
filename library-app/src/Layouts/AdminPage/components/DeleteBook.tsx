import { useState } from "react";
import { deleteBook } from "../../../Service/BookService";

export const DeleteBook: React.FC<{ bookId: number, setBookDelete: any }> = (props) => {
  const [displayWarning, setDisplayWarning] = useState('');
  const [displaySuccess, setDisplaySuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteBook(props.bookId)
      .then((response: any) => {
        setDisplayWarning('');
        setDisplaySuccess(response);
        props.setBookDelete(true);
        setShowModal(false); // Close modal on success
      })
      .catch((error: any) => {
        setDisplayWarning(error.response.data);
        setDisplaySuccess('');
      });
  };

  const handleClose = () => {
    setDisplayWarning('');
    setDisplaySuccess('');
    setShowModal(false); // Close modal on close button click
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <button type="button" className="btn btn-outline-dark" onClick={openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
        </svg>
      </button>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm Deletion</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                {displaySuccess !== '' &&
                  <div className='alert alert-success' role='alert'>
                    {displaySuccess}
                  </div>
                }
                {displayWarning !== '' &&
                  <div className='alert alert-danger' role='alert'>
                    {displayWarning}
                  </div>
                }
                <p>Are you sure you want to delete this book?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

