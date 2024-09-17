import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export class UbService {
  getEvents = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/lists`,
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
      const responseData = await response.json();

      return responseData.events.filter((event) => !event.private);
      //   await AsyncStorage.setItem("allEvents", responseData.events);
    } catch (error) {
      console.error("Error when try to get events:", error);
    }
  };
  getSubscribedEvents = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/reservations`,
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
      const responseData = await response.json();
      // console.log(responseData.reservations);
      return responseData.reservations;
      //   await AsyncStorage.setItem("allEvents", responseData.events);
    } catch (error) {
      console.error("Error when try to get subscribed events:", error);
    }
  };
  joinEvent = async (events) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            events,
          }),
        }
      );
      if (response.ok) {
        return true;
      } else {
        console.error(response.toString());
        return false;
      }
      //   await AsyncStorage.setItem("allEvents", responseData.events);
    } catch (error) {
      console.error("Error when try to join events:", error);
    }
  };
  leaveEvent = async (events) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            events,
          }),
        }
      );
      if (response.ok) {
        return true;
      } else {
        console.error(response.toString());
        return false;
      }
      //   await AsyncStorage.setItem("allEvents", responseData.events);
    } catch (error) {
      console.error("Error when try to leave events:", error);
    }
  };
  favEvent = async (events) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/favorites/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            events,
          }),
        }
      );
      if (response.ok) {
        return true;
      } else {
        console.error(response.toString());
        return false;
      }
      //   await AsyncStorage.setItem("allEvents", responseData.events);
    } catch (error) {
      console.error("Error when try to fav events:", error);
    }
  };
  deleteFavEvent = async (events) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/favorites/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            events,
          }),
        }
      );

      if (response.ok) {
        return true;
      } else {
        console.error("JE SUIS DSL", response.toString());
        return false;
      }
      //   await AsyncStorage.setItem("allEvents", responseData.events);
    } catch (error) {
      console.error("Error when try to delete events:", error);
    }
  };
  getEventById = async (id) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/show?id=${id}`,
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
      const responseData = await response.json();
      return responseData.event;
    } catch (error) {
      console.error("Error when try to get event by id:", error);
    }
  };
  getUserEvents = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event`,
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
      const responseData = await response.json();
      return responseData.reservations;
    } catch (error) {
      console.error("Error when try to get event from user:", error);
    }
  };
  getUserById = async (id) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/get?id=${id}`,
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
      const responseData = await response.json();
      if (!responseData.user) throw new Error(`User null: ${response.status}`);
      return responseData.user;
    } catch (error) {
      console.error("Error when try to get user:", error);
    }
  };

  getAllUsers = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/profile/all`,
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
      const responseData = await response.json();
      if (!responseData.users) throw new Error(`status: ${response.status}`);
      return responseData.users;
    } catch (error) {
      console.error("Error when try to get all users:", error);
    }
  };

  sendFriendRequest = async (id) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/friends/invite?user_id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("FRIEND REQUEST SENT TO:", id);
      return true;
    } catch (error) {
      console.error("Error when try to send friend request:", error);
    }
  };

  acceptFriendRequest = async (id) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/friends/accept?user_id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("ACCEPT NEW FRIEND:", id);
      return true;
    } catch (error) {
      console.error("Error when try to accept friend:", error);
    }
  };

  getEventRate = async (id) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/events/show?id=${id}`,
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
      const responseData = await response.json();
      // console.log("reponseData", responseData);
      if (
        responseData.event.rate !== undefined ||
        responseData.event.rate !== undefined
      ) {
        console.log("HIHIHIHI:", responseData.event);
        const eventRate = responseData.event.rate;
        let totalStars = 0;
        let totalRatings = 0;

        // console.log("eventRate:", eventRate);
        if (Array.isArray(eventRate)) {
          eventRate.forEach((rating) => {
            const stars = parseInt(rating.stars);
            console.log("HIHI:", stars);
            if (!isNaN(stars)) {
              totalStars += stars;
              totalRatings++;
            }
          });
        }

        let averageRating = 0;
        if (totalRatings > 0) {
          averageRating = totalStars / totalRatings;
        }
        // console.log("AVERAGE:", totalRatings);
        // console.log("STARS", totalStars);
        return averageRating;
      }
      return 5;
    } catch (error) {
      console.error("Error when try to get event:", error);
    }
  };

  getImage = async (imageName) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/getimage?imageName=${imageName}`,
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
      console.error("Error when try to get images:", error);
    }
  };

  getRegister = async (username, email, password, gender, birthdate) => {
    try {
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/register`,
        {
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
        }
      );
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
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
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

  sendReview = async (id, stars, comments) => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        `https://x2025unbored786979363000.francecentral.cloudapp.azure.com/event/rate?id=${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            stars,
            comments,
          }),
        }
      );
      if (response.ok) {
        console.log(
          `Event ${id} rated successfully:\nSTARS: ${stars}\nCOMMENT: ${comments}`
        );
        return true;
      } else {
        console.error(response.status);
        return false;
      }
    } catch (error) {
      console.error("Request error: ", error);
      return false;
    }
  };
}
