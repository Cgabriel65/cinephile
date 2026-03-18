import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_ANON_KEY
    );
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)  
      .eq('password', password)
      .maybeSingle();

    if (error || !data) return null;
    return data;
  }


  async createUser(email: string, password: string, name?: string) {
    const existing = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (existing.data) return null;

    const { data, error } = await this.supabase
      .from('users')
      .insert({ email, password, name })
      .select()
      .single();

    if (error) return null;
    return data;
  }
}

