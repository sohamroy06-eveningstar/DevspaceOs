import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import OpenAI from "openai";
import { supabase } from "../db/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const aiRouter = router({

  //  CHAT
  chat: publicProcedure
    .input(
      z.object({
        message: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { message, userId } = input;

      //  save user message
      await supabase.from("chats").insert([
        {
          user_id: userId,
          role: "user",
          message,
        },
      ]);

      //  AI call
      const response = await openai.chat.completions.create({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a senior developer. Give clean code and short explanation.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

      const reply = response.choices[0].message.content || "";

      // save AI response
      await supabase.from("chats").insert([
        {
          user_id: userId,
          role: "assistant",
          message: reply,
        },
      ]);

      return reply;
    }),

  //  HISTORY
  getHistory: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", input.userId)
        .order("created_at", { ascending: true });

      if (error) throw new Error(error.message);

      return data;
    }),
});