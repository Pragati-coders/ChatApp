import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
      display="flex"
      alignItems="center"
      gap={1}
    >
      {user.name}
      {admin?._id === user._id && (
        <span style={{ marginLeft: 2 }}>(Admin)</span>
      )}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;