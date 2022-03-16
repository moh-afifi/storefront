"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (e) {
        res.status(401);
        res.json('Invalid Token');
        console.log(e);
        return;
    }
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (e) {
        res.json('unable to get orders');
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        order_status: req.body.order_status,
        user_id: req.body.user_id,
    };
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (e) {
        res.status(401);
        res.json('Invalid Token');
        console.log(e);
        return;
    }
    try {
        const addedOrder = yield store.addOrder(order);
        res.json(addedOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addOrderProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const { productId } = req.body;
    const quantity = parseInt(req.body.quantity, 10);
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (e) {
        res.status(401);
        res.json('Invalid Token');
        console.log(e);
        return;
    }
    try {
        const addedProduct = yield store.addOrderProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const getOrderByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (e) {
        res.status(401);
        res.json('Invalid Token');
        console.log(e);
        return;
    }
    try {
        if (!Number.isNaN(`${req.query.id}`)) {
            const result = yield store.getOrderByUser(parseInt(req.query.id, 10));
            res.json(result);
        }
        else {
            res.json('Invalid user id');
        }
    }
    catch (e) {
        res.json('unable to get order');
    }
});
const orderRoutes = (app) => {
    app.post('/addOrder', addOrder);
    app.get('/orderByUser', getOrderByUser);
    app.get('/allOrders', getAllOrders);
    app.post('/orders/:id/products', addOrderProduct);
};
exports.default = orderRoutes;
