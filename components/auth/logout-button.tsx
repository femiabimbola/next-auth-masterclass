"use client";

import {logout} from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogotButton = ({children}: LogoutButtonProps) => {
  {
    const onClick = () => {
      logout();
    };
  }
};
