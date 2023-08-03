"use client";

import "@fontsource-variable/inter";
import "./globals.css";
import NextLink from "next/link";
import { ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { cn } from "../lib/utils";
import logoUrl from "./logo.png";
import Image from "next/image";
import { Avatar } from "../components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

type MenuItemProps = {
  className?: string;
  children: ReactNode;
};

function MenuItem(props: MenuItemProps) {
  return (
    <li className={cn("flex-initial m-0 p-0", props.className)}>
      {props.children}
    </li>
  );
}

function MenuSeparator() {
  return (
    <li className="flex-initial w-0 border-l border-gray-200"></li>
  );
}

const navLinkClasses = "font-semibold";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

function NavLink({ href, children }: NavLinkProps) {
  return (
    <NextLink href={href} className={navLinkClasses}>
      {children}
    </NextLink>
  );
}

type ClientLayoutProps = {
  children: ReactNode;
};

export function ClientLayout({ children }: ClientLayoutProps) {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto max-w-[1280px] px-4 py-8">
      {/* Header */}
      <header className="flex justify-between">
        {/* Logo */}
        <div className="flex-initial flex gap-5 align-center">
          <Image
            src={logoUrl}
            alt=""
            width={80}
          />
          <div className="text-2xl">Zeppelin Feedback Portal</div>
        </div>

        {/* Menu */}
        <div className="flex-initial">
          <ul role="menu" className="flex-initial m-0 p-0 flex gap-6">
            <MenuItem>
              <NavLink href="/">
                Home
              </NavLink>
            </MenuItem>
            <MenuSeparator />
            {session?.user && <>
              <MenuItem className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={session.user.image!} />
                </Avatar>
                {session.user.name!}
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className={navLinkClasses}
                  onClick={() => signOut()}
                >
                  Log out
                </a>
              </MenuItem>
            </>}
            {! session?.user && (
              <MenuItem>
                  <a
                    href="#"
                    className={navLinkClasses}
                    onClick={() => signIn("discord")}
                  >
                    Log in
                  </a>
              </MenuItem>
            )}
          </ul>
        </div>
      </header>
      
      {/* Content */}
      <main className="mt-16">
        {children}
      </main>
    </div>
  );
}
