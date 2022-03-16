"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_handler_1 = __importDefault(require("./handlers/product_handler"));
const user_handler_1 = __importDefault(require("./handlers/user_handler"));
const order_handler_1 = __importDefault(require("./handlers/order_handler"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
(0, product_handler_1.default)(app);
(0, user_handler_1.default)(app);
(0, order_handler_1.default)(app);
app.listen(3000, () => {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
