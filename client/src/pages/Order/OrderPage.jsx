import React, { useState } from "react";
import "../../styles/OrderPage.css";

const OrderPage = ({ orders, handleDelete, }) => {



    return (
        <div className="order-history">
            <h2 className="order-history__title">Order History</h2>
            {orders.length === 0 ? (
                <p className="order-history__empty">No orders placed yet.</p>
            ) : (
                <ul className="order-history__list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-history__item">
                            <p className="order-history__order-id">Order ID: {order.id}</p>
                            <p className="order-history__status">Status: {order.status}</p>
                            <p className="order-history__total">
                                Total Amount: ${order.totalAmount.toFixed(2)}
                            </p>
                            <ul className="order-history__items-list">
                                {order.items.map((item, index) => (
                                    <li key={index} className="order-history__items-item">
                                        Product ID: {item.productId}, Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="order-history__delete-button"
                                onClick={() => handleDelete(order.id)}
                            >
                                Clear Order
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderPage;

// for admin login
// {
//     selectedOrder && (
//         <div className="order-update-form">
//             <h3>Update Order {selectedOrder.id}</h3>
//             <label>
//                 Status:
//                 <select
//                     name="status"
//                     value={updatedOrderData.status}
//                     onChange={handleInputChange}
//                 >
//                     <option value="Pending">Pending</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Canceled">Canceled</option>
//                 </select>

//             </label>
//             <label>
//                 Total Amount:
//                 <input
//                     type="number"
//                     name="totalAmount"
//                     value={updatedOrderData.totalAmount}
//                     onChange={handleInputChange}
//                 />
//             </label>
//             <h4>Items</h4>
//             {updatedOrderData.items.map((item, index) => (
//                 <div key={index} className="order-update-form__item">
//                     <label>
//                         Product ID:
//                         <input
//                             type="text"
//                             value={item.productId}
//                             disabled
//                         />
//                     </label>
//                     <label>
//                         Quantity:
//                         <input
//                             type="number"
//                             value={item.quantity}
//                             onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
//                         />
//                     </label>
//                     <label>
//                         Price:
//                         <input
//                             type="number"
//                             value={item.price}
//                             onChange={(e) => handleItemChange(index, "price", e.target.value)}
//                         />
//                     </label>
//                 </div>
//             ))}
//             <button className="order-history__update-button" onClick={handleSubmitUpdate}>
//                 Submit
//             </button>
//             <button className="order-history__delete-button" onClick={closeUpdateForm}>
//                 Cancel
//             </button>
//         </div>
//     )
// }