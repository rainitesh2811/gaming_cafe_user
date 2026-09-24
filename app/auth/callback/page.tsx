'use client'

import { supabase } from '@/lib/supabase'
import { useEffect } from 'react'

export default function AuthCallbackPage() {
  useEffect(() => {
    async function completeSignIn() {
      const code = new URLSearchParams(window.location.search).get('code')
      if (code) await supabase.auth.exchangeCodeForSession(code)
      window.location.replace('/')
    }

    void completeSignIn()
  }, [])

  return <main className="flex min-h-screen items-center justify-center bg-[#090b14] text-[#f5f7ff]"><p>Completing sign in...</p></main>
}
