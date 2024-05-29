import React from "react";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RegisterModal from "../Modals/RegisterModal";

export default function RegisterButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="sm" variant="default" color="black">
        Register
      </Button>
      <RegisterModal opened={opened} onClose={close} />
    </>
  );
}
