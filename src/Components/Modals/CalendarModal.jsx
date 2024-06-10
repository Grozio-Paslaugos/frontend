import React, { useState, useEffect } from "react";
import { Modal, Button, Group, Select, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import axios from "axios";

const CalendarModal = ({ opened, onClose, procedureId, bookingId, isEditMode, onUpdate }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && user._id) {
      setUserId(user._id);
    }
    setToken(token);

    if (isEditMode && bookingId) {
      // Fetch the booking details if in edit mode to pre-fill the date and time
      const fetchBookingDetails = async () => {
        try {
          console.log("Fetching booking details for ID:", bookingId);
          const response = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = response.data;
          setSelectedDate(new Date(data.booking_datetime));
          const time = new Date(data.booking_datetime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          setSelectedTime(time);
        } catch (error) {
          console.error("Failed to fetch booking details:", error.response?.data || error.message);
        }
      };
      fetchBookingDetails();
    }
  }, [isEditMode, bookingId]);

  const times = [
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
    "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  ];

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }

    const bookingDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":");
    bookingDate.setHours(hours);
    bookingDate.setMinutes(minutes);

    const bookingData = {
      user_id: userId,
      procedure_id: procedureId,
      booking_datetime: bookingDate.toISOString(),
    };

    if (!userId || !token) {
      console.error("User is not logged in or token is missing");
      return;
    }

    try {
      const url = isEditMode
        ? `http://localhost:5000/api/bookings/update/${bookingId}`
        : "http://localhost:5000/api/bookings/create";

      const method = isEditMode ? "PUT" : "POST";

      console.log("Submitting to URL:", url);
      const response = await axios({
        method,
        url,
        data: bookingData,
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(
        isEditMode ? "Booking updated successfully:" : "Booking created successfully:",
        response.data
      );

      if (isEditMode && onUpdate) {
        onUpdate(bookingId, bookingDate.toISOString());
      }

      onClose();
    } catch (error) {
      console.error(
        isEditMode ? "Error updating booking:" : "Error booking procedure:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={isEditMode ? "Edit Booking" : "Select Date and Time"}>
      <DatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        label="Select Date"
        required
      />
      <Select
        label="Select Time"
        placeholder="Pick a time"
        data={times}
        value={selectedTime}
        onChange={setSelectedTime}
        required
        mt="md"
      />
      <Text mt="md">
        Selected Date: {selectedDate ? selectedDate.toLocaleDateString() : "None"}
      </Text>
      <Text>
        Selected Time: {selectedTime || "None"}
      </Text>
      <Group position="apart" mt="md">
        <Button fullWidth onClick={handleSubmit} disabled={!selectedDate || !selectedTime}>
          {isEditMode ? "Update Booking" : "Book"}
        </Button>
        <Button fullWidth onClick={onClose} variant="outline" color="red">
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export default CalendarModal;
