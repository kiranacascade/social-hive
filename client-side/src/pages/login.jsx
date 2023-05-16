import { Box, Stack, Heading, Text, Container, Input, Button, SimpleGrid, Image, InputGroup, InputRightElement, FormControl } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import loginIllustration from "../assets/login.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorAccess from "../components/errorAccess";

//importan redux
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { HomePage } from "./home";

const url = "http://localhost:2000/auth/login";
const token = localStorage.getItem("token");

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      const data = {
        emailOrUsername: document.getElementById("emailOrUsername").value,
        password: document.getElementById("password").value,
      };

      const result = await axios.post(url, data);

      console.log(result.data.data);

      dispatch(
        login({
          id: result.data.data.id,
          username: result.data.data.username,
          email: result.data.data.email,
          is_verified: result.data.data.is_verified,
        })
      );

      //untuk mereset form
      document.getElementById("emailOrUsername").value = "";
      document.getElementById("password").value = "";

      //akan menerima token saat login
      localStorage.setItem("token", result.data.token);

      //memberikan alert ketika berhasil login
      alert(result.data.message);

      //setelah menerima token akan di navigate ke home
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);

      //memberikan alert error ketika gagal login
      alert(err.response.data.message);
    }
  };
  return (
    <>
      {token ? (
        <ErrorAccess />
      ) : (
        <Box position={"relative"}>
          <Container justifyContent={"center"} alignItems={"center"} as={SimpleGrid} maxW={"7xl"} columns={{ base: 1, md: 2 }} py={{ base: 10, sm: 20, lg: 32 }}>
            <Stack ml={20} spacing={{ base: 10, md: 20 }}>
              <Image alt={"Hero Image"} fit={"cover"} align={"center"} w={"400px"} src={loginIllustration} />
            </Stack>
            <Stack bg={"gray.50"} rounded={"xl"} p={{ base: 4, sm: 6, md: 8 }} spacing={{ base: 8 }} maxW={{ md: "md" }}>
              <Stack spacing={4} justifyContent={"center"} alignItems={"center"}>
                <Heading color={"gray.800"} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}>
                  Get back in
                  <Text as={"span"} color={"orange.400"}>
                    !
                  </Text>
                </Heading>
              </Stack>
              <Box as={"form"} mt={10}>
                <Stack spacing={4}>
                  <FormControl id="emailOrUsername" isRequired>
                    <Input
                      placeholder="email or username"
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
                </Stack>
                <Button onClick={onLogin} fontFamily={"heading"} mt={8} w={"full"} colorScheme={"orange"} bg={"orange.400"} _hover={{ bg: "orange.500" }} color={"white"}>
                  Sign in
                </Button>
                <Box as={"form"} mt={10}>
                  <Stack spacing={4}>
                    <Text textAlign="center" color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                      Don't have a SocialHive account?
                    </Text>

                    <Button onClick={() => navigate("/register")} fontFamily={"heading"} variant="outline" colorScheme="orange">
                      Register now
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
};
