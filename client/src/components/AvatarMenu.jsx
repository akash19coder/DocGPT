"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  CreditCardIcon,
  LogOutIcon,
  MessageCircleIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react";

export function AvatarMenu() {
  return (
    <div className=" bg-gray-100">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">user@example.com</h4>
                <Label className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Free Plan
                </Label>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Need more message limit?
              </p>
              <Button className="w-full">
                <SparklesIcon className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <UserIcon className="mr-2 h-4 w-4" />
                Account
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Pricing
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MessageCircleIcon className="mr-2 h-4 w-4" />
                Discord
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
