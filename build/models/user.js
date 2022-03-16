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
exports.UserStore = void 0;
// @ts-ignore
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
class UserStore {
    // to create new user: register
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sqlSelect = 'SELECT user_name FROM users WHERE user_name=($1)';
                const resultSelect = yield conn.query(sqlSelect, [u.user_name]);
                if (resultSelect.rows.length === 0) {
                    const sql = 'INSERT INTO users (user_name, password,first_name,last_name) VALUES($1, $2,$3,$4) RETURNING *';
                    const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS, 10));
                    const result = yield conn.query(sql, [u.user_name, hash, u.first_name, u.last_name]);
                    const user = result.rows[0];
                    conn.release();
                    return user;
                }
                conn.release();
                return false;
            }
            catch (err) {
                throw new Error(`unable create user (${u.user_name}): ${err}`);
            }
        });
    }
    //-------------------------------------------------------------------------------
    // to authentiacte user: login
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { BCRYPT_PASSWORD } = process.env;
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT password FROM users WHERE user_name=($1)';
                const result = yield conn.query(sql, [username]);
                if (result.rows.length !== 0) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                        return 'login success';
                    }
                    return 'login failed';
                }
                return 'user not found';
            }
            catch (e) {
                return 'user not found';
            }
        });
    }
    //---------------------------------------------------------------------------
    // to get all users:
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not get users: Error: ${e}`);
            }
        });
    }
    //---------------------------------------------------------------------------
    // to get single user:
    show(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHere id =($1) ';
                const result = yield conn.query(sql, [`${userId}`]);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not get users: Error: ${e}`);
            }
        });
    }
}
exports.UserStore = UserStore;
