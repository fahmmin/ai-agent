"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "./SchematicWrapped";


export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const SchematPubKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;
  if (!SchematPubKey) {
    throw new Error("NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY is not set");
  }

  return (
    <ClerkProvider>
      <SchematicProvider
        publishableKey={SchematPubKey}
      >
        <SchematicWrapped>
          {children}  
        </SchematicWrapped>
      </SchematicProvider>
    </ClerkProvider>

  );    
}
