import dbConnect from "../lib/db-connect";
import Admin from '../models/admin.mode';
import bcrypt from 'bcryptjs';

async function seed() {
    await dbConnect();

    const hashedPassword = await bcrypt.hash('admin', 10);

    await Admin.updateOne(
        { email: 'admin@example.com' },
        { email: 'admin@example.com', password: hashedPassword, username:"admin" },
        { upsert: true }
    );

    console.log('Admin user seeded');
}

seed().catch(console.error).finally(() => process.exit());
