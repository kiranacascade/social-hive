import {  Flex, Textarea, Box, Heading, FormControl,  Button, Input, Text, Stack, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
const token = localStorage.getItem("token");

export const Comment = ({ post_id }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function fetchComment() {
      const commentsData = await axios.get(`http://localhost:2000/comment/fetch/${post_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(commentsData);
      setComments(commentsData.data.results);
    }
    fetchComment();
  }, []);

  const onComment = async () => {
    const data = {
      comment_text: document.getElementById("new-comment").value,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const url = `http://localhost:2000/comment/comment/${post_id}`;
    const result = await axios.post(url, data, config);

    document.getElementById("new-comment").value = "";

    // alert(result.data.message);
    window.location.reload();
  };
  return (
    <>
      {comments.map((comment) => (
        <Flex flex="1" p="4" alignItems="center" flexWrap="wrap">
          <Box>
            <Heading size="sm">{comment.username}</Heading>
            <Text>{comment.comment_text}</Text>
          </Box>
        </Flex>
      ))}
      <HStack flex="1" p="4" alignItems="center">
        <FormControl id="new-comment" isRequired>
          <Input
            placeholder="write your comment here"
            bg={"gray.100"}
            border={0}
            color={"gray.800"}
            _placeholder={{
              color: "gray.400",
            }}
          />
        </FormControl>
        <Button onClick={onComment} fontFamily={"heading"} mt={8} w={"xs"} colorScheme={"orange"} bg={"orange.300"} _hover={{ bg: "orange.400" }} color={"white"}>
          Comment
        </Button>
      </HStack>
    </>
  );
};
