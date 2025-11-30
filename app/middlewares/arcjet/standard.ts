import arcjet, { detectBot, shield } from "@/lib/arcjet";
import { base } from "../base";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";

const buildStandardAj = () =>
  arcjet
    .withRule(
      shield({
        mode: "LIVE",
      })
    )
    .withRule(
      detectBot({
        mode: "LIVE",
        allow: [
          "CATEGORY:SEARCH_ENGINE",
          "CATEGORY:PREVIEW",
          "CATEGORY:MONITOR",
        ],
      })
    );

/* 
Standart security middleware. It will be built on top of base builder which has the context of request and the error definations inside of it. The standard security middleware will get request and user as context and build a middleware which will execute the protect() function of arcjet to execute our protection rules.
*/

export const standardSecurityMiddleware = base
  .$context<{
    request: Request;
    user: KindeUser<Record<string, unknown>>;
  }>()
  .middleware(async ({ context, next, errors }) => {
    const decision = await buildStandardAj().protect(context.request, {
      userId: context.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw errors.FORBIDDEN({
          message: "You are a bot",
        });
      }
      if (decision.reason.isShield()) {
        throw errors.FORBIDDEN({
          message: "Request blocked by security policy (WAF)",
        });
      }

      throw errors.FORBIDDEN({
        message: "You are being protected by Arcjet",
      });
    }
    
    return next();
  });
