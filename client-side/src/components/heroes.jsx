import { Container, Stack, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import connect from "../assets/connect.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function CallToActionWithVideo() {
  const navigate = useNavigate();
  return (
    <Container maxW={"7xl"} backgroundColor={""} mx={10}>
      <Stack align={"center"} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }} direction={{ base: "column", md: "row" }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Image alt={"Hero Image"} fit={"cover"} align={"center"} src={logo} w={"200px"} />
          <Heading lineHeight={1.1} fontWeight={700} fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "orange.200",
                zIndex: -1,
              }}
            >
              Let's jump
            </Text>
            <br />
            <Text as={"span"} color={"orange.400"}>
              on the Hive!
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            SocialHive is an online hub where you can share your moments and connect with others. Our platform lets you showcase your creativity, discover new perspectives, and engage with a diverse community. Whether you're an avid
            traveler, a food enthusiast, or a passionate artist, you'll find a welcoming home on the Hive. So join us today and start sharing your story!
          </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: "column", sm: "row" }}>
            <Button onClick={() => navigate("/register")} rounded={"8"} size={"lg"} fontWeight={"normal"} px={6} colorScheme={"orange"} bg={"orange.400"} _hover={{ bg: "orange.500" }}>
              Start sharing
            </Button>

            <Button onClick={() => navigate("/login")} rounded={"8"} size={"lg"} fontWeight={"normal"} px={6} variant="outline" colorScheme="orange">
              Sign in
            </Button>
          </Stack>
        </Stack>
        <Flex flex={1} justify={"center"} align={"center"} position={"relative"} w={"full"}>
          {/* <Box position={"relative"} height={"300px"} rounded={"2xl"} boxShadow={"2xl"} width={"full"} overflow={"hidden"}> */}
          <Image alt={"Hero Image"} fit={"cover"} align={"center"} w={"400px"} src={connect} />
          {/* </Box> */}
        </Flex>
      </Stack>
    </Container>
  );
}
