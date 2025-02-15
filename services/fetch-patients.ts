import { cookies } from 'next/headers';

export async function fetchPatients() {
    const cookieStore = cookies();
    const token = cookieStore.get('next-auth.session-token')?.value || '';

    // console.log("Cookie::", token);

    const res = await fetch(`${process.env.BASE_URL}/patients`, {
        method: "GET",
        cache: 'no-cache',
        headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log('Failed to fetch data')
    }
    const data = await res.json()

    return data
}
