"use client";
import Link from "next/link";
import AgentPulse from "@/components/AgentPulse";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 px-4 md:px-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
      {/* left */}
      <div className="container mx-auto ">
        <div className="flex items-center justify-between h-16 px-3">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-4">
              <AgentPulse />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                AgentTube
              </h1>
            </Link>
          </div>
          {/* right */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link
                href="/manage-plan"
                className="text-sm font-medium text-gray-500"
              >
                <Button variant="outline">Manage Plan</Button>
              </Link>
              <div className="ml-4">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button
                  variant="ghost"
                  className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text"
                >
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
