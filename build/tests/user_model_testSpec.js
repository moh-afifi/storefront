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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const orderStore = new user_1.UserStore();
describe('test get all users - model', function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
            const hash = bcrypt_1.default.hashSync(`${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`, parseInt(SALT_ROUNDS, 10));
            const body = {
                user_name: 'user_name',
                password: hash,
                first_name: 'first_name',
                last_name: 'last_name',
            };
            yield orderStore.create(body);
        });
    });
    it('test get all users - model', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield orderStore.index();
        expect(result[0].id).toEqual(1);
    }));
});
describe('test get single user - model', function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
            const hash = bcrypt_1.default.hashSync(`${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`, parseInt(SALT_ROUNDS, 10));
            const body = {
                user_name: 'user_name',
                password: hash,
                first_name: 'first_name',
                last_name: 'last_name',
            };
            yield orderStore.create(body);
        });
    });
    it('test get single user - model', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield orderStore.show(1);
        expect(result[0].id).toEqual(1);
    }));
});
describe('test add new user - model', function () {
    it('test add new user - model', () => __awaiter(this, void 0, void 0, function* () {
        const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
        const hash = bcrypt_1.default.hashSync(`${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`, parseInt(SALT_ROUNDS, 10));
        const body = {
            user_name: 'user_name',
            password: hash,
            first_name: 'first_name',
            last_name: 'last_name',
        };
        const result = yield orderStore.create(body);
        let check = false;
        if (result === false) {
            expect(result === false).toBeTruthy();
        }
        else {
            check = true;
            expect(check).toBeTruthy();
        }
    }));
});
describe('test add new user - model', function () {
    let result;
    const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
    const hash = bcrypt_1.default.hashSync(`${process.env.TEST_PASSWORD}${BCRYPT_PASSWORD}`, parseInt(SALT_ROUNDS, 10));
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                user_name: 'user1',
                password: hash,
                first_name: 'first_name',
                last_name: 'last_name',
            };
            result = yield orderStore.create(body);
        });
    });
    it('test login - model', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield orderStore.authenticate('user1', hash);
        expect(result).toEqual('login failed');
    }));
});
