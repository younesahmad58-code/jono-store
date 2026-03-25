import Link from "next/link";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./LogoutButton";

export async function UserMenu() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/login" className={buttonVariants({ variant: "ghost", size: "icon" })}>
        <User className="h-5 w-5" />
        <span className="sr-only">Autentificare</span>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
        <User className="h-5 w-5" />
        <span className="sr-only">Contul meu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-sm font-medium">
          {session.user.name ?? session.user.email}
        </div>
        <DropdownMenuSeparator />
        {session.user.role === "ADMIN" && (
          <DropdownMenuItem render={<Link href="/admin" />}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Dashboard
          </DropdownMenuItem>
        )}
        <DropdownMenuItem render={<Link href="/cont" />}>
          <User className="mr-2 h-4 w-4" />
          Contul meu
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
