"use client"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { orpc } from "@/lib/orpc";
import { cn } from "@/lib/utils";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useSuspenseQuery } from '@tanstack/react-query'


const colorCombinations = [
  "bg-blue-500 hover:bg-blue-600 text-white",
  "bg-emerald-500 hover:bg-emerald-600 text-white",
  "bg-purple-500 hover:bg-purple-600 text-white",
  "bg-amber-500 hover:bg-amber-600 text-white",
  "bg-rose-500 hover:bg-rose-600 text-white",
  "bg-indigo-500 hover:bg-indigo-600 text-white",
  "bg-cyan-500 hover:bg-cyan-600 text-white",
  "bg-pink-500 hover:bg-pink-600 text-white",
];

const getWorkspaceColor = (id: string) => {
  const charSum = id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const colorIndex = charSum % colorCombinations.length;
  return colorCombinations[colorIndex];
};

export const WorkspaceList = () => {
  const { data: { workspaces, currentWorkspace
  } } = useSuspenseQuery(
    orpc.workspace.list.queryOptions(),
  )
  return (
    <div className="flex flex-col gap-2 items-center">
      {workspaces.map((ws) => {
        const isActive = currentWorkspace?.orgCode === ws.id;
        return (
          <Tooltip key={ws.id}>
            <TooltipTrigger asChild>
              <LoginLink orgCode={ws.id}>
                <Button
                  size="icon"
                  className={cn(
                    "size-12 rounded-lg transition-all duration-150 flex items-center justify-center hover:text-black dark:hover:text-white",
                    getWorkspaceColor(ws.id),
                    isActive
                      ? "ring-2 ring-white ring-offset-2 ring-offset-sidebar shadow-sm"
                      : "hover:bg-white/10 hover:shadow-sm"
                  )}
                >
                  <span className="text-sm font-semibold ">{ws.avatar}</span>
                </Button>

              </LoginLink>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-sm font-semibold">{ws.name} {isActive && "(current)"}</p>
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  );
};
