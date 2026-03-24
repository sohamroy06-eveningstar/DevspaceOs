import { router } from "./trpc";
import { projectRouter } from "./routes/project";
import { userRouter } from "./routes/user";
import { aiRouter } from "./routes/ai";
import { settingsRouter } from "./routes/settings";

export const appRouter = router({
  project: projectRouter,
  user: userRouter,
  ai:aiRouter,
  settings:settingsRouter,
});

export type AppRouter = typeof appRouter;