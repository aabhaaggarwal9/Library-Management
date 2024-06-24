import { Link } from "react-router-dom";
import book from "./../../../Images/PublicImages/image-2.jpg";
export const ExploreTopBooks = () => {
    return (
        <div className="card bg-dark text-white">
  <img src={book} className="card-img" height={400} alt="..."/>
  <div className="card-img-overlay text-center mt-5">
    <h5 className="display-5 fw-bold">Find your next adventure</h5>
    <p className="fs-4">Where would you like to go next?</p>
    <Link type='button' className='btn btn-primary btn-lg text-white' to='/search'>
    Explore top books</Link>
  </div>
</div>
    );
}