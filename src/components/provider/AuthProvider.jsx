"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { db } from "@/lib/firebase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUserData = async (user) => {
    try {
      // Set up initial profile data
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        profile: {
          name: {
            firstName: user.displayName?.split(" ")[0] || "",
            lastName: user.displayName?.split(" ")[1] || "",
          },
          email: user.email,
          phone: "",
          location: "",
          title: "Frontend Developer",
          bio: "",
          links: {
            linkedin: "",
            github: "",
            portfolio: "",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        settings: {
          emailNotifications: true,
          tokenVisibility: "public",
        },
      });

      // Initialize the credentials node
      const credentialsRef = ref(db, `credentials/${user.uid}`);
      await set(credentialsRef, {});

      toast.success("Profile created successfully");
    } catch (error) {
      console.error("Error creating user data:", error);
      toast.error("Failed to set up user profile");
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserData(result.user);
      toast.success("Successfully signed in with Google");
      return result.user;
    } catch (error) {
      toast.error("Failed to sign in with Google");
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const result = await firebaseSignInWithEmail(auth, email, password);
      toast.success("Successfully signed in");
      return result.user;
    } catch (error) {
      let message = "Failed to sign in";
      switch (error.code) {
        case "auth/invalid-credential":
          message = "Invalid email or password";
          break;
        case "auth/user-not-found":
          message = "No account found with this email";
          break;
        case "auth/wrong-password":
          message = "Incorrect password";
          break;
        case "auth/too-many-requests":
          message = "Too many attempts. Please try again later";
          break;
      }
      toast.error(message);
      throw error;
    }
  };

  const signUpWithEmail = async (email, password, username) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user profile with the username
      if (username) {
        await updateProfile(result.user, {
          displayName: username,
        });
      }

      await createUserData(result.user);
      toast.success("Account created successfully");
      return result.user;
    } catch (error) {
      let message = "Failed to create account";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "An account with this email already exists";
          break;
        case "auth/invalid-email":
          message = "Invalid email address";
          break;
        case "auth/weak-password":
          message = "Password should be at least 6 characters";
          break;
      }
      toast.error(message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Successfully signed out");
    } catch (error) {
      toast.error("Failed to sign out");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
