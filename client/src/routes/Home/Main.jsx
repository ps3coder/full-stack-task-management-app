import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import MenuPage from "../../pages/MenuItem/MenuPage";
import CartPage from "../../pages/Cart/CartPage";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Main.css";

const Main = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { clearUser } = useContext(AuthContext);
    const navigate = useNavigate();

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
            setMenuItems(res.data);
        } catch (err) {
            console.error("Error fetching menu items:", err);
            setError("Failed to load menu items. Please try again.");
        }
    };

    const fetchUserId = async () => {
        try {
            const res = await axios.get(userApiUrl, { withCredentials: true });
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
            setOrders(userOrders);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to fetch orders. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/auth/logout",
                {},
                { withCredentials: true }
            );
            clearUser();
            navigate("/login");
        } catch (err) {
            console.error("Logout error:", err);
            setError("Failed to logout. Please try again.");
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
        <div className="main">
            <p className="order">
                Get Order Details <Link to="/order" className="order-link">Order Details</Link>.
            </p>
            <p className="logout">
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </p>
            <CartPage
                cart={cart}
                handleCheckout={handleCheckout}
                isLoading={isLoading}
            />
            <MenuPage
                error={error}
                menuItems={menuItems}
                cart={cart}
                addToCart={addToCart}
                quantities={quantities}
                isLoading={isLoading}
                handleCheckout={handleCheckout}
            />
        </div>
    );
};

export default Main;
