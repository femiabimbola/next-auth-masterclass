import {ExtendedUser} from "@/next-auth";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({user, label}: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p>{label}</p>
      </CardHeader>
      <CardContent className="space-y-4"></CardContent>
    </Card>
  );
};
