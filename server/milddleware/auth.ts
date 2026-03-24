import { Request } from "express";
import { supabase } from "../src/db/supabase";

export const getUserFromToken = async (req: Request) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return null;

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) return null;

  return data.user;
};