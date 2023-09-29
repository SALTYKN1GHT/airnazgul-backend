import express from 'express';
import { orderController } from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.get('/', orderController.getOrders);
orderRouter.get('/details', orderController.getDetailedOrders);
orderRouter.get('/:id', orderController.getOrderById);
orderRouter.get('/details/:id', orderController.getDetailedOrderById);
orderRouter.post('/create', orderController.createOrder);
orderRouter.put('/update/:id', orderController.updateOrder);
orderRouter.delete('/delete/:id', orderController.deleteOrder);

export default orderRouter;