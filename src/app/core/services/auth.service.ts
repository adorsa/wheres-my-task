import { Injectable, signal } from '@angular/core';
import { User, Session } from '@supabase/supabase-js';
import { SupabaseService } from './supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly user = signal<User | null>(null);
  readonly session = signal<Session | null>(null);

  constructor(private supabase: SupabaseService) {
    supabase.getClient().auth.getSession().then(({ data }) => {
      this.session.set(data.session);
      this.user.set(data.session?.user ?? null);
    });

    supabase.getClient().auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
      this.user.set(session?.user ?? null);
    });
  }

  async signIn(email: string, password: string) {
    const { error } = await this.supabase.getClient().auth.signInWithPassword({ email, password });

    if(error) throw error;
  }

  async signUp(email: string, password: string) {
    const { error } = await this.supabase.getClient().auth.signUp({ email, password });

    if(error) throw error;
  }

  async signOut() {
    const { error } = await this.supabase.getClient().auth.signOut();

    if(error) throw error;
  }
}
