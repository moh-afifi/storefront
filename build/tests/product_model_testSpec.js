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
const product_1 = require("../models/product");
const orderStore = new product_1.ClothesStore();
describe("test get all products - model", function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const mClient = jasmine.createSpyObj('client', ['connect', 'query']);
            spyOn(pg_1.default, 'Client').and.returnValue(mClient);
            const body = {
                product_name: 'shirt',
                category: 'clothes',
                price: 100,
            };
            yield orderStore.create(body);
        });
    });
    it('test get all products - model', () => __awaiter(this, void 0, void 0, function* () {
        let result = yield orderStore.index();
        expect(result[result.length - 1]).toEqual({
            id: result.length,
            product_name: 'shirt',
            category: 'clothes',
            price: 100,
        });
    }));
});
describe("test add new product - model", function () {
    let result;
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const mClient = jasmine.createSpyObj('client', ['connect', 'query']);
            spyOn(pg_1.default, 'Client').and.returnValue(mClient);
            const body = {
                product_name: 'shirt',
                category: 'clothes',
                price: 100,
            };
            result = yield orderStore.create(body);
        });
    });
    it('test add new product - model', () => __awaiter(this, void 0, void 0, function* () {
        expect(result.product_name).toEqual('shirt');
        expect(result.category).toEqual('clothes');
        expect(result.price).toEqual(100);
    }));
});
describe("test get single product - model", function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                product_name: 'shirt',
                category: 'clothes',
                price: 100,
            };
            yield orderStore.create(body);
        });
    });
    it('test get single product - model', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield orderStore.show(1);
        expect(result[0].id).toEqual(1);
    }));
});
