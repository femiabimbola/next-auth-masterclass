"use client";

import {UserRole} from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({children, allowedRole}: RoleGateProps) => {
  return <div> {children} </div>;
};

export default RoleGate;
