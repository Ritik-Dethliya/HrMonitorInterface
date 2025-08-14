import mongoose from "mongoose";
const { Schema, model } = mongoose;

const InterfaceLogSchema = new Schema({
    interfaceName: { type: String, required: true, index: true },
    integrationKey: { type: String, required: true },
    status: { type: String, enum: ['success', 'failure'], required: true, index: true },
    message: { type: String },
    eventType: { type: String, enum: ['start', 'end', 'error', 'retry'] },
    duration: { type: Number, min: 0 }, // in seconds
    timestamp: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

InterfaceLogSchema.index({ interfaceName: 1, timestamp: -1 });
const InterfaceLogModel=model("InterfaceLog", InterfaceLogSchema);
export default InterfaceLogModel
