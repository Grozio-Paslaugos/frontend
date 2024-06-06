import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import FormModal from "./FormModal";

export default function LoginModal({ opened, onClose }) {
  const [openedModal, { open, close }] = useDisclosure();

  const navigate = useNavigate();

  useEffect(() => {
    if (opened) {
      open();
    } else {
      close();
    }
  }, [opened, open, close]);

  const handleLogin = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      const { user, token } = data;

      if (!user || !token) {
        throw new Error("User data or token is missing in response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Fetch and store registered procedures
      const proceduresResponse = await fetch(`http://localhost:5000/api/procedures/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (proceduresResponse.ok) {
        const procedures = await proceduresResponse.json();
        localStorage.setItem("registeredProcedures", JSON.stringify(procedures));
      } else {
        console.error("Failed to fetch registered procedures");
      }

      onClose(); // Close the modal
      navigate("/");
    } catch (error) {
      alert("Failed to login. Please check your credentials.");
      console.error("Login error", error);
    }
  };

  const handleClose = () => {
    onClose();
    navigate("/");
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
      opened={openedModal}
      onClose={handleClose}
      title="Login"
      fields={fields}
      onSubmit={handleLogin}
    />
  );
}
