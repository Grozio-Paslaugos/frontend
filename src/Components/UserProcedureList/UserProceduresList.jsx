/** @format */

import { Container, Title, Divider, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./UserProceduresList.module.css";
import axios from "axios";

const UserProceduresList = () => {
  const navigate = useNavigate();

  const [procedures, setProcedures] = useState([]);

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const response = await axios.get("/api/procedures");
        setProcedures(response.data);
      } catch (error) {
        console.error("Error fetching procedures:", error);
      }
    };

    fetchProcedures();
  }, []);

  const totalRatings = ratings.length;
  
  const averageRating = totalRatings > 0 ? ratings.reduce((acc, rating) => acc + rating, 0) / totalRatings : 0;

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
