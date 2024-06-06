import React, { useEffect, useState } from "react";
import ProcedureCard from "../ProcedureCard/ProcedureCard";
import { Container, Title, Divider, TextInput } from "@mantine/core";
import styles from "./AllProcedures.module.css";

const AllProcedures = () => {
  const [procedures, setProcedures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/procedures", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProcedures(data);
        } else {
          console.error("Failed to fetch procedures", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching procedures:", error);
        setError(error.message);
      }
    };
    fetchProcedures();
  }, []);

  return (
    <Container fluid>
      <Title align="center" mb="lg">
        All procedures
      </Title>
      <div className={styles.proceduresList}>
        {procedures.length > 0 ? (
          procedures.map((procedure) => (
            <div key={procedure._id}>
              <ProcedureCard procedure={procedure} />
            </div>
          ))
        ) : (
          <p>No procedures found</p>
        )}
      </div>
    </Container>
  );
};

export default AllProcedures;
