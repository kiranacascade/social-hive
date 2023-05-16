import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, Button, IconButton, CardBody, Image, CardFooter, Menu, MenuButton, MenuList, MenuItem, Link } from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LikeButton } from "./likeButton";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

export function ContentCard() {
  const [posts, setPosts] = useState([]);
  const [onlike, setOnLike] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      const postData = await axios.get("http://localhost:2000/post/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(postData.data);
      setPosts(postData.data.results);
    }
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    // const dateString = '2023-05-15T10:05:59.000Z';
    const date = new Date(dateString);

    // Format the date as "YYYY-MM-DD HH:MM:SS" (e.g., 2023-05-15 10:05:59)
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

    return formattedDate;
  };

  return (
    <Box>
      {posts.map((post) => {
        return (
          <Card key={post.id} maxW="xl" mb={4}>
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

                  <Box>
                    <Heading size="sm">{post.username}</Heading>
                    <Text>{formatDate(post.created_date)}</Text>
                  </Box>
                </Flex>

                <Menu>
                  <MenuButton as={IconButton} aria-label="Options" icon={<BsThreeDotsVertical />} variant="ghost" colorScheme="gray" />
                  <MenuList>
                    {token  ? (
                      <>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </>
                    ) : (
                      <MenuItem>Report</MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Flex>
            </CardHeader>
            <Link href={`http://localhost:3000/post/${post.id}`}>
              <CardBody>
                <Text textDecoration="none">{post.caption}</Text>
              </CardBody>
              <Image objectFit="cover" src={post.image} alt="Chakra UI" />
            </Link>

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <LikeButton post_id={post.id} />

              <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                Comment
              </Button>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </Box>
  );
}
