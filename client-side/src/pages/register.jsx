// import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link } from "@chakra-ui/react";
// import { useState } from "react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const RegistrationForm = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const onRegister = async () => {
//     try {
//       const data = {
//         username: document.getElementById("username").value,
//         email: document.getElementById("email").value,
//         password: document.getElementById("password").value,
//         passwordConfirmation: document.getElementById("confirmation").value,
//       };

//       const url = "http://localhost:2000/auth/register";
//       const result = await axios.post(url, data);

//       //untuk mereset kembali form

//       document.getElementById("username").value = "";
//       document.getElementById("email").value = "";
//       document.getElementById("password").value = "";
//       document.getElementById("confirmation").value = "";

//       //memberikan alert
//       console.log(result);
//       alert(result.data.message);

//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     } catch (err) {
//       alert(err.response.data.message);
//     }
//   };

//   return (
//     <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
//       <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={"500px"}>
//         <Stack align={"center"}>
//           <Heading fontSize={"4xl"} textAlign={"center"}>
//             Sign up
//           </Heading>
//         </Stack>
//         <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
//           <Stack spacing={4}>
//             <FormControl id="username" isRequired>
//               <FormLabel>Username</FormLabel>
//               <Input type="text" />
//             </FormControl>

//             <FormControl id="email" isRequired>
//               <FormLabel>Email address</FormLabel>
//               <Input type="email" />
//             </FormControl>
//             <FormControl id="password" isRequired>
//               <FormLabel>Password</FormLabel>
//               <InputGroup>
//                 <Input type={showPassword ? "text" : "password"} />
//                 <InputRightElement h={"full"}>
//                   <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
//                     {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                   </Button>
//                 </InputRightElement>
//               </InputGroup>
//             </FormControl>
//             <FormControl id="confirmation" isRequired>
//               <FormLabel>Password Confrimation</FormLabel>
//               <InputGroup>
//                 <Input type={showPassword ? "text" : "password"} />
//                 <InputRightElement h={"full"}>
//                   <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
//                     {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                   </Button>
//                 </InputRightElement>
//               </InputGroup>
//             </FormControl>
//             <Stack spacing={10} pt={2}>
//               <Button
//                 loadingText="Submitting"
//                 size="lg"
//                 bg={"blue.400"}
//                 color={"white"}
//                 _hover={{
//                   bg: "blue.500",
//                 }}
//                 onClick={onRegister}
//               >
//                 Sign up
//               </Button>
//             </Stack>
//             <Stack pt={6}>
//               <Text align={"center"}>
//                 <Link color={"blue.400"} onClick={() => navigate("/")}>
//                   Back to home
//                 </Link>
//               </Text>
//             </Stack>
//           </Stack>
//         </Box>
//       </Stack>
//     </Flex>
//   );
// };

import { Box, Stack, Heading, Text, Container, Input, Button, SimpleGrid, Image, InputGroup, InputRightElement, FormControl } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import registerIllustration from "../assets/register.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);

  const onRegister = async () => {
    try {
      const data = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        passwordConfirmation: document.getElementById("passwordConfirmation").value,
      };

      const url = "http://localhost:2000/auth/register";
      const result = await axios.post(url, data);

      // console.log(result.data.data);

      //untuk mereset kembali form
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("passwordConfirmation").value = "";

      // memberikan alert
      console.log(result);
      alert(result.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };
  return (
    <Box position={"relative"}>
      <Container justifyContent={"center"} alignItems={"center"} as={SimpleGrid} maxW={"7xl"} columns={{ base: 1, md: 2 }} py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack ml={20} spacing={{ base: 10, md: 20 }}>
          <Image alt={"Hero Image"} fit={"cover"} align={"center"} w={"400px"} src={registerIllustration} />
        </Stack>
        <Stack bg={"gray.50"} rounded={"xl"} p={{ base: 4, sm: 6, md: 8 }} spacing={{ base: 8 }} maxW={{ md: "md" }}>
          <Stack spacing={4} justifyContent={"center"} alignItems={"center"}>
            <Heading color={"gray.800"} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
              Register now
              <Text as={"span"} color={"orange.400"}>
                !
              </Text>
            </Heading>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <Input
                  placeholder="username"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.800"}
                  _placeholder={{
                    color: "gray.400",
                  }}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <Input
                  placeholder="email"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.800"}
                  _placeholder={{
                    color: "gray.400",
                  }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.800"}
                    _placeholder={{
                      color: "gray.400",
                    }}
                  />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="passwordConfirmation" isRequired>
                <InputGroup>
                  <Input
                    type={showPasswordConf ? "text" : "password"}
                    placeholder="password confirmation"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.800"}
                    _placeholder={{
                      color: "gray.400",
                    }}
                  />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={() => setShowPasswordConf((showPasswordConf) => !showPasswordConf)}>
                      {showPasswordConf ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
            <Button onClick={onRegister} fontFamily={"heading"} mt={8} w={"full"} colorScheme={"orange"} bg={"orange.400"} _hover={{ bg: "orange.500" }} color={"white"}>
              Sign up
            </Button>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Text textAlign="center" color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                  Already have a SocialHive account?
                </Text>

                <Button onClick={() => navigate("/login")} fontFamily={"heading"} variant="outline" colorScheme="orange">
                  Sign in
                </Button>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
