// hooks/useClickOutside.js
import { useEffect } from "react";

export function useClickOutside(handler, ref) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the ref exists and the clicked element is not inside the ref element
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}
