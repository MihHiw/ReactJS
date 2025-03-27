"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const date_fns_tz_1 = require("date-fns-tz");
const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
const invoiceSchema = new mongoose_1.Schema({
    noiDung: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderInvoiceId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'OrderInvoice', required: true },
    ngayTao: {
        type: String,
        default: () => {
            const currentDate = new Date();
            const zonedCurrentDate = (0, date_fns_tz_1.toZonedTime)(currentDate, vietnamTimeZone);
            return (0, date_fns_tz_1.format)(zonedCurrentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone: vietnamTimeZone });
        },
    },
}, { versionKey: false });
const Invoice = mongoose_1.default.model('Invoice', invoiceSchema);
exports.default = Invoice;
