import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const workspaces = [
  {
    id: "1",
    name: "Teamflow 1",
    avatar: "TF 1",
  },
  {
    id: "2",
    name: "Teamflow 2",
    avatar: "TF 2",
  },
  {
    id: "3",
    name: "Teamflow 3",
    avatar: "TF 3",
  },
  {
    id: "4",
    name: "Teamflow 4",
    avatar: "TF 4",
  },
  {
    id: "5",
    name: "Teamflow 5",
    avatar: "TF 5",
  },
  {
    id: "6",
    name: "Teamflow 6",
    avatar: "TF 6",
  },
  {
    id: "7",
    name: "Teamflow 7",
    avatar: "TF 7",
  },
  {
    id: "8",
    name: "Teamflow 8",
    avatar: "TF 8",
  },
];

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
  return (
    <div className="flex flex-col gap-2 items-center">
      {workspaces.map((ws) => (
        <Tooltip key={ws.id}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className={cn(
                "size-12 transition-all duration-200",
                getWorkspaceColor(ws.id)
              )}
            >
              <span className="text-sm font-semibold">{ws.avatar}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="text-sm font-semibold">{ws.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
