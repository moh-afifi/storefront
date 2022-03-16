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
const product_1 = require("../models/product");
const store = new product_1.ClothesStore();
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (e) {
        res.json('unable to get products');
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!Number.isNaN(`${req.query.id}`)) {
            const result = yield store.show(parseInt(req.query.id, 10));
            res.json(result);
        }
        else {
            res.json('Invalid user id');
        }
    }
    catch (e) {
        console.log('unable to get single product');
        res.json('unable to get single product');
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        product_name: req.body.product_name,
        category: req.body.category,
        price: req.body.price,
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
        const newUser = yield store.create(product);
        res.send(newUser);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
});
//--------------------------------------------------------------------------
const productsRoute = (app) => {
    app.get('/allProducts', getAllProducts);
    app.get('/singleProduct', getSingleProduct);
    app.post('/addProduct', createProduct);
};
exports.default = productsRoute;
