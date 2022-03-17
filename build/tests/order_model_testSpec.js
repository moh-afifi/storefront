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
const pg_1 = __importDefault(require("pg"));
const order_1 = require("../models/order");
const orderStore = new order_1.OrderStore();
describe("test get all orders - model", function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                order_status: 'open',
                user_id: 1,
            };
            yield orderStore.addOrder(body);
        });
    });
    it('test get all orders - model', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield orderStore.index();
        expect(result[0]).toEqual({
            id: 1,
            order_status: 'open',
            user_id: 1,
        });
    }));
});
describe("test add new order - model", function () {
    let result;
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                order_status: 'closed',
                user_id: 1,
            };
            result = yield orderStore.addOrder(body);
        });
    });
    it('test add new order - model', () => __awaiter(this, void 0, void 0, function* () {
        expect(result.order_status).toEqual('closed');
        expect(result.user_id).toEqual(1);
    }));
});
describe("test add new order product - model", function () {
    let result;
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const mClient = jasmine.createSpyObj('client', ['connect', 'query']);
            spyOn(pg_1.default, 'Client').and.returnValue(mClient);
            result = yield orderStore.addOrderProduct(20, '1', '1');
        });
    });
    it('test add new order product - model', () => __awaiter(this, void 0, void 0, function* () {
        expect(result.quantity).toEqual(20);
        expect(`${result.order_id}`).toEqual('1');
        expect(`${result.product_id}`).toEqual('1');
    }));
});
describe("test get order by user - model", function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                order_status: 'closed',
                user_id: 1,
            };
            yield orderStore.addOrder(body);
        });
    });
    it('test get order by user - model', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield orderStore.getOrderByUser(1);
        expect(result[0].id).toEqual(1);
    }));
});
