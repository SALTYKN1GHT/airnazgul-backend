import {orderService} from '../services/order.service.js';

export const orderController = {
    async createOrder(request, response,next)
    {
        const order = request.body;
        try{
            const created = await orderService.addOrder(order);
            return response.status(200).json(created);
        }
        catch(err){
            next(err);
        }
    },

    async getOrders(request, response, next)
    {
        try{
            const orders = await orderService.getOrderList();
            return response.status(200).json(orders);
        }
        catch(err)
        {
            next(err);
        }
    },

    async getDetailedOrders(request, response, next)
    {
        try{
            const detailedOrders = await orderService.getDetailedOrderList();
            return response.status(200).json(detailedOrders);
        }
        catch(err)
        {
            next(err);
        }
    },

    async getOrderById(request, response, next)
    {
        const orderId = request.params.id;
        try{
            const result = await orderService.getOrderById(orderId);
            return response.status(200).json(result);
        }
        catch(err)
        {
            next(err);
        }
    },

    async getDetailedOrderById(request, response, next)
    {
        const orderId = request.params.id;
        try{
            const detailedOrder = await orderService.getOrderDetailsById(orderId);
            return response.status(200).json(detailedOrder);
        }
        catch(err)
        {
            next(err);
        }
    },

    async updateOrder(request, response, next)
    {
        const orderId = request.params.id;
        const order = request.body;
        try{
            const updated = await orderService.updateOrder(orderId, order);
            return response.status(200).json(updated);
        }
        catch(err)
        {
            next(err);
        }
    },

    async deleteOrder(request, response, next)
    {
        const orderId = request.params.id;
        try{
            await orderService.deleteOrder(orderId);
            return response.status(200).json({'message': 'Order successfully deleted'})
        }
        catch(err){
            next(err);
        }
    },
}