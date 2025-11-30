import { ModeToggle } from "@/components/ui/theme-toggle";
import CreateWorkspace from "./_components/CreateWorkspace";
import { WorkspaceList } from "./_components/WorkspaceList";
import { UserNav } from "./_components/UserNav";
import { ReactNode } from "react";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { orpc } from "@/lib/orpc";

const layout = async ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    orpc.workspace.list.queryOptions(),
  )

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col w-16 items-center px-2 py-4 border-r border-border bg-secondary">
        <HydrateClient client={queryClient}>
          <WorkspaceList />
        </HydrateClient>
        <div className="mt-4">
          <CreateWorkspace />
        </div>

        <div className="mt-auto flex flex-col gap-2 items-center">
          <HydrateClient client={queryClient}>
            <UserNav />
          </HydrateClient>
          <ModeToggle />
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
