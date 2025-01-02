# Full-Stack Project  

## Overview  
This project is a full-stack web application designed to manage users, menu items, and orders. It includes a **Node.js** backend integrated with **MongoDB** and a **React.js** frontend for seamless user interaction. The app supports authentication, menu browsing, order placement, and admin functionalities.  

---

## Features  
### Frontend  
- **User Authentication**: Login and registration with session-based token storage.  
- **Dynamic Menu Display**: Browse and add items to the cart.  
- **Order Management**: View, update, and manage orders.  
- **Admin Panel**: Update, delete, or add menu items.  

### Backend  
- **Secure API Endpoints**: CRUD operations for users, menu, and orders.  
- **Authentication**: Token-based security using JWT.  
- **Database Interaction**: Efficient data handling with Prisma ORM and MongoDB.  

---

## Tech Stack  

| Component   | Technology        |  
|-------------|-------------------|  
| Frontend    | React.js          |  
| Backend     | Node.js, Express  |  
| Database    | MongoDB           |  
| ORM         | Prisma            |  
| Authentication | JWT            |  

---

## Project Structure  

```plaintext  
root/  
├── backend/  
│   ├── controllers/  
│   ├── middleware/  
│   ├── models/  
│   ├── routes/  
│   └── server.js  
├── frontend/  
│   ├── src/  
│   │   ├── components/  
│   │   ├── context/  
│   │   ├── routes/  
│   │   ├── main.jsx  
│   │   └── App.js  
└── README.md  
```  

---

## API Endpoints  

### Authentication  
| Method | Endpoint                  | Description                  |  
|--------|---------------------------|------------------------------|  
| POST   | `/api/auth/register`      | Register a new user.         |  
| POST   | `/api/auth/login`         | Log in an existing user.     |  

### Menu  
| Method | Endpoint          | Description                    |  
|--------|-------------------|--------------------------------|  
| GET    | `/api/menu`       | Retrieve all menu items.       |  
| POST   | `/api/menu`       | Add a new menu item.           |  
| PUT    | `/api/menu/:id`   | Update a menu item.            |  
| DELETE | `/api/menu/:id`   | Delete a menu item.            |  

### Orders  
| Method | Endpoint          | Description                    |  
|--------|-------------------|--------------------------------|  
| GET    | `/api/order`      | Retrieve all orders.           |  
| POST   | `/api/order`      | Place a new order.             |  
| PUT    | `/api/order/:id`  | Update an order.               |  

---

## Installation  

### Backend  
1. Navigate to the backend folder:  
   ```bash  
   cd backend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Configure environment variables in `.env`:  
   ```env  
   DATABASE_URL=mongodb://<your-database-url>  
   JWT_SECRET=<your-secret-key>  
   ```  
4. Start the backend server:  
   ```bash  
   npm start  
   ```  

### Frontend  
1. Navigate to the frontend folder:  
   ```bash  
   cd frontend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Start the frontend development server:  
   ```bash  
   npm start  
   ```  

---

## Usage  

1. **User Registration & Login**:  
   - Register a new user or log in through the `/auth` route.  
2. **Menu Operations**:  
   - Browse the menu, add items to the cart, and manage orders.  
3. **Admin Features**:  
   - Admins can update, delete, or add menu items via the admin panel.  

---

## Future Enhancements  
- Implement real-time updates using WebSockets.  
- Add payment integration for orders.  
- Create analytics for admin users to track sales and user activity.  

---

## License  
This project is licensed under the MIT License.  

---  

Let me know if you'd like to adjust anything!