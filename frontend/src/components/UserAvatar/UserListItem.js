import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      w="100%"
      display="flex"
      alignItems="center"
      px={3}
      py={2}
      mb={2}
      borderRadius="12px"
      transition="all 0.2s ease"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      _hover={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      }}
    >
      <Avatar mr={2} size="sm" cursor="pointer" name={user.name} src={user.pic} />
      <Box>
        <Text
          color="white"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="600"
          fontSize="14px"
        >
          {user.name}
        </Text>
        <Text fontSize="xs" color="rgba(255,255,255,0.4)">
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;