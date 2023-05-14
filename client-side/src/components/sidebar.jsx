import React from "react";
import { Box, Flex, Icon, useColorModeValue, Link, Text } from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiSettings } from "react-icons/fi";
import { ContentCard } from "../components/card";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Profile", icon: FiTrendingUp },
  { name: "Settings", icon: FiSettings },
];

export const SimpleSidebar = ({ children }) => {
  return (
    // <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
    //   <SidebarContent display={{ base: "none", md: "block" }} />
    //   <Box ml={{ base: 0, md: 60 }} p="4">
    //     {children}
    //   </Box>
    //   <Box p="10" m="" flex="1">
    //     <ContentCard />
    //     <ContentCard />
    //     {/* <ContentCard /> */}
    //   </Box>
    // </Box>
    <Flex minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent display={{ base: "none", md: "block" }} />
      <Flex flex="9" ml={{ base: 0, md: 60 }} p="4">
        <Box flex="1">{children}</Box>
        <Box flex="10">
          <ContentCard />
          <ContentCard />
          <ContentCard />
          {/* <ContentCard /> */}
        </Box>
      </Flex>
    </Flex>
  );
};

const SidebarContent = ({ ...rest }) => {
  return (
    <Box bg={useColorModeValue("white", "gray.900")} borderRight="1px" borderRightColor={useColorModeValue("gray.200", "gray.700")} w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "orange.300",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
