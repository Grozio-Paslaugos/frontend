import UserProceduresList from "../UserProcedureList/UserProceduresList";
import ProceduresList from "../ProcedureList/ProcedureList";
import { useState } from "react";
import { TextInput } from "@mantine/core";
import styles from "./Home.module.css";

const procedures = [
  {
    name: "Knee Surgery",
    category: "Orthopedics",
    picture: "https://via.placeholder.com/160",
    rating: 4.5,
  },
  {
    name: "Root Canal",
    category: "Dentistry",
    picture: "https://via.placeholder.com/160",
    rating: 4.2,
  },
  {
    name: "Cataract Surgery",
    category: "Ophthalmology",
    picture: "https://via.placeholder.com/160",
    rating: 4.8,
  },
];
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.search}
      />
      <ProceduresList procedures={procedures} />
    </>
  );
}
