import {auth} from "@/auth";

const ServerPage = async () => {
  const session = await auth();
  return <div className="mx-auto">{JSON.stringify(session)}</div>;
};

export default ServerPage;
