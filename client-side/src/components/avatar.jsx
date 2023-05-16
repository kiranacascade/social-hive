import { Avatar } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

export const AvatarPic = ({ user_id }) => {
  const [avatarUrl, setAvatarUrl] = useState([]);

  useEffect(() => {
    async function fetchAvatarUrl() {
      const avatarData = await axios.get(`http://localhost:2000/profile/picture/${user_id}`);
      console.log(avatarData.data);
      setAvatarUrl(avatarData.data);
    }
    fetchAvatarUrl();
  }, []);
  return <Avatar src={avatarUrl} />;
};
