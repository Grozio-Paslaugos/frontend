import { useState } from "react";
import { Modal, TextInput, Button } from "@mantine/core";

export default function FormModal({
  opened,
  onClose,
  title,
  fields,
  onSubmit,
}) {
  const [formValues, setFormValues] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title} size="lg">
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <TextInput
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            mt="sm"
            name={field.name}
            value={formValues[field.name]}
            onChange={handleChange}
            required={field.required}
            type={field.type}
            data-autofocus={index === 0 ? true : undefined}
          />
        ))}
        <Button type="submit" variant="default" mt="md" mb="lg">
          Submit
        </Button>
      </form>
    </Modal>
  );
}
