import mongoose, { Schema, Document } from 'mongoose';

// *--------------------*
// DRUG SCHEMA
// *--------------------*


export interface Drug extends Document {
    drugName: string;
    unit: number;
    dosage: number;
    times: number
    createdAt: Date;
}

const DrugSchema: Schema<Drug> = new mongoose.Schema({
    drugName: {
        type: String
    },
    unit: {
        type: Number,
    },
    dosage: {
        type: Number,
    },
    times: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


// *--------------------*
// PAYMENT MODEL
// *--------------------*


// export interface Payment extends Document {
//     amount: number;
//     paid: number;
//     due: number;
//     createdAt: Date;
// }

// const PaymentSchema: Schema<Payment> = new mongoose.Schema({
//     amount: {
//         type: Number,
//     },
//     paid: {
//         type: Number,
//     },
//     due: {
//         type: Number,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// *--------------------*
// PRESCRIPTION MODEL
// *--------------------*

export interface Prescription extends Document {
    drugs: Drug[];
    payment: Object;
    owner: Schema.Types.ObjectId;
}

const PrescriptionSchema: Schema<Prescription> = new mongoose.Schema({
    drugs: [DrugSchema],
    payment: {
        amount:Number,
        paid:Number,
        due:Number,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }

})

const PrescriptionModel =
    (mongoose.models.Prescription as mongoose.Model<Prescription>) ||
    mongoose.model<Prescription>('Prescription', PrescriptionSchema);

export default PrescriptionModel;
