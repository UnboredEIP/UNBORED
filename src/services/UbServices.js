import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export class UbService {
  getEvents = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/events/lists`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData.events;
      //   await AsyncStorage.setItem("allEvents", responseData.events);
    } catch (error) {
      console.error("Error when try to get events:", error);
    }
  };

  getImage = async (imageName) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `${API_URL}/getimage?imageName=${imageName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // const responseData = await response.json();
      return response;
      //   await AsyncStorage.setItem("allEvents", responseData.events);
    } catch (error) {
      console.error("Error when try to get events:", error);
    }
  };

  getRegister = async (username, email, password, gender, birthdate) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
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
      // ${API_URL}
      const response = await fetch(`${API_URL}/auth/login`, {
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