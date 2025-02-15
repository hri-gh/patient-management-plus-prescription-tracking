
export interface Patient {
    name: string;
    mobile: number;
    email: string;
    age: number;
    place: string;
    gender: 'male' | 'female' | 'other';
}

/**
 * Represents the data of a patient.
 *
 * @interface PatientData
 * @property {string} _id - The unique identifier of the patient.
 * @property {Date} createdAt - The date and time when the patient data was created.
 * @property {Date} updatedAt - The date and time when the patient data was last updated.
 * @property {string} name - The name of the patient.
 * @property {number} mobile - The mobile number of the patient.
 * @property {string} email - The email address of the patient.
 * @property {number} age - The age of the patient.
 * @property {string} place - The place of residence of the patient.
 * @property {'male' | 'female' | 'other'} gender - The gender of the patient.
 */
export interface PatientData extends Patient {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    prescriptionCount: number;
    // __v: number;
}
