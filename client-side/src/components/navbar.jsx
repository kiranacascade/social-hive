// import {
//     Button,
//     Flex,
//     VStack,
//     Text,
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// //importan redux
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/userSlice";

// export const Navbar = () => {
//     const { firstName, isAdmin } = useSelector(
//         (state) => state.userSlice.value
//     );
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const token = localStorage.getItem("token");

//     const onSignOut = () => {
//         dispatch(logout());
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     const adminPage = () => {
//         if (isAdmin) {
//             navigate("/admin");
//         } else {
//             alert("Restricted Access: Admin Only");
//         }
//     };

//     return (
//         <VStack
//             justify="space-evenly"
//             align="flex-end"
//             shadow="base"
//             bgColor="gray.50"
//             w="100vw"
//             h="16"
//         >
//             <Flex justify="space-evenly" align="center" mr="4">
//                 {token ? (
//                     <>
//                         <Menu>
//                             <Button
//                                 as={MenuButton}
//                                 mr="2"
//                                 colorScheme="teal"
//                                 variant="solid"
//                             >
//                                 Menu
//                             </Button>
//                             <MenuList>
//                                 <MenuItem onClick={() => navigate("/profile")}>
//                                     Profile
//                                 </MenuItem>
//                                 <MenuItem>Setting</MenuItem>
//                                 <MenuItem onClick={adminPage}>Admin</MenuItem>
//                                 <MenuItem onClick={onSignOut}>
//                                     Sign Out
//                                 </MenuItem>
//                             </MenuList>
//                         </Menu>
//                         <Text as="b">Welcome, {firstName}</Text>
//                     </>
//                 ) : (
//                     <>
//                         <Button
//                             onClick={() => navigate("/login")}
//                             rounded={"full"}
//                             bg={"blue.400"}
//                             color={"white"}
//                             _hover={{
//                                 bg: "blue.500",
//                             }}
//                             mr="2"
//                         >
//                             Login
//                         </Button>
//                         <Button
//                             mr="2"
//                             rounded={"full"}
//                             onClick={() => navigate("/register")}
//                         >
//                             Register
//                         </Button>
//                     </>
//                 )}
//             </Flex>
//         </VStack>
//     );
// };

import React, { ReactNode } from "react";
import { IconButton, Box, CloseButton, Flex, Icon, useColorModeValue, Link, Drawer, DrawerContent, Text, useDisclosure, BoxProps, FlexProps, SidebarContent } from "@chakra-ui/react";
// import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu } from "react-icons/fi";
// import { IconType } from "react-icons";
import { ReactText } from "react";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      {/* <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} /> */}
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <Box bg={useColorModeValue("white", "gray.900")} borderRight="1px" borderRightColor={useColorModeValue("gray.200", "gray.700")} w={{ base: "full", md: 60 }} pos="fixed" h="full">
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
              <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Logo
              </Text>
              <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>

            <Link href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
              <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                  bg: "cyan.400",
                  color: "white",
                }}
              >
                {/* <Icon
                  mr="4"
                  fontSize="16"
                  _groupHover={{
                    color: "white",
                  }}
                  as={icon}
                /> */}
              </Flex>
            </Link>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }
// const LinkItems: Array<LinkItemProps> = [
//   { name: "Home", icon: FiHome },
//   { name: "Trending", icon: FiTrendingUp },
//   { name: "Explore", icon: FiCompass },
//   { name: "Favourites", icon: FiStar },
//   { name: "Settings", icon: FiSettings },
// ];

// export default function SimpleSidebar({ children }: { children: ReactNode }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   return (
//     <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
//       <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
//       <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
//         <DrawerContent>
//           <SidebarContent onClose={onClose} />
//         </DrawerContent>
//       </Drawer>
//       {/* mobilenav */}
//       <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
//       <Box ml={{ base: 0, md: 60 }} p="4">
//         {children}
//       </Box>
//     </Box>
//   );
// }

// interface SidebarProps extends BoxProps {
//   onClose: () => void;
// }

// const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
//   return (
//     <Box bg={useColorModeValue("white", "gray.900")} borderRight="1px" borderRightColor={useColorModeValue("gray.200", "gray.700")} w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
//       <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
//         <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
//           Logo
//         </Text>
//         <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
//       </Flex>
//       {LinkItems.map((link) => (
//         <NavItem key={link.name} icon={link.icon}>
//           {link.name}
//         </NavItem>
//       ))}
//     </Box>
//   );
// };

// interface NavItemProps extends FlexProps {
//   icon: IconType;
//   children: ReactText;
// }
// const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
//   return (
// <Link href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
//   <Flex
//     align="center"
//     p="4"
//     mx="4"
//     borderRadius="lg"
//     role="group"
//     cursor="pointer"
//     _hover={{
//       bg: "cyan.400",
//       color: "white",
//     }}
//     {...rest}
//   >
//     {icon && (
//       <Icon
//         mr="4"
//         fontSize="16"
//         _groupHover={{
//           color: "white",
//         }}
//         as={icon}
//       />
//     )}
//     {children}
//   </Flex>
// </Link>
//   );
// };
