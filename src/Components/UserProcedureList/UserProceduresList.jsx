import React, { useState, useEffect } from "react";
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

const UserProceduresList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcedures = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await fetch(`http://localhost:5000/api/procedures/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch procedures');
        }
        const data = await response.json();
        setProcedures(data.filter(procedure => procedure.status === 'approved'));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProcedures();
  }, []);

  const filteredProcedures = procedures.filter((procedure) =>
    procedure.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                  {new Date(procedure.bookingDatetime).toLocaleString()}
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
