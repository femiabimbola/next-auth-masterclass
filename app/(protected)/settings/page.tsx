"use client";

import {logout} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";

import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {settings} from "@/actions/settings";
import {useTransition} from "react";
import {useSession} from "next-auth/react";

const SettingsPage = async () => {
  const [isPending, startTransition] = useTransition();
  const {update} = useSession();
  const onClick = () => {
    startTransition(() => {
      settings({
        name: "New name",
      }).then(() => update());
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center"> Settings</p>
      </CardHeader>
      <CardContent>
        <Button
          disabled={isPending}
          onClick={onClick}
        >
          Update name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
