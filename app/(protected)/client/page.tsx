"use client";

import {UserInfo} from "@/components/user-info";
import {useCurrentUser} from "@/hooks/use-current-user";

// uses hook
const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <UserInfo
      label="client component"
      user={user}
    />
  );
};

export default ClientPage;
