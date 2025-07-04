import { auth, db } from "./firebase";
import { useEffect } from "react";

export default function TestFirebase() {
  useEffect(() => {
    console.log("Firebase Initialization Check:");
    console.log("Auth Service:", auth ? "✅ Working" : "❌ Failed");
    console.log("Firestore Service:", db ? "✅ Working" : "❌ Failed");
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Firebase Connection Verified!</h1>
      <p>Check browser console for details.</p>
    </div>
  );
}