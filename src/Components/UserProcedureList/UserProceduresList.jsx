import React, { useEffect, useState } from "react";
import { Container, Title, Divider, SimpleGrid } from "@mantine/core";
import ProcedureCard from "../ProcedureCard/ProcedureCard"; // Ensure this path is correct

const UserProceduresList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      if (!token || !userId) {
        console.error("User is not logged in or token is missing");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          const errorText = await response.text();
          console.error("Failed to fetch user-specific bookings:", errorText);
        }
      } catch (error) {
        console.error("Error fetching user-specific bookings:", error);
      }
    };

    fetchUserBookings();
  }, []);

  const handleCancel = (procedureId) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.procedure_id._id !== procedureId)
    );
  };

  return (
    <Container>
      <Title>My Procedures</Title>
      <Divider my="md" />
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <SimpleGrid cols={3} spacing="lg">
          {bookings.map((booking) => (
            <ProcedureCard
              key={booking._id}
              procedure={booking.procedure_id}
              userId={booking.user_id}
              isUserProcedure={true}
              onCancel={handleCancel}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default UserProceduresList;
