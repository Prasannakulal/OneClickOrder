import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import poster1 from '../assets/poster1.png';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSelectItems = () => {
    navigate('/items'); // Navigate to the Items page
  };

  const handleDeliverItems = () => {
    navigate('/delivery-items'); // Navigate to the Delivery Items page
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OneClickOrder</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
            <form className="d-flex ms-auto" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-12">
            <img
              src={poster1}
              alt="Advertising Banner"
              style={{ width: '100%', height: 'auto', maxWidth: '1280px', maxHeight: '234px', borderRadius: '0px', objectFit: 'cover', cursor: 'default' }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src={banner1} className="card-img-top" alt="Banner 1" />
              <div className="card-body">
                <h5 className="card-title">Banner Title 1</h5>
                <p className="card-text">Order</p>
                <button className="btn btn-primary" onClick={handleSelectItems}>Select Items</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src={banner2} className="card-img-top" alt="Banner 2" />
              <div className="card-body">
                <h5 className="card-title">Banner Title 2</h5>
                <p className="card-text">Description for banner 2.</p>
                <button className="btn btn-primary" onClick={handleDeliverItems}>Deliver Items</button> {/* Updated to call handleDeliverItems */}
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src={banner3} className="card-img-top" alt="Banner 3" />
              <div className="card-body">
                <h5 className="card-title">Banner Title 3</h5>
                <p className="card-text">Description for banner 3.</p>
                <Link to="/learn-more-3" className="btn btn-primary">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
