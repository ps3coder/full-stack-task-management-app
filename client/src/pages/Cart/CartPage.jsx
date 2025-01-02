import React from 'react';
import '../../styles/CartPage.css';

const CartPage = ({ cart, handleCheckout, isLoading }) => {
    return (
        <div className="cart-page">
            <h2 className="cart-page__title">Cart</h2>
            {cart.length === 0 ? (
                <p className="cart-page__empty-message">Your cart is empty.</p>
            ) : (
                <ul className="cart-page__list">
                    {cart.map((item) => (
                        <li key={item.productId} className="cart-page__item">
                            <span className="cart-page__item-name">{item.name}</span>
                            <span className="cart-page__item-quantity">
                                {item.quantity}
                            </span>
                            <span className="cart-page__item-price">
                                ${item.price.toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && (
                <button
                    className={`cart-page__checkout-btn ${isLoading ? 'cart-page__checkout-btn--loading' : ''}`}
                    onClick={handleCheckout}
                    disabled={isLoading}
                    aria-busy={isLoading}
                >
                    {isLoading ? 'Placing Order...' : 'Checkout'}
                </button>
            )}
        </div>
    );
};

export default CartPage;
