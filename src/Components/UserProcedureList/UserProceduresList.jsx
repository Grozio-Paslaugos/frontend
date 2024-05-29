/** @format */

import { Container, Title, Divider, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./UserProceduresList.module.css";

const UserProceduresList = () => {
  const navigate = useNavigate();

  // Updated dummy data for demonstration
  const procedures = [
    { _id: 1, description: "Dental Checkup" },
    { _id: 2, description: "Eye Exam" },
    { _id: 3, description: "Annual Physical" },
    { _id: 4, description: "Blood Test" },
  ];

  const searchQuery = "";
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
        onChange={() => {}}
        className={classes.search} // Assuming you have defined styles for search in your CSS module
      />
      <div className={classes.proceduresList}>
        {procedures.length > 0 ? (
          procedures.map((procedure) => (
            <div key={procedure._id}>
              {console.log(procedure)}
              <div>{procedure.description}</div>
            </div>
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
