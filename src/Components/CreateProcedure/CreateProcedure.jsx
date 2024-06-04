import "./CreateProcedure.module.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Divider,
  TextInput,
  Input,
  InputBase,
  Combobox,
  useCombobox,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import classes from "./CreateProcedure.module.css";
import { useState, useEffect } from "react";

const CreateProcedure = () => {
  const [dropdownValue, setDropdownValue] = useState("Not Selected");
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
  });
  const categories = [
    "Dental Checkup",
    "Eye Exam",
    "Annual Physical",
    "Blood Test",
  ];
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const options = categories.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));
  const postProcedure = async (procedure) => {
    const token = localStorage.getItem("token");
    console.log(
      procedure.Category,
      procedure.Date,
      procedure.Image,
      procedure.Name
    );
    try {
      fetch("http://localhost:5000/api/procedures/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: procedure.Name,
          category: procedure.Category,
          date: procedure.Date,
          image: procedure.Image,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  function formHandler(values, dropdownValue) {
    const procedure = values;
    procedure.Category = dropdownValue;
    procedure.Date = procedure.Date.toString();
    form.reset();
    console.log(procedure); // Final Result
    postProcedure(procedure);
  }
  return (
    <Container fluid>
      <Title align="center" mb="lg">
        Create Procedure
      </Title>
      <Divider className={classes.divider} mt="md" />
      <Container>
        <form
          onSubmit={form.onSubmit((values) =>
            formHandler(values, dropdownValue)
          )}
        >
          <TextInput
            placeholder="Procedure Name"
            label="Procedure name"
            withAsterisk
            key={form.key("Name")}
            {...form.getInputProps("Name")}
            required
          />
          <Combobox
            label="Category"
            withAsterisk
            required
            store={combobox}
            onOptionSubmit={(val) => {
              setDropdownValue(val);
              combobox.closeDropdown();
            }}
          >
            <Combobox.Target>
              <InputBase
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                rightSectionPointerEvents="none"
                onClick={() => combobox.toggleDropdown()}
              >
                {dropdownValue || (
                  <Input.Placeholder>Select category</Input.Placeholder>
                )}
              </InputBase>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          <DateTimePicker
            label="Date"
            placeholder="Pick date and time"
            withAsterisk
            key={form.key("Date")}
            {...form.getInputProps("Date")}
            required
          />
          <TextInput
            placeholder="Procedure Image"
            label="Procedure image"
            withAsterisk
            key={form.key("Image")}
            {...form.getInputProps("Image")}
            required
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Container>
    </Container>
  );
};

export default CreateProcedure;
