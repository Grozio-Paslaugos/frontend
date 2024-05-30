/** @format */

import React from "react";
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
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

const Header = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

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
                  <Button
                    className={`${classes.subLink} ${classes.linkButton}`} // Apply the button class
                    onClick={() => navigate(`/category/1`)}
                    size="sm"
                    style={{ fontWeight: 500 }}
                  >
                    Category 1
                  </Button>
                  <Button
                    className={`${classes.subLink} ${classes.linkButton}`} // Apply the button class
                    onClick={() => navigate(`/category/2`)}
                    size="sm"
                    style={{ fontWeight: 500 }}
                  >
                    Category 2
                  </Button>
                </SimpleGrid>
              </HoverCard.Dropdown>
              <Button
                className={`${classes.linkButton}`}
                onClick={() => navigate("/my-procedures")} // Navigate to UserProceduresList
                size="xs"
                variant="link"
              >
                My Procedures
              </Button>
              <Button
                className={`${classes.linkButton}`}
                onClick={() => navigate("/create-procedure")} // Navigate to createProcedure
                size="xs"
                variant="link"
              >
                Create Procedure
              </Button>
            </HoverCard>
          </Group>

          <Group visibleFrom="sm">
            <Button
              className={`${classes.linkButton}`}
              onClick={() => navigate("/login")}
              variant="default"
            >
              Log in
            </Button>
            <Button
              className={`${classes.linkButton}`}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
        <Divider className={classes.divider} mt="md" /> {}
      </header>
    </Box>
  );
};

export default Header;
