/** @format */

import { useState, useEffect } from "react";
import {
  HoverCard,
  Group,
  Button,
  Text,
  SimpleGrid,
  Divider,
  Center,
  Box,
  Burger,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

const Header = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
  //   useDisclosure(false);
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [user, setUser] = useState(null);

  const handleCategorySelect = () => {
    setSelectedCategory();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:5000/api/categories/categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Error fetching categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const links = categories?.map((category) => (
    <UnstyledButton
      className={classes.subLink}
      key={category}
      onClick={() => handleCategorySelect(category)}
    >
      <Text size="sm" fw={500}>
        {category}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Box pb={40} mt={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            <button
              className={`${classes.link} ${classes.linkButton}`}
              href=""
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <button
                  href="#"
                  className={`${classes.link} ${classes.linkButton}`}
                >
                  <Center inline>
                    <Box component="span" mr={5}>
                      Categories
                    </Box>
                    <IconChevronDown
                      style={{ width: "1rem", height: "1rem" }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </button>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Categories</Text>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={1} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
              {user !== null && user.role === "user" && (
                <Button
                  className={`${classes.linkButton}`}
                  onClick={() => navigate("/my-procedures")} // Navigate to UserProceduresList
                  size="xs"
                  href=""
                  variant="link"
                >
                  My Procedures
                </Button>
              )}
              {user !== null && user.role === "admin" && (
                <Button
                  className={`${classes.linkButton}`}
                  onClick={() => navigate("/create-procedure")} // Navigate to createProcedure
                  size="xs"
                  variant="link"
                >
                  Create Procedure
                </Button>
              )}
            </HoverCard>
          </Group>

          <Group visibleFrom="sm">
            {user === null && (
              <Button
                className={`${classes.linkButton}`}
                onClick={() => navigate("/login")}
                variant="default"
              >
                Log in
              </Button>
            )}
            {user === null && (
              <Button
                className={`${classes.linkButton}`}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            )}
            {user !== null && (
              <Button
                className={`${classes.linkButton}`}
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            )}
          </Group>

          {/* <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          /> */}
        </Group>
        <Divider className={classes.divider} mt="md" /> {}
      </header>
    </Box>
  );
};

export default Header;
