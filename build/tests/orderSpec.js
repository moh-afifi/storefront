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
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
it('test get all orders', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign('token', process.env.TOKEN_SECRET);
    const response = yield request.get('/allOrders').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
it('test get order by user', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign('token', process.env.TOKEN_SECRET);
    const response = yield request.get('/orderByUser?id=1').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
it('test create order', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign('token', process.env.TOKEN_SECRET);
    const response = yield request.post('/addOrder').set('Authorization', `Bearer ${token}`).send({
        status: 'active',
        user_id: '1',
    });
    expect(response.status).toBe(200);
}));
it('test create order product', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign('token', process.env.TOKEN_SECRET);
    const response = yield request.post('/orders/1/products').set('Authorization', `Bearer ${token}`).send({
        productId: '1',
        quantity: '10',
    });
    expect(response.status).toBe(200);
}));
