/** @format */

import React, { useState } from "react";
import {
  Container,
  Title,
  Divider,
  TextInput,
  Group,
  Card,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./UserProceduresList.module.css";
import { useProcedures } from "./ProceduresContext";

const UserProceduresList = () => {
  const navigate = useNavigate();
  const { registeredProcedures } = useProcedures();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProcedures = registeredProcedures.filter((procedure) =>
    procedure.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid>
      <a className={classes.link} href="/" onClick={() => navigate("/")}>
        Home
      </a>
      <Title align="center" mb="lg">
        My Procedures
      </Title>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        className={classes.search}
      />
      <div className={classes.proceduresList}>
        {filteredProcedures.length > 0 ? (
          filteredProcedures.map((procedure) => (
            <Card
              key={procedure.id}
              shadow="sm"
              padding="lg"
              className={classes.card}
            >
              <Group position="apart">
                <Text className={classes.cardTitle}>{procedure.name}</Text>
                <Text className={classes.cardDateTime}>
                  {new Date(procedure.selectedDateTime).toLocaleString()}
                </Text>
              </Group>
            </Card>
          ))
        ) : (
          <p>No procedures found</p>
        )}
      </div>
      <Divider className={classes.divider} mt="md" />
    </Container>
  );
};

export default UserProceduresList;
