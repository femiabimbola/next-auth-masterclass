"use client";

import {BeatLoader} from "react-spinners";
import CardWrapper from "@/components/auth/card-wrapper";
import {useSearchParams} from "next/navigation";

// How to get the token from the url

const NewVerification = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel=" Back to login"
    >
      <div className="flex items-center w-full justify-center">
        <BeatLoader />
        <p>{token}</p>
      </div>
    </CardWrapper>
  );
};

export default NewVerification;
