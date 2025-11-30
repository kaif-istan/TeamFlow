import { os } from "@orpc/server";
import z from "zod";
import type {
  KindeUser,
  KindeOrganization,
} from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { base } from "../middlewares/base";
import { requiredAuthMiddleware } from "../middlewares/auth";
import { requiredWorkspaceMiddleware } from "../middlewares/workspace";
import { workspaceSchema } from "../schema/workspaceSchema";
import { init, Organizations } from "@kinde/management-api-js";
import { standardSecurityMiddleware } from "../middlewares/arcjet/standard";
import { heavyWriteSecurityMiddleware } from "../middlewares/arcjet/heavy-write";

export const listWorkspaces = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .route({
    method: "GET",
    path: "/workspace",
    summary: "Get all workspaces",
    tags: ["workspace"],
  })
  .input(z.void())
  .output(
    z.object({
      workspaces: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          avatar: z.string(),
        })
      ),
      user: z.custom<KindeUser<Record<string, unknown>>>(),
      currentWorkspace: z.custom<KindeOrganization<unknown>>(),
    })
  )
  .handler(async ({ context, errors }) => {
    const { getUserOrganizations } = getKindeServerSession();
    const organizations = await getUserOrganizations();

    if (!organizations) {
      throw errors.FORBIDDEN();
    }

    return {
      workspaces: organizations?.orgs.map((org) => ({
        id: org.code,
        name: org.name ?? "My Workspace",
        avatar: org.name?.charAt(0) ?? "M",
      })),
      user: context.user,
      currentWorkspace: context.workspace,
    };
  });
  

export const createWorkspace = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkspaceMiddleware)
  .use(standardSecurityMiddleware)
  .use(heavyWriteSecurityMiddleware)
  .route({
    method: "POST",
    path: "/workspace",
    summary: "Create a new workspace",
    tags: ["workspace"],
  })
  .input(workspaceSchema)
  .output(
    z.object({
      orgCode: z.string(),
      workspaceName: z.string(),
    })
  )
  .handler(async ({ context, errors, input }) => {
    // We'll use kind management api as webhook does not
    // provide us any method to create an organization.
    init();
    // create organization
    let data;
    try {
      data = await Organizations.createOrganization({
        requestBody: {
          name: input.name,
        },
      });
    } catch (error: any) {
      console.log(error);
      throw errors.FORBIDDEN({
        message: "unable to create organization"
      });
    }
    if (!data.organization?.code) {
      throw errors.FORBIDDEN({
        message: "Org code is not defined",
      });
    }
    // Add user to the organization
    try {
      const {} = await Organizations.addOrganizationUsers({
        orgCode: data.organization.code,
        requestBody: {
          users: [
            {
              id: context.user.id,
              roles: ["admin"],
            },
          ],
        },
      });
    } catch (error) {
      throw errors.FORBIDDEN({
        message: "unable to add user to created organization"
      });
    }

    const { refreshTokens } = getKindeServerSession();
    await refreshTokens();

    return {
      orgCode: data.organization.code,
      workspaceName: input.name,
    };
  });
