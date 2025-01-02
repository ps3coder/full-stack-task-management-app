import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderPage from "../../pages/Order/OrderPage";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");

    const orderUrl = "http://localhost:3000/api/order";
    const userApiUrl = "http://localhost:3000/api/user/me";

    useEffect(() => {
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) fetchOrders();
    }, [userId]);

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
    const handleDelete = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;

        try {
            await axios.delete(`${orderUrl}/${orderId}`, { withCredentials: true });
            alert("Order deleted successfully!");
            fetchOrders();
        } catch (err) {
            console.error("Error deleting order:", err);
            setError("Failed to delete the order. Please try again.");
        }
    };

    return (
        <div>
            <OrderPage
                orders={orders}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default Order;
