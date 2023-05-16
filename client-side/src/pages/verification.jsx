import React, { useEffect } from "react";
import { Box, Image, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import verifyIllustration from "../assets/verify.png";
import axios from "axios";

function Verification() {
  const navigate = useNavigate();

  let { token } = useParams();

  const tokenVerification = async () => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:2000/auth/verification",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        // alert(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data);
    }
  };

  useEffect(() => {
    tokenVerification();
  }, []);

  return (
    <VStack alignContent="center" justifyContent="center" textAlign="center" py={10} px={6}>
      <Image alt={"Register Image"} fit={"cover"} align={"center"} w={"400px"} src={verifyIllustration} />
      {/* <Image src="" /> */}
      {/* <CheckCircleIcon boxSize={'50px'} color={'green.500'} /> */}
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Your account is being verified
      </Heading>
      <Text color={"gray.500"}>Thank you for verifying your account. You can continue signing into your account to start sharing!</Text>
    </VStack>
    // <div>
    //   <p>Your account is being verified </p>
    //   {/* <p>{token}</p> */}
    // </div>
  );
}

export default Verification;
