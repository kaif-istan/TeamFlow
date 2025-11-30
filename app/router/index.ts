import { createWorkspace, listWorkspaces } from "@/app/router/workspace";

export const router = {
  // Routers
  workspace: {
    list: listWorkspaces,
    create: createWorkspace,
  },
};
