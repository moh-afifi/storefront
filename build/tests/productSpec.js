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
it('test get all products', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get('/allProducts');
    expect(response.status).toBe(200);
}));
it('test get single product', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign('token', process.env.TOKEN_SECRET);
    const response = yield request.get('/singleUser?id=1').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
it('test create product', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign('token', process.env.TOKEN_SECRET);
    const response = yield request.post('/addProduct').set('Authorization', `Bearer ${token}`).send({
        product_name: 'product_test',
        category: 'categ test',
        price: '100',
    });
    expect(response.status).toBe(200);
}));
