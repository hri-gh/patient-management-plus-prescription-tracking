import mongoose, { Schema, Document, Model } from 'mongoose';

// export interface AdminDocument extends mongoose.Document {
//     email: string;
//     password: string;
//     username: string;
// }

interface AdminDocument extends Document {
    username: string;
    password: string;
    email: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
}


const AdminSchema: Schema<AdminDocument> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    verifyCode: {
        type: String,
    },
    verifyCodeExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});


// const AdminModel = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

// const AdminModel =
// (mongoose.models.Admin as mongoose.Model<AdminDocument>) ||
// mongoose.model<AdminDocument>('Admin', AdminSchema);

// const AdminModel = mongoose.models.Admin ? mongoose.models.Admin : mongoose.model('Admin', AdminSchema);

// const AdminModel: Model<AdminDocument> =mongoose.models.Admin || mongoose.model<AdminDocument>('Admin', AdminSchema);

const AdminModel = mongoose.models && mongoose.models.Admin ? mongoose.models.Admin as mongoose.Model<AdminDocument> : mongoose.model<AdminDocument>('Admin', AdminSchema);
export default AdminModel;
