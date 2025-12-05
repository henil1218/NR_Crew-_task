import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: string) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    } else {
      removeFromCart(productId);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <h2 className="mb-4">Your cart is empty</h2>
              <p className="text-muted mb-4">Add some products to your cart to get started!</p>
              <Link to="/" className="btn btn-primary btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-4">Shopping Cart</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              {items.map(item => (
                <div key={item.id} className="row align-items-center mb-4 pb-4 border-bottom">
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted small mb-0">{item.description}</p>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label small">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 text-center">
                    <label className="form-label small">Price</label>
                    <p className="mb-0 fw-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <small className="text-muted">₹{item.price.toFixed(2)} each</small>
                  </div>
                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-3 d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/checkout')}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="text-primary">₹{getTotalPrice().toFixed(2)}</strong>
              </div>
              <button className="btn btn-primary w-100 btn-lg mb-2" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
              <Link to="/" className="btn btn-outline-secondary w-100">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

