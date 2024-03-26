import {UserInfo} from "@/components/user-info";
import {currentUser} from "@/lib/auth";

// uses hook
const ClientPage = async () => {
  const user = await currentUser();
  return (
    <UserInfo
      label="server componet"
      user={user}
    />
  );
};

export default ClientPage;
