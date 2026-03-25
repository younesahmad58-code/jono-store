import { auth } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export async function AdminHeader() {
  const session = await auth();
  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "A";

  return (
    <div className="flex items-center justify-between h-14 px-6 border-b bg-white">
      <div />
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:block">
          {session?.user?.name ?? session?.user?.email}
        </span>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
