import { timeStamp } from 'console';
import mongoose, { Schema, Document } from 'mongoose';

// *--------------------*
// DRUG SCHEMA
// *--------------------*


export interface Drug extends Document {
    drugName: string;
    quantity: number;
    price: number;
}

const DrugSchema: Schema<Drug> = new mongoose.Schema({
    drugName: {
        type: String
    },
    quantity: {
        type: Number,
    },
    price:{
        type: Number,
    }
});


export interface Prescription extends Document {
    drugs: Drug[];
    payment: Object;
    ownerId: Schema.Types.ObjectId;
}

const PrescriptionSchema: Schema<Prescription> = new mongoose.Schema({
    drugs: [DrugSchema],
    payment: {
        totalAmount:Number,
        paidAmount:Number,
        dueAmount:Number,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }

},{ timestamps: true })

const PrescriptionModel =
    (mongoose.models.Prescription as mongoose.Model<Prescription>) ||
    mongoose.model<Prescription>('Prescription', PrescriptionSchema);

export default PrescriptionModel;
