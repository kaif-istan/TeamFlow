import z from "zod";

export function transformChannelName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, "") // Remove special characters (keep only letters, numbers, and dashes)
    .replace(/-+/g, "-") // Replace multiple consecutive dashes with a single dash
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
}

export const channelNameSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(50)
    .transform((name, ctx) => {
      const transformed = transformChannelName(name);
      if (transformed.length < 2) {
        ctx.addIssue({
          code: "custom",
          message: "Channel name must be at least 2 characters long",
        });
        return z.NEVER;
      }
      return transformed;
    }),
});

export type channelNameSchemaType = z.infer<typeof channelNameSchema>