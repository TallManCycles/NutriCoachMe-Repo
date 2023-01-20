import React from 'react'
import { supabase } from './supabaseClient';

const getSupabaseClient = async () => {

    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        let { data: clients } = await supabase
          .from('clients')
          .select()
          .eq('email',user.email)

        if (clients.length > 0) {
          return clients[0];
        } else {
            return [];
        }
      }
}

export default getSupabaseClient;
