import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export class AuthService {
  checkUsernameEmail = async (username, email) => {
    try {
      const response = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });
      if (response.status === 202) {
        console.log("Username and email available");
        return true;
      } else {
        console.error(response.json);
        return false;
      }
    } catch (error) {
      console.error("Request error: ", error);
      return false;
    }
  };
  checkOTP = async (email, otp) => {
    try {
      const response = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });
      if (response.status === 200) {
        console.log("OTP validé");
        return true;
      } else {
        console.error(response.json);
        return false;
      }
    } catch (error) {
      console.error(response);
      console.error("Request error: ", error);
      return false;
    }
  };
  getRegister = async (
    username,
    email,
    password,
    gender,
    description,
    birthdate,
    otp
  ) => {
    try {
      const response = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          gender,
          description,
          birthdate,
          otp,
        }),
      });
      if (response.status === 201) {
        console.log("User created");
        return true;
      } else {
        console.error(response.json);
        return response.json();
      }
    } catch (error) {
      console.error("Request error: ", error);
      return false;
    }
  };

  getLogin = async (email, password) => {
    try {
      // https://x2025unbored786979363000.francecentral.cloudapp.azure.com
      const response = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.status === 202) {
        const data = await response.json();
        const token = data.token;
        await AsyncStorage.setItem("authToken", token);
        return true;
      } else {
        console.error(response.toString());
        return false;
      }
    } catch (error) {
      console.error("Request error: ", error);
      return false;
    }
  };

  loginGoogle = async (googleTokenId) => {
    try {
      // https://x2025unbored786979363000.francecentral.cloudapp.azure.com
      const response = await fetch(`https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/login/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleTokenId,
        }),
      });
      if (response.status === 202) {
        const data = await response.json();
        const token = data.token;
        await AsyncStorage.setItem("authToken", token);
        return true;
      } else {
        console.error(response.toString());
        return false;
      }
    } catch (error) {
      console.error("Request error: ", error);
      return false;
    }
  };
}
