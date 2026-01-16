// Authentication Service for FarmPal
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Login user with username and password
 * @param {string} username 
 * @param {string} password 
 * @returns {Object|null} User data or null if invalid credentials
 */
export const loginUser = async (username, password) => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Check password
        if (userData.password !== password) {
            return null;
        }

        return {
            id: userDoc.id,
            name: userData.name,
            username: userData.username,
            role: userData.role,
        };
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

/**
 * Logout user (clear any server-side state if needed)
 */
export const logoutUser = async () => {
    // Currently no server-side logout needed
    // This function exists for future extensibility
    return true;
};

export default { loginUser, logoutUser };
