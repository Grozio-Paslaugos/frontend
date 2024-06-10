import React, { useState, useEffect } from "react";
import { Card, Image, Text, Group, Button } from "@mantine/core";
import CalendarModal from "../Modals/CalendarModal";

const ProcedureCard = ({ procedure, userId, bookingId, bookingDateTime, isUserProcedure, onCancel, onUpdate }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    console.log("Received bookingDateTime:", bookingDateTime);
    if (bookingDateTime) {
      const bookingDate = new Date(bookingDateTime);
      console.log("Parsed Booking Date:", bookingDate);
      if (!isNaN(bookingDate.getTime())) {
        setFormattedDate(bookingDate.toLocaleDateString());
        setFormattedTime(bookingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } else {
        console.error("Invalid Date format:", bookingDateTime);
      }
    }
  }, [bookingDateTime]);

  const handleBookClick = () => {
    setEditMode(false);
    setModalOpened(true);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setModalOpened(true);
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
        </Group>
        {isUserProcedure && (
          <>
            <Text fw={500}>Booked Date: {formattedDate || "N/A"}</Text>
            <Text fw={500}>Booked Time: {formattedTime || "N/A"}</Text>
          </>
        )}
        {isUserProcedure ? (
          <>
            <Button fullWidth mt="md" color="red" onClick={() => onCancel(bookingId)}>
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
        onUpdate={onUpdate}
      />
    </>
  );
};

export default ProcedureCard;
