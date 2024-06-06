import React from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Rating,
  useMantineTheme,
} from "@mantine/core";

const ProcedureCard = ({ procedure }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ height: "350px", width: "100%" }}
    >
      <Card.Section>
        <Image
          src={procedure.image}
          alt="https://us-tuna-sounds-images.voicemod.net/78f23c41-369a-4769-9568-7aae749c4e06-1704762972412.jpg"
          height={250}
          width={250}
          style={{ objectFit: "fill" }}
        />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{procedure.name}</Text>
        <Text fw={500}>{procedure.category}</Text>
        <Text fw={500}>{procedure.date}</Text>
      </Group>
    </Card>
  );
};

export default ProcedureCard;
