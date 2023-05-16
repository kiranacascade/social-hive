import React from "react";
import { Box, Flex, Icon, useColorModeValue, Link, Text, Image, Stack, HStack, Spacer } from "@chakra-ui/react";
import logo from "../assets/logo.png";

import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { ContentDetailCard } from "../components/postDetailCard";
import { PostForm } from "../components/postForm";

//importan redux
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

export const PostDetailPage = () => {
  return (
    <Flex direction={"row"} spacing="40" minH="100vh" bg={useColorModeValue("orange.100", "gray.900")}>
      <Flex flex="2">
        <SidebarContent />
      </Flex>

      <Flex flex="7" direction="column" p="4">
        <Box>
          <ContentDetailCard />
          {/* <ContentCard />
          <ContentCard /> */}
          {/* <ContentCard /> */}
        </Box>

        {/* <Box pt="4" pr="6" pos="fixed" right="0" top="0">
          <PostForm />
        </Box> */}
      </Flex>
    </Flex>
  );
};

const SidebarContent = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };
  return (
    <Box bg={useColorModeValue("white", "gray.900")} borderRight="1px" borderRightColor={useColorModeValue("gray.200", "gray.700")} w={{ base: "full", md: 60 }} pos="fixed" h="full">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image alt={"Hero Image"} fit={"cover"} align={"center"} src={logo} w={"200px"} />
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text> */}
      </Flex>
      <Link href="/" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex align="center" p="4" mx="4" borderRadius="md" role="group" cursor="pointer" _hover={{ bg: "orange.300", color: "white" }}>
          <Icon mr="4" fontSize="16" _groupHover={{ color: "white" }} as={FiHome} />
          Home
        </Flex>
      </Link>

      <Link href="/hive" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex align="center" p="4" mx="4" borderRadius="md" role="group" cursor="pointer" _hover={{ bg: "orange.300", color: "white" }}>
          <Icon mr="4" fontSize="16" _groupHover={{ color: "white" }} as={FiUser} />
          Profile
        </Flex>
      </Link>

      <Link href="/hive" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex align="center" p="4" mx="4" borderRadius="md" role="group" cursor="pointer" _hover={{ bg: "orange.300", color: "white" }}>
          <Icon mr="4" fontSize="16" _groupHover={{ color: "white" }} as={FiSettings} />
          Settings
        </Flex>
      </Link>

      <Link href="/" onClick={onLogout} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
        <Flex align="center" p="4" mx="4" borderRadius="md" role="group" cursor="pointer" _hover={{ bg: "orange.300", color: "white" }}>
          <Icon mr="4" fontSize="16" _groupHover={{ color: "white" }} as={FiLogOut} />
          Logout
        </Flex>
      </Link>
    </Box>
  );
};
