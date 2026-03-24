import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { supabase } from "../db/supabase";

export const settingsRouter = router({

  // ✅ GET SETTINGS
  get: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("user_id", input.userId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw new Error(error.message);
      }

      return data ?? {
        model: "mistral",
        temperature: 0.7,
        autoSave: true,
      };
    }),

  // ✅ UPDATE SETTINGS
  update: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        model: z.string(),
        temperature: z.number(),
        autoSave: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const { error } = await supabase
        .from("settings")
        .upsert(
          {
            user_id: input.userId,
            model: input.model,
            temperature: input.temperature,
            autoSave: input.autoSave,
          },
          { onConflict: "user_id" }
        );

      if (error) throw new Error(error.message);

      return { success: true };
    }),
});