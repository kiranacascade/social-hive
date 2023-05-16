import { Button, MenuItem, ModalFooter, FormLabel, FormControl, ModalBody, ModalCloseButton, ModalHeader, Modal, ModalOverlay, ModalContent, Textarea } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

export const ModalEditCaption = ({ data_post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleEdit = async (post_id) => {
    const data = {
      caption: document.getElementById("caption-edit").value,
    };

    const result = await axios.patch(`http://localhost:2000/post/edit/${post_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    document.getElementById("caption-edit").value = "";

    // memberikan alert
    alert(result.data.message);
    navigate("/");
    window.location.reload();
  };

  const handleDelete = async (post_id) => {
    const result = await axios.delete(`http://localhost:2000/post/delete/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert(result.data.message);
    window.location.reload();
  };
  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>
      <MenuItem onClick={() => handleDelete(data_post.id)}>Delete</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Caption</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="caption-edit" isRequired>
              <FormLabel>Insert new caption below</FormLabel>
              <Textarea defaultValue={data_post.caption} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleEdit(data_post.id)} colorScheme="orange" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
