import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatState } from "../context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      w={{ base: "100%", md: "31%" }}
      borderRadius="16px"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Box
        pb={3}
        px={2}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid rgba(255,255,255,0.06)"
        mb={2}
      >
        <Text
          fontSize="20px"
          fontFamily="'Syne', sans-serif"
          fontWeight="700"
          color="white"
        >
          My Chats
        </Text>
        <GroupChatModal>
          <Button
            display="flex"
            fontSize="13px"
            rightIcon={<AddIcon />}
            size="sm"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
            }}
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        w="100%"
        h="100%"
        borderRadius="12px"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" spacing={1}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                key={chat._id}
                px={3}
                py={3}
                borderRadius="12px"
                transition="all 0.2s ease"
                style={
                  selectedChat === chat
                    ? {
                        background:
                          "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        boxShadow: "0 4px 15px rgba(99,102,241,0.3)",
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }
                }
              >
                <Text
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight="600"
                  fontSize="14px"
                  color="white"
                >
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
    <Text
    fontSize="12px"
    color="rgba(255,255,255,0.45)"
    fontFamily="'DM Sans', sans-serif"
    mt={1}
    noOfLines={1}
  >
    <b style={{ color: "rgba(255,255,255,0.6)" }}>
      {chat.latestMessage.sender?.name
        ? String(chat.latestMessage.sender.name)
        : ""}:{" "}
    </b>
    {chat.latestMessage.content &&
    typeof chat.latestMessage.content === "string"
      ? chat.latestMessage.content.length > 50
        ? chat.latestMessage.content.substring(0, 51) + "..."
        : chat.latestMessage.content
      : ""}
  </Text>
    )}
      </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;