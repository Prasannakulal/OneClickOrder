import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DeliverItemsPage.css'; // Custom CSS file for additional styling

const DeliverItemsPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/orders?address=${encodeURIComponent(searchLocation)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OneClickOrder</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search Form */}
      <div className="search-container mt-4">
        <h1 className="mb-4">Enter Location</h1>
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="text"
            placeholder="Search by address"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="form-control me-2"
            required
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>

      {/* Results */}
      <div className="results-container mt-4">
        {results.length > 0 ? (
          results.map((order, index) => (
            <div key={index} className="card mb-3 order-card">
              <div className="card-body">
                <h5 className="card-title">{order.address}</h5>
                <p className="card-text"><strong>Name:</strong> {order.name}</p>
                <p className="card-text"><strong>Phone:</strong> {order.phone}</p>
                <h6 className="mt-3">Items:</h6>
                <ul className="list-unstyled">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="item">
                      <span>{item.name}</span> - <span>Quantity: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No results found for "{searchLocation}"</p>
        )}
      </div>
    </div>
  );
};

export default DeliverItemsPage;
