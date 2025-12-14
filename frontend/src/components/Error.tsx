import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import type { ErrorConfig } from "../types/error_types";
import { Button } from "./Button";

function isError(err: unknown): err is Error {
  return err instanceof Error;
}

const Error: React.FC = () => {
  const err = useRouteError();

  let error: ErrorConfig = {
    code: 500,
    title: "Unexpected Error",
    message: "Something went wrong.",
  };

  if (isRouteErrorResponse(err)) {
    error = {
      code: err.status,
      title: err.statusText,
      message: typeof err.data === "string" ? err.data : error.message,
    };
  } else if (isError(err)) {
    error = {
      code: 500,
      title: "Application Error",
      message: err.message,
    };
  }

  return (
    <div className="w-screen h-screen bg-[#050505] flex items-center justify-center">
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="relative group select-none">
          <h1 className="font-marker text-[10rem] sm:text-[14rem] md:text-[18rem] leading-none text-[#CFFF24] absolute inset-0 blur-xl animate-glow-pulse opacity-60">
            {error.code}
          </h1>
          <h1 className="relative font-marker text-[10rem] sm:text-[14rem] md:text-[18rem] leading-none text-[#CFFF24] drop-shadow-2xl animate-float">
            {error.code}
          </h1>
        </div>

        <h2 className="font-sans font-black text-4xl md:text-6xl text-white tracking-tighter uppercase mb-6 -mt-4 md:-mt-8 z-20">
          ERROR
        </h2>

        <p className="font-sans text-gray-400 text-lg md:text-xl max-w-lg mb-12 font-medium tracking-wide">
          {error.title}
        </p>

        <Button
          label="Go to Shop"
          variant="primary"
          icon={ArrowUpRight}
          onClick={() => {
            window.location.href = "/shop";
          }}
        />
      </div>
    </div>
  );
};

export default Error;