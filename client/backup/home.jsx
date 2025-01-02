import axios from "axios";
import React, { useEffect, useState } from "react";

const homepage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const apiUrl = "http://localhost:3000/api/menu";
    const orderUrl = "http://localhost:3000/api/order";
    const userApiUrl = "http://localhost:3000/api/user/me";

    useEffect(() => {
        fetchMenuItems();
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) fetchOrders();
    }, [userId]);

    const fetchMenuItems = async () => {
        try {
            const res = await axios.get(apiUrl);
            // console.log(res.data)
            setMenuItems(res.data);
        } catch (err) {
            console.error("Error fetching menu items:", err);
            setError("Failed to load menu items. Please try again.");
        }
    };

    const fetchUserId = async () => {
        try {
            const res = await axios.get(userApiUrl, { withCredentials: true });
            // console.log(res.data.id)
            setUserId(res.data.id);
        } catch (err) {
            console.error("Error fetching user ID:", err);
            setError("Failed to fetch user ID. Please log in.");
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(orderUrl, { withCredentials: true });
            const userOrders = res.data.filter((order) => order.userId === userId);
            // console.log(userOrders)
            setOrders(userOrders);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to fetch orders. Please try again.");
        }
    };

    const handleCheckout = async () => {
        const totalAmount = cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const orderData = {
            userId,
            items: cart.map(({ productId, quantity, price }) => ({
                productId,
                quantity,
                price,
            })),
            totalAmount,
        };

        try {
            setIsLoading(true);
            setError("");
            await axios.post(orderUrl, orderData, { withCredentials: true });
            alert("Order placed successfully!");
            setCart([]);
            fetchOrders();
        } catch (err) {
            console.error("Order placement error:", err);
            setError("Failed to place the order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const addToCart = (item, quantity) => {
        if (!quantity || quantity <= 0) {
            setError("Invalid quantity. Please enter a positive number.");
            return;
        }

        const existingItem = cart.find((cartItem) => cartItem.productId === item.id);

        if (existingItem) {
            setCart((prevCart) =>
                prevCart.map((cartItem) =>
                    cartItem.productId === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                )
            );
        } else {
            setCart((prevCart) => [
                ...prevCart,
                {
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity,
                },
            ]);
        }
    };

    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div className="menu-page">
            <h2>Menu</h2>
            {error && <p className="error">{error}</p>}
            <div className="menu-grid">
                {menuItems.map((item) => (
                    <div key={item.id} className="menu-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Category: {item.category}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <p>Availability: {item.availability ? "Available" : "Unavailable"}</p>
                        <input
                            type="number"
                            min="1"
                            defaultValue="1"
                            onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value, 10))
                            }
                        />
                        <button
                            onClick={() =>
                                addToCart(item, quantities[item.id] || 1)
                            }
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart">
                <h2>Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cart.map((item) => (
                            <li key={item.productId}>
                                {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                )}
                {cart.length > 0 && (
                    <button onClick={handleCheckout} disabled={isLoading} aria-busy={isLoading}>
                        {isLoading ? "Placing Order..." : "Checkout"}
                    </button>
                )}
            </div>
            <div className="order-history">
                <h2>Order History</h2>
                {orders.length === 0 ? (
                    <p>No orders placed yet.</p>
                ) : (
                    <ul>
                        {orders.map((order) => (
                            <li key={order.id}>
                                <p>Order ID: {order.id}</p>
                                <p>Status: {order.status}</p>
                                <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                                <ul>
                                    {order.items.map((item) => (
                                        <li key={item.productId}>
                                            Product ID: {item.productId}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default homepage;
