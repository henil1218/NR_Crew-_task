import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

type ShippingForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'card' | 'upi' | 'cod';
};

type PaymentForm = {
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
};

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState<ShippingForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });
  const [paymentData, setPaymentData] = useState<PaymentForm>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zipCode) {
      alert('Please fill in all required fields');
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();
    if (formData.paymentMethod === 'card') {
      if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
        alert('Please fill in all payment details');
        return;
      }
    }
    if (formData.paymentMethod === 'upi') {
      if (!paymentData.upiId) {
        alert('Please enter your UPI ID');
        return;
      }
    }

    alert('Payment successful! Your order has been placed.');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <h2 className="mb-4">Your cart is empty</h2>
              <p className="text-muted mb-4">Add some products to your cart to checkout!</p>
              <button onClick={() => navigate('/')} className="btn btn-primary btn-lg">
                Continue Shopping
              </button>
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
          <h1 className="display-4">Checkout</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          {!showPayment ? (
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">Shipping Information</h5>
                <form onSubmit={handleProceedToPayment}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="paymentMethod" className="form-label">
                        Payment Method *
                      </label>
                      <select
                        className="form-select"
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="card">Credit/Debit Card</option>
                        <option value="upi">UPI</option>
                        <option value="cod">Cash on Delivery</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address *
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label">
                        City *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="zipCode" className="form-label">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/cart')}>
                      Back to Cart
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">Payment Details</h5>
                <form onSubmit={handlePayment}>
                  {formData.paymentMethod === 'card' && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={handlePaymentInputChange}
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cardName" className="form-label">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardName"
                          name="cardName"
                          value={paymentData.cardName}
                          onChange={handlePaymentInputChange}
                          required
                        />
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="expiryDate" className="form-label">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={paymentData.expiryDate}
                            onChange={handlePaymentInputChange}
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="cvv" className="form-label">
                            CVV *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={paymentData.cvv}
                            onChange={handlePaymentInputChange}
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {formData.paymentMethod === 'upi' && (
                    <div className="mb-3">
                      <label htmlFor="upiId" className="form-label">
                        UPI ID *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="upiId"
                        name="upiId"
                        placeholder="yourname@upi"
                        value={paymentData.upiId}
                        onChange={handlePaymentInputChange}
                        required
                      />
                    </div>
                  )}
                  {formData.paymentMethod === 'cod' && (
                    <div className="alert alert-info">
                      <strong>Cash on Delivery:</strong> You will pay when the order is delivered.
                    </div>
                  )}
                  <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPayment(false)}>
                      Back
                    </button>
                    <button type="submit" className="btn btn-success btn-lg">
                      Complete Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="mb-3">
                {items.map(item => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <div>
                      <small>
                        {item.name} x {item.quantity}
                      </small>
                    </div>
                    <small>₹{(item.price * item.quantity).toFixed(2)}</small>
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

