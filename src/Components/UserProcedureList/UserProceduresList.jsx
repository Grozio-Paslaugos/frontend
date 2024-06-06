/** @format */

import React, { useEffect, useState } from "react";
import { Container, Title, Divider, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./UserProceduresList.module.css";

const UserProceduresList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NThmYzFlMDEzZWVkN2M5NTAwMGQ5OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNzE1NDY0OSwiZXhwIjoxNzE3MTU4MjQ5fQ.b4yljnXGkDP883mAhzkkuKy-TdI628M2Wh6hO2HcShg";
      const userId = "6658fc1e013eed7c95000d98";

      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error(
            "Failed to fetch user-specific bookings",
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error fetching user-specific bookings:", error);
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <ul>
      {bookings.map((booking) => (
        <li key={booking._id}>
          Booking ID: {booking._id}, Procedure: {booking.procedure_id.name},
          Date: {new Date(booking.booking_datetime).toLocaleString()}
        </li>
      ))}
    </ul>
  );
};

export default UserProceduresList;
