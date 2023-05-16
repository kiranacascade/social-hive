import { Card, CardHeader, Flex, Textarea, Box, Heading, FormControl, IconButton, CardBody, Icon, CardFooter, Button, Input, Text } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiAddCircleFill } from "react-icons/ri";
import { MdOutlinePostAdd } from "react-icons/md";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

export function PostForm() {
  const navigate = useNavigate();

  const createPost = async () => {
    try {
      const fileInput = document.getElementById("image");
      const file = fileInput.files[0]; // Get the first selected file

      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", document.getElementById("caption").value);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const url = "http://localhost:2000/post/create";
      const result = await axios.post(url, formData, config);

      document.getElementById("image").value = "";
      document.getElementById("caption").value = "";

      alert(result.data.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <Card maxW="md" mb={4}>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Icon as={RiAddCircleFill} w={8} h={8} color="orange.300" />

              <Box>
                <Heading size="md" color="gray.800">
                  Create New Post
                </Heading>
                <Text>username</Text>
              </Box>
            </Flex>
            <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<BsThreeDotsVertical />} />
          </Flex>
        </CardHeader>
        <CardBody>
          <FormControl id="image" isRequired>
            <Input mb="2" type="file" pt="1" color={"gray.500"}></Input>
          </FormControl>
          <FormControl id="caption" isRequired>
            <Textarea placeholder="Write your caption here" />
          </FormControl>
        </CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button onClick={createPost} bg={"orange.100"} _hover={{ bg: "orange.300" }} flex="1" variant="ghost" leftIcon={<MdOutlinePostAdd />}>
            Post
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
