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
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
it('test the login api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get('/login').send({
        user_name: 'user_test',
        password: '123456',
    });
    expect(response.status).toBe(200);
}));
it('test register end point', () => __awaiter(void 0, void 0, void 0, function* () {
    const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
    const hash = bcrypt_1.default.hashSync(`${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`, parseInt(SALT_ROUNDS, 10));
    const response = yield request.post('/register').send({
        user_name: 'user_test',
        password: hash,
        first_name: 'moh',
        last_name: 'afifi',
    });
    expect(response.status).toBe(200);
}));
it('test get all users', () => __awaiter(void 0, void 0, void 0, function* () {
    const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
    const token = jsonwebtoken_1.default.sign('token', process.env.TOKEN_SECRET);
    const hash = bcrypt_1.default.hashSync(`${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`, parseInt(SALT_ROUNDS, 10));
    const response = yield request.get('/allUsers').set('Authorization', `Bearer ${token}`).send({
        user_name: 'user_test',
        password: hash,
        first_name: 'moh',
        last_name: 'afifi',
    });
    expect(response.status).toBe(200);
}));
it('test get single user', () => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign('token', process.env.TOKEN_SECRET);
    const response = yield request.get('/singleProduct?id=1').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
}));
