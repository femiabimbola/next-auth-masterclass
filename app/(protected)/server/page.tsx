import {UserInfo} from "@/components/user-info";
import {currentUser} from "@/lib/auth";

// uses hook
const ServerPage = async () => {
  const user = await currentUser();
  return (
    <UserInfo
      label="server component"
      user={user}
    />
  );
};

export default ServerPage;
