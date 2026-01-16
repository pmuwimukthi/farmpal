// User Management Service for FarmPal - Simplified queries
import { db } from '../config/firebase';
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { getCurrentDateComponents } from '../utils/dateUtils';

const COLLECTION_NAME = 'users';

/**
 * Get all users
 */
export const getAllUsers = async () => {
    try {
        const usersRef = collection(db, COLLECTION_NAME);
        const querySnapshot = await getDocs(usersRef);

        return querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } catch (error) {
        console.error('Error getting all users:', error);
        return [];
    }
};

/**
 * Add a new user
 */
export const addUser = async (name, username, password, role) => {
    try {
        const { date } = getCurrentDateComponents();
        const usersRef = collection(db, COLLECTION_NAME);

        const docRef = await addDoc(usersRef, {
            name,
            username,
            password,
            role,
            createdAt: date.toISOString(),
        });

        return {
            id: docRef.id,
            name,
            username,
            password,
            role,
        };
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

/**
 * Delete a user by ID
 */
export const deleteUser = async (userId) => {
    try {
        const userDocRef = doc(db, COLLECTION_NAME, userId);
        await deleteDoc(userDocRef);
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export default {
    getAllUsers,
    addUser,
    deleteUser
};
