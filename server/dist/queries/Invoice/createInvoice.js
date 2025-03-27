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
const invoiceModel_1 = __importDefault(require("../../models/invoiceModel"));
const date_fns_tz_1 = require("date-fns-tz");
const createInvoice = (invoiceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
        const currentDate = new Date();
        const zonedCurrentDate = (0, date_fns_tz_1.toZonedTime)(currentDate, vietnamTimeZone);
        console.log('Zoned Current Date:', zonedCurrentDate);
        const formattedCurrentDate = (0, date_fns_tz_1.format)(zonedCurrentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone: vietnamTimeZone });
        console.log('Formatted Current Date (Vietnam Time):', formattedCurrentDate);
        const newData = Object.assign(Object.assign({}, invoiceData), { ngayTao: formattedCurrentDate });
        console.log('New Data:', newData);
        const newInvoice = new invoiceModel_1.default(newData);
        const savedInvoice = yield newInvoice.save();
        console.log('Saved Invoice:', savedInvoice);
        return savedInvoice;
    }
    catch (error) {
        throw new Error(`Failed to create invoice: ${error}`);
    }
});
exports.default = createInvoice;
