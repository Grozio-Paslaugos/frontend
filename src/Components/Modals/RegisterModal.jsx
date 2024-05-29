import FormModal from "./FormModal";

export default function RegisterModal({ opened, onClose }) {
  const handleRegister = (formData) => {
    console.log("Register data:", formData);
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
  ];

  return (
    <FormModal
      opened={opened}
      onClose={onClose}
      title="Register"
      fields={fields}
      onSubmit={handleRegister}
    />
  );
}
