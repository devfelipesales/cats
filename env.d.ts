declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
  }
}
