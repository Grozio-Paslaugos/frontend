import React, { useState, useEffect } from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Rating,
  Button,
  Modal,
  Select,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import styles from "./ProcedureCard.module.css";

const ProcedureCard = ({ procedure }) => {
  const { name, category, picture, rating, _id } = procedure;
  const [opened, setOpened] = useState(false);
  const [tempDate, setTempDate] = useState(null);
  const [tempTime, setTempTime] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

  useEffect(() => {
    const registeredProcedures = JSON.parse(localStorage.getItem("registeredProcedures"));
    if (registeredProcedures) {
      const procedureRegistration = registeredProcedures.find((p) => p.procedureId === _id);
      if (procedureRegistration) {
        setSelectedDateTime(new Date(procedureRegistration.bookingDatetime));
        setIsRegistered(true);
      }
    }
  }, [_id]);

  useEffect(() => {
    if (tempDate) {
      const times = generateAvailableTimes();
      setAvailableTimes(times);
    }
  }, [tempDate, _id]);

  const generateAvailableTimes = () => {
    const times = [];
    let startTime = new Date(tempDate);
    startTime.setHours(8, 30, 0, 0);

    while (
      startTime.getHours() < 16 ||
      (startTime.getHours() === 16 && startTime.getMinutes() <= 30)
    ) {
      times.push(
        `${startTime.getHours().toString().padStart(2, "0")}:${startTime
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
      startTime.setHours(startTime.getHours() + 1);
    }

    return times;
  };

  const handleConfirm = async () => {
    if (!userId || !_id) {
      setError("User ID or Procedure ID is missing");
      return;
    }

    const selectedDateTime = new Date(tempDate);
    const [hours, minutes] = tempTime.split(":");
    selectedDateTime.setHours(hours);
    selectedDateTime.setMinutes(minutes);

    setSelectedDateTime(selectedDateTime);
    setOpened(false);
    setIsRegistered(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/procedures/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          procedureId: _id,
          bookingDatetime: selectedDateTime,
          status: 'pending'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error registering to procedure");
      } else {
        const data = await response.json();
        const registeredProcedures = JSON.parse(localStorage.getItem("registeredProcedures")) || [];
        registeredProcedures.push(data);
        localStorage.setItem("registeredProcedures", JSON.stringify(registeredProcedures));
        setError("");
      }
    } catch (error) {
      setError("Error creating booking: " + error.message);
    }
  };

  const handleCancel = () => {
    setSelectedDateTime(null);
    setIsRegistered(false);
    setError("");

    const registeredProcedures = JSON.parse(localStorage.getItem("registeredProcedures")) || [];
    const updatedProcedures = registeredProcedures.filter((p) => p.procedureId !== _id);
    localStorage.setItem("registeredProcedures", JSON.stringify(updatedProcedures));
  };

  return (
    <>
      <Card shadow="sm" padding="lg" className={styles.card}>
        <Card.Section>
          <Image src={picture} alt={name} className={styles.cardImage} />
        </Card.Section>

        <Group position="apart" mt={"md"}>
          <Text className={styles.cardTitle}>{name}</Text>
          <Badge className={styles.cardBadge}>{category}</Badge>
        </Group>

        <Group position="apart" mt={10}>
          <Text>Rating</Text>
          <Rating value={rating} readOnly />
        </Group>

        {selectedDateTime && (
          <Group className={styles.selectedDateTimeGroup}>
            <Text>Selected Date and Time</Text>
            <Text className={styles.selectedDateTimeText}>
              {selectedDateTime.toLocaleString()}
            </Text>
          </Group>
        )}

        <Button
          className={styles.cardButton}
          onClick={isRegistered ? handleCancel : () => setOpened(true)}
        >
          {isRegistered ? "Cancel My Registration" : "Register to Procedure"}
        </Button>
      </Card>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select Date and Time"
      >
        <DatePicker
          value={tempDate}
          onChange={setTempDate}
          placeholder="Pick a date"
          label="Select a date for your procedure"
          withCellHover
        />
        {tempDate && (
          <Select
            value={tempTime}
            onChange={setTempTime}
            placeholder="Pick a time"
            label="Select a time for your procedure"
            data={availableTimes}
            mt="md"
          />
        )}
        {tempDate && tempTime && (
          <Group position="center" mt="md">
            <Text>Selected Date: {tempDate.toLocaleDateString()}</Text>
            <Text>Selected Time: {tempTime}</Text>
          </Group>
        )}
        <Button
          className={styles.modalButton}
          onClick={handleConfirm}
          disabled={!tempDate || !tempTime}
        >
          Confirm Date and Time
        </Button>
        {error && <Text color="red">{error}</Text>}
      </Modal>
    </>
  );
};

export default ProcedureCard;
