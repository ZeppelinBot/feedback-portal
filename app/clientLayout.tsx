"use client";

import "@fontsource-variable/inter";
import NextLink from "next/link";
import { ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { BaseStyles } from "./style/BaseStyles";
import { MainHeader } from "./components/MainHeader";
import { Container } from "./components/Container";
import { VSpacer } from "./components/VSpacer";

const cn = (...args: Array<string | undefined>) => args.map(v => String(v)).join(" ");

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

  return <>
    <BaseStyles />

    <Container>
      <MainHeader />

      <VSpacer size="8" />

      {/* Content */}
      <main className="mt-16">
        {children}
      </main>
    </Container>
  </>;
}
