import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// GET /api/churches
export async function GET(req) {
  const supabase = await createClient();

  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const language = searchParams.get("language");

  let query = supabase.from("churches").select("*");

  if (city) {
    query = query.ilike("city", `%${city}%`); // case-insensitive search
  }

  if (language) {
    query = query.contains("languages", [language]);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/churches
export async function POST(req) {
  const supabase = await createClient();
  const body = await req.json();
  const { data, error } = await supabase
    .from("churches")
    .insert([body])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0]);
}
