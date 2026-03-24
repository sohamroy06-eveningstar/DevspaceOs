import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { supabase } from "../db/supabase";

export const projectRouter = router({
  
  // ✅ CREATE
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("projects")
        .insert([{ name: input.name.trim() }])
        .select()
        .single(); // ✅ return single object

      if (error) throw new Error(error.message);
      return data;
    }),

  // ✅ GET ALL
  getAll: publicProcedure.query(async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  }),

  // ✅ DELETE
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", input.id);

      if (error) throw new Error(error.message);
      return true; // ✅ simpler return
    }),

  // ✅ UPDATE
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("projects")
        .update({ name: input.name.trim() })
        .eq("id", input.id)
        .select()
        .single(); // ✅ return single object

      if (error) throw new Error(error.message);
      return data;
    }),
});