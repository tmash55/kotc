"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export default function ContactCreatorButton() {
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);
  const creatorEmail = "tyler.maschoff@gmail.com"; // Replace with your actual email

  const copyEmailToClipboard = async () => {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(creatorEmail);
      toast({
        title: "Email copied!",
        description: "Creator's email has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or manually copy the email.",
        variant: "destructive",
      });
    } finally {
      setCopying(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={copyEmailToClipboard}
      disabled={copying}
      className="flex items-center"
    >
      <Mail className="h-4 w-4" />
      <span className="sr-only md:not-sr-only md:ml-2">Contact Creator</span>
    </Button>
  );
}
