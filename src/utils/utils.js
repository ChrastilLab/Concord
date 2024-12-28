import { supabase } from "../config/supabase";

export const isAdmin = async (user_id, organization_id) => {
    const { data, error } = await supabase
        .from("OrganizationAdmins")
        .select("user_id")
        .eq("organization_id", organization_id);
    // const res = !error && data.length > 0 && data[0].user_type;
    // console.log(data)
    return data.some(item => item.user_id === user_id)
};