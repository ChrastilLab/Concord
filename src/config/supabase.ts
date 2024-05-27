import { createClient, SupabaseClient } from "@supabase/supabase-js";


const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseKey: string = process.env.REACT_APP_SUPABASE_API_KEY || "";

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);


async function handleGoogleSignIn() {

    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            scopes:
                "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/docs  https://www.googleapis.com/auth/spreadsheets",
        },
    });

    if (error) {
        console.error(error);
    }
}

export {supabase, handleGoogleSignIn};
