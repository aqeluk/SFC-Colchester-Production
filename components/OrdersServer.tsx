import { createClient } from "@/utils/supabase/server";
import RealtimeOrders from "@/components/RealtimeOrders";

export const revalidate = 0;

export default async function Realtime() {
  const supabase = await createClient();
  const { data } = await supabase.from("Order").select("*").filter("userEmail", "eq", "uzairpopalzai@googlemail.com");
  return <RealtimeOrders serverOrders={data} />;
}
