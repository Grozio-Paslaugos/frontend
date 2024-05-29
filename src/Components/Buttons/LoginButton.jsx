import React from "react";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import LoginModal from "../Modals/LoginModal";

export default function LoginButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="sm" variant="default" color="black">
        Login
      </Button>
      <LoginModal opened={opened} onClose={close} />
    </>
  );
}
