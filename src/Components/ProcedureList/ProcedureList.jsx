import React from "react";
import { Group } from "@mantine/core";
import ProcedureCard from "../ProcedureCard/ProcedureCard";

function ProceduresList({ procedures }) {
  return (
    <Group spacing="md">
      {procedures.map((procedure, index) => (
        <ProcedureCard key={index} procedure={procedure} />
      ))}
    </Group>
  );
}

export default ProceduresList;
