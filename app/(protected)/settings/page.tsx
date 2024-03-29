import {auth, signOut} from "@/auth"; // the server side
import {Card} from "@/components/ui/card";

// import {signOut} from "next-auth/react"; // FOR CLIENT COMPONENT

const SettingsPage = async () => {
  const session = await auth();

  return (
    <Card className="w-[600px]">
      {/* {JSON.stringify(session)} */}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit"> Sign Out</button>
      </form>
    </Card>
  );
};

export default SettingsPage;
