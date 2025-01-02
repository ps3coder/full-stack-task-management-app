import React from 'react';
import '../../styles/MenuPage.css';

const MenuPage = ({ error, menuItems, handleQuantityChange, addToCart, quantities }) => {
    return (
        <div className="menu-page">
            <h2 className="menu-page__title">Menu</h2>
            {error && <p className="menu-page__error">{error}</p>}
            <div className="menu-page__grid">
                {menuItems.map((item) => (
                    <div key={item.id} className={`menu-page__item ${item.availability ? '' : 'menu-page__item--unavailable'}`}>
                        <h3 className="menu-page__item-title">{item.name}</h3>
                        <p className="menu-page__item-description">{item.description}</p>
                        <p className="menu-page__item-category">Category: {item.category}</p>
                        <p className="menu-page__item-price">Price: ${item.price.toFixed(2)}</p>
                        <p className="menu-page__item-availability">
                            Availability: {item.availability ? "Available" : "Unavailable"}
                        </p>
                        <input
                            type="number"
                            min="1"
                            defaultValue="1"
                            className="menu-page__quantity-input"
                            onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value, 10))
                            }
                        />
                        <button
                            className="menu-page__add-to-cart-btn"
                            onClick={() => addToCart(item, quantities[item.id] || 1)}
                            disabled={!item.availability}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
