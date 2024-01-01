import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export class UbService {
  getEvents = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/event/lists`, {
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
}
