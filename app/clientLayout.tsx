"use client";

import NextLink from "next/link";
import { Box, Container, Input, InputGroup, InputLeftElement, Link, Text, Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSession, signIn, signOut } from "next-auth/react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link as={NextLink} href={href}>
      <Text fontSize="md" fontWeight="600">
        {children}
      </Text>
    </Link>
  );
}

type ClientLayoutProps = {
  children: ReactNode;
};

export function ClientLayout({ children }: ClientLayoutProps) {
  const { data: session } = useSession();

  return (
    <>
      <Box
        as="header"
        boxShadow="0 0 3px rgba(0, 0, 0, 0.15)"
      >
        <Container
          maxW="1440px"
          display="flex"
          gap="32px"
          paddingTop="16px"
          paddingBottom="16px"
          alignItems="center"
        >
          {/* Logo/branding */}
          <Box
            flex="0 0 auto"
          >
            <Text fontSize="lg" as="strong">
              Zeppelin Feedback Portal
            </Text>
          </Box>

          {/* Nav */}
          <Box
            flex="1 1 100%"
            display="flex"
            gap="32px"
          >
            <NavLink href="/">
              Overview
            </NavLink>
            <NavLink href="/">
              New feedback
            </NavLink>
            {session && (
              <Button onClick={() => signOut()}>
                Log out ({session.user?.name})
              </Button>
            )}
            {! session && (
              <Button onClick={() => signIn("discord")}>
                Log in
              </Button>
            )}
          </Box>

          {/* Search */}
          <Box
            width="30vw"
            minWidth="280px"
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input size="md" placeholder="Search feedback..." />
            </InputGroup>
          </Box>
        </Container>
      </Box>
      <Container
        maxW="1440px"
        marginTop="32px"
      >
        {children}
      </Container>
    </>
  );
}
