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
const user_1 = require("../models/user");
const store = new user_1.UserStore();
//-------------------------------------------------------------------------------
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        user_name: req.body.user_name,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    try {
        const newUser = yield store.create(user);
        if (!newUser) {
            res.json({ message: 'user alreday exists !' });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
            res.json({ token });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
});
//-------------------------------------------------------------------------------
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.authenticate(req.body.user_name, req.body.password);
        if (result === 'login success') {
            const token = jsonwebtoken_1.default.sign({ user: result }, process.env.TOKEN_SECRET);
            res.json({ message: 'login success', token });
        }
        else if (result === 'login failed') {
            res.json({ message: 'login failed' });
        }
        else {
            res.json({ message: 'user not found' });
        }
    }
    catch (e) {
        res.json({ message: 'login failed' });
    }
});
//-------------------------------------------------------------------------------
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield store.index();
        res.json(result);
    }
    catch (e) {
        res.json('unable to get all users');
    }
});
//-------------------------------------------------------------------------------
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const result = yield store.show(parseInt(req.query.id, 10));
            res.json(result);
        }
        else {
            res.json('Invalid user id');
        }
    }
    catch (e) {
        res.json('unable to get user');
    }
});
//-------------------------------------------------------------------------------
const userRoutes = (app) => {
    app.get('/login', login);
    app.get('/allUsers', getAllUsers);
    app.get('/singleUser', getSingleUser);
    app.post('/register', register);
};
exports.default = userRoutes;
