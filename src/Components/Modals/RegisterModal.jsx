import FormModal from "./FormModal";
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export default function RegisterModal({ opened, onClose }) {
  const navigate = useNavigate();
  const [openedmodal, { open, close }] = useDisclosure(false);
  const [error, setError] = useState("");

  const handleRegister = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }
      const data = await response.json();
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
    }
  };
  const handleClose = () => {
    navigate("/");
  };
  const fields = [
    {
      name: "name",
      label: "Name:",
      placeholder: "Type your name here...",
      required: true,
    },
    {
      name: "email",
      label: "Email:",
      placeholder: "Type your email here...",
      required: true,
      type: "email",
    },
    {
      name: "password",
      label: "Password:",
      placeholder: "Type your password here...",
      required: true,
      type: "password",
    },
    {
      name: "phone",
      label: "Phone:",
      placeholder: "Type your phone number here...",
      required: true,
      type: "phone",
    },
  ];

  return (
    <FormModal
      opened={open}
      onClose={handleClose}
      title="Register"
      fields={fields}
      onSubmit={handleRegister}
    />
  );
}
