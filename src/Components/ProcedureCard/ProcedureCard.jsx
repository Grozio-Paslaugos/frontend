/** @format */

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
  const { name, category, picture, rating } = procedure;
  const [opened, setOpened] = useState(false);
  const [tempDate, setTempDate] = useState(null);
  const [tempTime, setTempTime] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (tempDate) {
      const times = generateAvailableTimes();
      setAvailableTimes(times);
    }
  }, [tempDate]);

  const generateAvailableTimes = () => {
    const times = [];
    let startTime = new Date(tempDate);
    startTime.setHours(8, 30, 0, 0); // Set start time to 08:30 AM

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

  const handleConfirm = () => {
    const selectedDateTime = new Date(tempDate);
    const [hours, minutes] = tempTime.split(":");
    selectedDateTime.setHours(hours);
    selectedDateTime.setMinutes(minutes);

    setSelectedDateTime(selectedDateTime);
    setOpened(false);
    setIsRegistered(true);

    // Further logic for confirming the date and time selection can go here
    console.log("Confirmed date and time:", selectedDateTime);
  };

  const handleCancel = () => {
    setSelectedDateTime(null);
    setIsRegistered(false);
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
      </Modal>
    </>
  );
};

export default ProcedureCard;
