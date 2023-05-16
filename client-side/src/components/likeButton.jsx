import { Card, CardHeader, Flex, Avatar, Box, Heading, Text, Button, IconButton, CardBody, Image, CardFooter, Menu, MenuButton, MenuList, MenuItem, Link } from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

export const LikeButton = ({ post_id }) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    async function fetchDetailPosts() {
      const postData = await axios.get(`http://localhost:2000/post/get/${post_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(postData.data);
      setLikes(postData.data.results[0].likes);
    }
    fetchDetailPosts();
  }, [post_id]);

  const onLike = async () => {
    try {
      const result = await axios.post(`http://localhost:2000/like/like/${post_id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      if (err.response.data.message === "You have already liked this post") {
        const result = await axios.delete(`http://localhost:2000/like/unlike/${post_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      console.log(err);
    }

    // if ()
    const postData = await axios.get(`http://localhost:2000/post/get/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //   console.log(postData.data);
    setLikes(postData.data.results[0].likes);
  };
  return (
    <Button onClick={onLike} flex="1" variant="ghost" leftIcon={<BiLike />}>
      {likes} Like
    </Button>
  );
};
