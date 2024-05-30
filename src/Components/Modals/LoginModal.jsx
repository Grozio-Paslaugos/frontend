import FormModal from "./FormModal";
import { useDisclosure } from "@mantine/hooks";

export default function LoginModal({ opened, onClose }) {
  const [openedmodal, { open, close }] = useDisclosure(false);
  const handleLogin = (formData) => {
    console.log("Login data:", formData);
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
