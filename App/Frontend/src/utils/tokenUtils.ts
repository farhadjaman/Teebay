interface DecodedToken {
  exp: number;
  userId: string;
  email: string;
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    // Get the expiration part from the token
    const decoded = JSON.parse(atob(token.split(".")[1])) as DecodedToken;

    // Convert expiration time to milliseconds and compare with current time
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    return currentTime >= expirationTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
