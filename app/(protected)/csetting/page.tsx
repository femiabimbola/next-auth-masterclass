"use client";

// It requires session provider.
// You can create a layout file in the protected folder

// import {useSession} from "next-auth/react";
import {logout} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";

const SettingsPage = () => {
  // const session = useSession();
  const user = useCurrentUser();
  const onClick = () => logout();

  return (
    <div className="bg-white p-10 roundex-xl">
      <button
        onClick={onClick}
        type="submit"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
