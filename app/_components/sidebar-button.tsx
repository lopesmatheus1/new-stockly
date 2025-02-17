"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  children: React.ReactNode;
  link: string;
}

const SidebarButton = ({ children, link }: SidebarButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <Button
      variant={`${isActive ? "secondary" : "ghost"}`}
      className={`${isActive ? "bg-secondary/50 text-primary" : ""} h-12 w-full justify-start text-base hover:text-primary/80`}
      asChild
    >
      <Link href={link}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
