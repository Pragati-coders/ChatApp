import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (selectedUsers.length < 2) {
      toast({
        title: "Need at least 2 users for a group!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      setGroupChatName("");
      setSelectedUsers([]);
      setSearchResult([]);
      toast({
        title: "New Group Chat Created! 🎉",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size="md">
        <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.700" />
        <ModalContent
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          }}
        >
          <ModalHeader
            style={{
              color: "white",
              fontFamily: "'Syne', sans-serif",
              fontWeight: "800",
              fontSize: "26px",
              textAlign: "center",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              paddingBottom: "16px",
            }}
          >
            👥 Create Group Chat
          </ModalHeader>
          <ModalCloseButton color="rgba(255,255,255,0.5)" />

          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            gap={3}
            py={5}
          >
            {/* Group Name Input */}
            <FormControl>
              <Input
                placeholder="Group Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  borderRadius: "12px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                _placeholder={{ color: "rgba(255,255,255,0.3)" }}
                _focus={{
                  borderColor: "rgba(99,102,241,0.6)",
                  boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
                  background: "rgba(255,255,255,0.09)",
                }}
              />
            </FormControl>

            {/* Search Users Input */}
            <FormControl>
              <Input
                placeholder="Search users to add..."
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  borderRadius: "12px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                _placeholder={{ color: "rgba(255,255,255,0.3)" }}
                _focus={{
                  borderColor: "rgba(99,102,241,0.6)",
                  boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
                  background: "rgba(255,255,255,0.09)",
                }}
              />
            </FormControl>

            {/* Selected Users Badges */}
            {selectedUsers.length > 0 && (
              <Box w="100%" display="flex" flexWrap="wrap" gap={1}>
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </Box>
            )}

            {/* Search hint */}
            {selectedUsers.length < 2 && (
              <Text fontSize="11px" color="rgba(255,255,255,0.25)" fontFamily="'DM Sans', sans-serif">
                Add at least 2 users to create a group
              </Text>
            )}

            {/* Search Results */}
            {loading ? (
              <Text color="rgba(255,255,255,0.4)" fontSize="14px">Searching...</Text>
            ) : (
              <Box w="100%">
                {searchResult?.slice(0, 4).map((u) => (
                  <UserListItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleGroup(u)}
                  />
                ))}
              </Box>
            )}
          </ModalBody>

          <ModalFooter borderTop="1px solid rgba(255,255,255,0.06)">
            <Button
              onClick={handleSubmit}
              w="100%"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                borderRadius: "12px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                border: "none",
              }}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(99,102,241,0.5)",
              }}
              size="lg"
            >
              Create Group 🚀
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
