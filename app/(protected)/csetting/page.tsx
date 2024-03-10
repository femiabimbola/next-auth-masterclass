"use client";

// It requires session provider.
// You can create a layout file in the protected folder

import {useSession} from "next-auth/react";
import {logout} from "@/actions/logout";

const SettingsPage = () => {
  const session = useSession();
  const onClick = () => logout();
  return (
    <div>
      {JSON.stringify(session)}
      <form>
        <button
          onClick={onClick}
          type="submit"
        >
          {" "}
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
