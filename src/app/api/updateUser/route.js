import { getDatabase, ref, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { NextResponse } from "next/server";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function PUT(request) {
  try {
    const { uid, userData } = await request.json();

    if (!uid) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    // Update user data in Firebase Realtime Database
    const userRef = ref(db, `users/${uid}`);
    const updates = {
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    await update(userRef, updates);

    return NextResponse.json({
      success: true,
      message: "User data updated successfully",
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
