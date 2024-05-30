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
  const theme = useMantineTheme();
  const { name, category, picture, rating } = procedure;

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 340 }}>
      <Card.Section>
        <Image src={picture} alt={name} height={160} />
      </Card.Section>

      <Group position="apart" mt={"md"}>
        <Text weight={500}>{name}</Text>
        <Badge color="pink" variant="light">
          {category}
        </Badge>
      </Group>

      <Group position="apart" mt={10}>
        <Text>Rating</Text>
        <Rating value={rating} readOnly />
      </Group>
    </Card>
  );
};

export default ProcedureCard;
