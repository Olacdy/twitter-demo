"use client";

import { FC, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type AuthButtonProps = {
  authLink: string;
  codeVerifier: string;
};

const AuthButton: FC<AuthButtonProps> = ({ authLink, codeVerifier }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    document.cookie = `codeVerifier=${codeVerifier}`;

    setIsLoading(false);
  }, [codeVerifier]);

  return (
    <Button asChild disabled={isLoading}>
      <a href={authLink} target="_blank">
        Sign In
      </a>
    </Button>
  );
};

export default AuthButton;
