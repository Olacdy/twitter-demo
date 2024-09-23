"use client";

import { FC } from "react";

import { Button } from "@/components/ui/button";

type AuthButtonProps = {};

const AuthButton: FC<AuthButtonProps> = ({}) => {
  return (
    <Button asChild>
      <a href="/api/auth/twitter" target="_blank">
        My Link
      </a>
    </Button>
  );
};

export default AuthButton;
