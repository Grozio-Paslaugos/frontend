import React, { useState } from "react";
import { Card, Image, Text, Group, Button } from "@mantine/core";
import CalendarModal from "../Modals/CalendarModal";

const ProcedureCard = ({ procedure, userId, isUserProcedure, onCancel }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const handleBookClick = () => {
    setEditMode(false);
    setModalOpened(true);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setBookingId(procedure._id);
    setModalOpened(true);
  };
  const handleCancelClick = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/delete/${procedure._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Procedure cancelled successfully");
        onCancel(procedure._id);
      } else {
        const errorText = await response.text();
        console.error("Failed to cancel procedure:", errorText);
      }
    } catch (error) {
      console.error("Error cancelling procedure:", error);
    }
  };

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ height: "450px", width: "300px" }}
      >
        <Card.Section>
          <Image
            src={procedure.image}
            alt="Procedure image"
            height={200}
            width="100%"
            style={{ objectFit: "cover" }}
          />
        </Card.Section>
        <Group position="apart" mt="md" mb="xs">
          <Text fw={500}>{procedure.name}</Text>
          <Text fw={500}>{procedure.category}</Text>
          <Text fw={500}>{procedure.date}</Text>
        </Group>
        {isUserProcedure ? (
          <>
            <Button fullWidth mt="md" color="red" onClick={handleCancelClick}>
              Cancel Procedure
            </Button>
            <Button fullWidth mt="md" color="blue" onClick={handleEditClick}>
              Edit Booking
            </Button>
          </>
        ) : (
          <Button fullWidth mt="md" color="blue" onClick={handleBookClick}>
            Book Procedure
          </Button>
        )}
      </Card>
      <CalendarModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        procedureId={procedure._id}
        userId={userId}
        bookingId={bookingId}
        isEditMode={editMode}
      />
    </>
  );
};

export default ProcedureCard;
