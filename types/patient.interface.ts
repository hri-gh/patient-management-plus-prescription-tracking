
export interface Patient {
    name: string;
    mobile: number;
    email: string;
    age: number;
    place: string;
    gender: 'male' | 'female' | 'other';
}

export interface PatientData extends Patient {
    _id: string;
    // __v: number;
}
