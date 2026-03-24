import { initTRPC } from "@trpc/server";
import { getUserFromToken } from "../milddleware/auth";

export const createContext = async ({ req }: any) => {
  const user = await getUserFromToken(req);
  return { user };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error("UNAUTHORIZED");
  }
  return next();
});