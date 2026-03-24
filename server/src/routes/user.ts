import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { supabase } from "../db/supabase";

export const userRouter = router({

  // ✅ GET PROFILE
  getProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", input.id)
        .single();

      if (error) return null;
      return data;
    }),

  // ✅ UPDATE PROFILE
  updateProfile: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        bio: z.string(),
        avatar_url:z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("profiles")
        .upsert([
          {
            id: input.id,
            name: input.name,
            email: input.email,
            bio: input.bio,
            avatar_url:input.avatar_url,
          },
        ])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    }),
});