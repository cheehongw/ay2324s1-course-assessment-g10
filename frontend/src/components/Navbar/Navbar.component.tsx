import React from "react";
import {
  Flex,
  Button,
  HStack,
  chakra,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAdmin, selectIsAuthenticated } from "../../reducers/authSlice";
import LogoutButton from "../auth/LogoutButton";
import MatchMakeBtn from "../MatchMakeBtn/MatchMakeBtn.component";

export const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  return (
    <chakra.header boxShadow={"md"} minH="10vh" zIndex="999">
      <Flex w="100%" py="2vh" pl="40" pr="6" align={"center"} justify={"space-between"}>
        <HStack spacing="8px">
          <Link to="/">
            <Button colorScheme="linkedin" variant="outline">
              Peer Prep
            </Button>
          </Link>


          {isAdmin ? (
            <Box rounded='md'bg='pink'>
              <Link to="/bank">
                <Button variant="ghost" colorScheme="red">Admin Question Bank</Button>
              </Link>
              <Link to="/create">
                <Button variant="ghost" colorScheme="red">Create</Button>
              </Link>
            </Box>
          ) : (
            <></>
          )}
        </HStack>

        <HStack>
          <MatchMakeBtn />
          {isAuthenticated ? (
            <>
              <LogoutButton />
              <Button colorScheme="blue">View Account</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </chakra.header>
  );
};
