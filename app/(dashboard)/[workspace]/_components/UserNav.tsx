import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, User } from "lucide-react";
import {
  LogoutLink,
  PortalLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const user = {
  avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
  given_name: "Md Kaif",
};

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-12 rounded-xl hover:rounded-lg transition-all duration-200 bg-background/50 border-border/50 hover:bg-accent hover:text-accent-foreground "
        >
          <Avatar>
            <AvatarImage src={user.avatar} alt="@shadcn" />
            <AvatarFallback>{user.given_name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        sideOffset={12}
        side="right"
      >
        <DropdownMenuLabel className="flex gap-2">
          <Avatar>
            <AvatarImage src={user.avatar} alt="@shadcn" />
            <AvatarFallback>{user.given_name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left text-sm leading-tight">
            <p className="truncate font-medium">{user.given_name}</p>
            <p className="text-muted-foreground truncate text-xs">
              kaifbiber@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <PortalLink>
              <User />
              Account
            </PortalLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutLink>
            <LogOut />
            Log out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
