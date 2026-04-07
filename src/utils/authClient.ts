import axios from "axios";
import { createAuthClient } from "@bka-stuff/pe-mfe-utils";

const BASE_URL = process.env.AUTH_URL || "http://localhost:8080";

export const axiosPublic = axios.create({ baseURL: BASE_URL });
export const axiosAuth = axios.create({ baseURL: BASE_URL });

// IMPORTANT: put your app “logout effects” here (clear state + route, etc.)
export const authClient = createAuthClient({
  axiosPublic,
  axiosAuth,
  onLogout: () => {
    // keep minimal here; you can also call authClient.logout() from your hook
    console.log("Logged out");
  },
});

authClient.attach();
