import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const today = new Date().toISOString().split("T")[0];

    // Get all active recurring transactions where next_date <= today
    const { data: recurring, error: fetchError } = await supabase
      .from("recurring_transactions")
      .select("*")
      .eq("is_active", true)
      .lte("next_date", today);

    if (fetchError) throw fetchError;
    if (!recurring || recurring.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let processed = 0;

    for (const r of recurring) {
      // Insert the transaction
      const { error: insertError } = await supabase
        .from("transactions")
        .insert({
          user_id: r.user_id,
          type: r.type,
          amount: r.amount,
          category: r.category,
          description: r.description || "",
          date: r.next_date,
        });

      if (insertError) {
        console.error(`Failed to insert for ${r.id}:`, insertError);
        continue;
      }

      // Calculate next date
      const current = new Date(r.next_date);
      let nextDate: Date;

      switch (r.frequency) {
        case "daily":
          nextDate = new Date(current);
          nextDate.setDate(nextDate.getDate() + 1);
          break;
        case "weekly":
          nextDate = new Date(current);
          nextDate.setDate(nextDate.getDate() + 7);
          break;
        case "monthly":
          nextDate = new Date(current);
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case "yearly":
          nextDate = new Date(current);
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
        default:
          nextDate = new Date(current);
          nextDate.setMonth(nextDate.getMonth() + 1);
      }

      // Update the recurring transaction
      await supabase
        .from("recurring_transactions")
        .update({
          next_date: nextDate.toISOString().split("T")[0],
          last_processed: today,
        })
        .eq("id", r.id);

      processed++;
    }

    return new Response(JSON.stringify({ processed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing recurring transactions:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
