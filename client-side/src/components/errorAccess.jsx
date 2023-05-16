import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ErrorAccess() {
  const navigate = useNavigate();
  return (
    <div>
      <Box textAlign="center" py={10} px={6}>
        <Heading display="inline-block" as="h2" size="2xl" color={"orange.400"}>
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          You cannot access this page
        </Text>
        <Text color={"gray.500"} mb={6}>
          Please click button below
        </Text>

        <Button onClick={() => navigate("/")} colorScheme="orange" bgGradient="linear(to-r, orange.400, orange.500, orange.600)" color="white" variant="solid">
          Go to Home
        </Button>
      </Box>
    </div>
  );
}

export default ErrorAccess;
