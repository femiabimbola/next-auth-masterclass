"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {usePathname} from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-secondary flex justify-between item-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2"></div>
      <p>User button</p>
    </nav>
  );
};
