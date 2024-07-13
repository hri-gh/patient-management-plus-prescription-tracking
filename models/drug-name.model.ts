import mongoose, { Schema, Document } from 'mongoose';

export interface Drug extends Document {
    drugName: string;
    createdAt: Date;
}


const DrugNameSchema: Schema<Drug> = new mongoose.Schema({
    drugName: String,
    createdAt: Date,
})


const DrugNameModel =
    (mongoose.models.Drug_Name as mongoose.Model<Drug>) ||
    mongoose.model<Drug>('Drug_Name', DrugNameSchema);

export default DrugNameModel;
