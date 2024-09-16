// src/pages/ItemsPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './ItemsPage.css'; // Import a custom CSS file for additional styling

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [editIndex, setEditIndex] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      if (editIndex !== null) {
        setItems((prevItems) =>
          prevItems.map((item, index) =>
            index === editIndex ? { name: newItem, quantity } : item
          )
        );
        setEditIndex(null);
        setNewItem('');
        setQuantity(1);
      } else {
        setItems((prevItems) => [...prevItems, { name: newItem, quantity }]);
        setNewItem('');
        setQuantity(1);
      }
    }
  };

  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setNewItem(items[index].name);
    setQuantity(items[index].quantity);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const order = {
      name,
      address,
      phone,
      items,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Order submitted successfully');
        // Clear form and items
        setName('');
        setAddress('');
        setPhone('');
        setItems([]);
      } else {
        alert(data.message || 'Failed to submit order');
      }
    } catch (error) {
      alert('Server error');
    }
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
                <Link className="nav-link active" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Contact</Link>
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
        <h1 className="mb-4">Select Items</h1>
        <div className="mb-3 d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter new item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            style={{ maxWidth: '200px' }}
          />
          <input
            type="number"
            className="form-control me-2"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            style={{ maxWidth: '100px' }}
          />
          <button onClick={handleAddItem} className="btn btn-primary">
            {editIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
        </div>

        <div className="row mb-4">
          {items.map((item, index) => (
            <div className="col-md-12 mb-3" key={index}>
              <div className="card cart-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Quantity: {item.quantity}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditItem(index)}
                        className="btn btn-warning me-2"
                      >
                        Modify
                      </button>
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form className="order-form" onSubmit={handleSubmitOrder}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ maxWidth: '200px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ maxWidth: '200px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit Order</button>
        </form>
      </div>
    </div>
  );
};

export default ItemsPage;