import mongoose, { Schema, Document } from 'mongoose';
import { Patient } from '@/types/patient.interface';

interface PatientDocument extends Document, Patient { }

const PatientSchema: Schema<PatientDocument> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Patient name is required'],
    },
    mobile: {
        type: Number,
        required: [true, 'Mobile Number is required'],
        unique: true,
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    place: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Gender is required'],
    }

});

const PatientModel =
    (mongoose.models.Patient as mongoose.Model<PatientDocument>) ||
    mongoose.model<PatientDocument>('Patient', PatientSchema);

export default PatientModel;
