import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, HStack, Avatar, AvatarBadge, IconButton, Center } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

export const ProfileForm = () => {
  const [profile, setProfile] = useState([]);
  const decodedToken = jwt_decode(token);
  //   const id = decodedToken.id;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      const profileData = await axios.get(`http://localhost:2000/profile/${decodedToken.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(profileData);
      setProfile(profileData.data.data[0]);
    }
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    try {
      const fileInput = document.getElementById("profil-pic-edit");
      //   console.log("fileinput", fileInput);
      const file = fileInput.files[0]; // Get the first selected file
      //   console.log(file);
      const formData = new FormData();
      formData.append("profil_pic", file);
      formData.append("full_name", document.getElementById("fullname").value);
      formData.append("bio", document.getElementById("bio").value);
      //   console.log(formData.getAll());

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const url = `http://localhost:2000/profile/edit/${decodedToken.id}`;
      const result = await axios.patch(url, formData, config);

      //   document.getElementById("image").value = "";
      //   document.getElementById("caption").value = "";

      alert(result.data.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };
  return (
    <Flex>
      <Stack flex="1" alignContent="center" spacing={4} w={"full"} maxW={"lg"} bg={useColorModeValue("white", "gray.700")} rounded={"lg"} boxShadow={"lg"} p={6} my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="lg" src={profile.profil_pic}>
                {/* <AvatarBadge as={IconButton} size="sm" rounded="full" top="-10px" colorScheme="red" aria-label="remove Image" icon={<SmallCloseIcon />} /> */}
              </Avatar>
            </Center>
            <Center w="full">
              {/* <Button w="full">Change Profile Picture</Button> */}
              <FormControl id="profil-pic-edit" isRequired>
                <Input mb="2" type="file" pt="1" color={"gray.500"}></Input>
              </FormControl>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="fullname" isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input defaultValue={profile.full_name} _placeholder={{ color: "gray.500" }} type="text" />
        </FormControl>
        <FormControl id="bio" isRequired>
          <FormLabel>Bio</FormLabel>
          <Input defaultValue={profile.bio} _placeholder={{ color: "gray.500" }} type="text" />
        </FormControl>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input defaultValue={profile.username} _placeholder={{ color: "gray.500" }} type="text" isDisabled />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input defaultValue={profile.email} isDisabled _placeholder={{ color: "gray.500" }} type="email" />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            onClick={() => navigate("/")}
            bg={"gray.500"}
            color={"white"}
            w="full"
            _hover={{
              bg: "gray.600",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={updateProfile}
            bg={"orange.300"}
            color={"white"}
            w="full"
            _hover={{
              bg: "orange.400",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
