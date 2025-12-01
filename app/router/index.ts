import { createWorkspace, listWorkspaces } from "@/app/router/workspace";
import { createChannel, listChannels } from "./channel";

export const router = {
  // Routers
  workspace: {
    list: listWorkspaces,
    create: createWorkspace,
  },
  channel: {
    create: createChannel,
    list: listChannels,
  },
};
