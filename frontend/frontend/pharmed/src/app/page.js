"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /dashboard/products route after a slight delay
    // (optional: for visual feedback or loading indication)
    setTimeout(() => {
      router.push("/dashboard/products");
    }, 500); // Adjust delay as needed (in milliseconds)
  }, []);

  return null; // Return nothing to prevent rendering unnecessary content
}
