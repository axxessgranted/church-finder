import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: churches, error } = await supabase.from("churches").select("*");

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Church Finder Japan</h1>
      <ul className="space-y-2">
        {churches.map((church) => (
          <li key={church.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl">{church.name}</h2>
            <p>{church.city}</p>
            <p>{church.languages?.join(", ")}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
