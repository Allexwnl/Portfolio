import { createClient } from '@supabase/supabase-js';

const supabaseLogin = async () => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const SUPABASE_EMAIL = process.env.SUPABASE_EMAIL;
    const SUPABASE_PASSWORD = process.env.SUPABASE_PASSWORD;

    if ( !SUPABASE_EMAIL || !SUPABASE_PASSWORD) {
      console.error("❌ Ontbrekende environment variabelen");
      return;
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'alexanderzoet@gmail.com',
      password: 'Karakiet01!',
    });

    if (error) {
      console.error("❌ Login mislukt:", error.message);
      return;
    }

    console.log(`[${new Date().toISOString()}] ✅ Ingelogd als ${data.user.email}`);
    return data.session.access_token;

  } catch (err) {
    console.error("❌ Interne fout:", err);
  }
};

export const handler = async () => {
  const token = await supabaseLogin();
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      success: !!token,
      token: token ? token.slice(0, 20) + "..." : null
    })
  };
};
