import { useEffect, useState } from "react";
import { GuestSession } from "../resTypes/guestSession";

export function useUser() {
  const [user, setUser] = useState<GuestSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("test");

    if (storedData) {
      const userData = JSON.parse(storedData);
      setUser(userData);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
  };
}
