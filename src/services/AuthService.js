import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export class AuthService {
  getRegister = async (
    username,
    email,
    password,
    gender,
    birthdate,
  ) => {
    try {
      const response = await fetch("http://20.216.143.86/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          gender,
          birthdate,
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
      // http://20.216.143.86
      const response = await fetch("http://20.216.143.86/auth/login", {
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
}
