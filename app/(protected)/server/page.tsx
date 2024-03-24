import {currentUser} from "@/lib/auth";

// uses hook
const ServerPage = async () => {
  const user = await currentUser();
  return <div className="mx-auto">{JSON.stringify(user)}</div>;
};

export default ServerPage;
