import {model, Schema} from "mongoose"
const InterfaceLogSchema = new Schema({
    interfaceName:String,
    integrationKey:String,
    status:{type:String,enum:['success','failure']},
    message:String,
    timestamp:{type:Date,default:Date.now}
})

export default InterfaceLogModel=model("interface",InterfaceLogSchema)