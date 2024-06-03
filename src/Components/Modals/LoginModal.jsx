import FormModal from "./FormModal";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function LoginModal({ opened, onClose }) {
  const [openedmodal, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (formData) => {
    setEmail(formData.email);
    setPassword(formData.password);
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      const { user, token } = data;
      if (!user) {
        throw new Error("User data is missing in response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("Login error", error);
      setError("Failed to login. Please check your credentials.");
    }
  };
  const fields = [
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
  ];

  return (
    <FormModal
      opened={open}
      onClose={close}
      title="Login"
      fields={fields}
      onSubmit={handleLogin}
    />
  );
}
