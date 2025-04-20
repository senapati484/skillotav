import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { NextResponse } from "next/server";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // Make sure to add this in your .env
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function POST(request) {
  try {
    const { uid, email, displayName } = await request.json();

    // Check if user already exists
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      // Split display name into first and last name
      const [firstName = "", lastName = ""] = (displayName || "").split(" ");

      // Create initial user data structure
      const userData = {
        name: {
          firstName,
          lastName,
        },
        email,
        links: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Set the data in Firebase Realtime Database
      await set(userRef, userData);

      return NextResponse.json({
        success: true,
        message: "User data created successfully",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User already exists",
    });
  } catch (error) {
    console.error("Error creating user data:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
