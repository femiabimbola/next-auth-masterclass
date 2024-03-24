import {ExtendedUser} from "@/next-auth";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({user, label}: UserInfoProps) => {
  return <div> The user info</div>;
};

export default UserInfo;
