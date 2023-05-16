import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, Button, IconButton, CardBody, Image, CardFooter, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LikeButton } from "./likeButton";

import { ModalEditCaption } from "./modalEditCaption";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Comment } from "./comment";
import { AvatarPic } from "./avatar";

const token = localStorage.getItem("token");

export function ContentDetailCard() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();
  let { id } = useParams();
  const decodedToken = jwt_decode(token);

  useEffect(() => {
    async function fetchDetailPosts() {
      const postData = await axios.get(`http://localhost:2000/post/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(postData.data);
      setPosts(postData.data.results);
    }
    fetchDetailPosts();
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
          <Card key={post.id} maxW="3xl" mb={4}>
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <AvatarPic user_id={post.user_id} />

                  <Box>
                    <Heading size="sm">{post.username}</Heading>
                    <Text>{formatDate(post.created_date)}</Text>
                  </Box>
                </Flex>

                <Menu>
                  <MenuButton as={IconButton} aria-label="Options" icon={<BsThreeDotsVertical />} variant="ghost" colorScheme="gray" />
                  <MenuList>
                    {token && decodedToken.id == post.user_id ? (
                      <>
                        <ModalEditCaption data_post={post} />
                      </>
                    ) : (
                      <MenuItem>Report</MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Flex>
            </CardHeader>

            <CardBody>
              <Text textDecoration="none">{post.caption}</Text>
            </CardBody>
            <Image objectFit="cover" src={post.image} alt="Chakra UI" />
            <Comment post_id={post.id} />

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
