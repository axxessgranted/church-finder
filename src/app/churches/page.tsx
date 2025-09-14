import { createClient } from "@/utils/supabase/server";
export default async function Churches() {
  const supabase = await createClient();
  const { data: churches } = await supabase.from("churches").select();
  return <pre>{JSON.stringify(churches, null, 2)}</pre>;
}
