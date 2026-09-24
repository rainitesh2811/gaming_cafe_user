'use client'

import { Button } from '@/components/ui/button'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { Coffee, Sparkles } from 'lucide-react'
import { useState, type FormEvent } from 'react'

type SignupProps = { onAuthenticated: () => void; onLogin: () => void }

export function Signup({ onAuthenticated, onLogin }: SignupProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Add the public Supabase keys to .env.local, then restart the dev server.')
      return
    }
    setIsSubmitting(true)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    if (signUpError) setError(signUpError.message)
    else if (!data.session) setError('Account created. Check your email to confirm your account, then log in.')
    else onAuthenticated()
    setIsSubmitting(false)
  }

  async function handleGoogleSignup() {
    setError('')
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Add the public Supabase keys to .env.local, then restart the dev server.')
      return
    }
    setIsSubmitting(true)
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://gamingcafeuser.vercel.app/' },
    })
    if (googleError) {
      setError(googleError.message)
      setIsSubmitting(false)
    }
  }

  return <main className="min-h-screen bg-[#090b14] px-5 py-8 text-[#f5f7ff] sm:px-10"><div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-between"><header><div className="flex items-center gap-2.5"><span className="flex size-9 items-center justify-center rounded-xl bg-[#f5f7ff] text-[#6df6f0]"><Coffee className="size-5" /></span><span className="font-serif text-xl font-semibold tracking-tight text-[#f5f7ff]">LevelUp Gaming Cafe</span></div></header><section className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr]"><div className="max-w-xl"><span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#222743] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.16em] text-[#a66116]"><Sparkles className="size-3.5" /> Your gaming cafe, in sync</span><h1 className="font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">Power every session a little better.</h1><p className="mt-6 max-w-md text-base leading-7 text-[#8e94ac]">A calmer way to manage your cafe, understand your customers, and keep the good stuff flowing.</p></div><div className="rounded-3xl border border-[#282d42] bg-[#15192a] p-7 shadow-[0_20px_60px_-24px_rgba(85,52,25,.25)] sm:p-9"><div className="mb-7 flex gap-6 border-b border-[#eee5d9]"><button type="button" onClick={onLogin} className="pb-3 text-sm font-semibold text-[#a4978c]">Log in</button><button type="button" className="border-b-2 border-[#ad7cff] pb-3 text-sm font-semibold text-[#f5f7ff]">Create account</button></div><button type="button" onClick={handleGoogleSignup} disabled={isSubmitting} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#e7ded2] bg-[#f5f7ff] text-sm font-semibold text-[#15192a] transition hover:bg-[#e8d9c8] disabled:cursor-not-allowed disabled:opacity-60"><span className="text-base font-bold">G</span> Continue with Google</button><div className="my-5 flex items-center gap-3 text-xs text-[#a4978c]"><span className="h-px flex-1 bg-[#282d42]" /> or continue with email <span className="h-px flex-1 bg-[#282d42]" /></div><form onSubmit={handleSubmit} className="space-y-4"><label className="block text-sm font-medium">Full name<input required value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e7ded2] bg-[#0d101d] px-4 py-3 outline-none transition focus:border-[#c78a43]" placeholder="Alex Morgan" /></label><label className="block text-sm font-medium">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e7ded2] bg-[#0d101d] px-4 py-3 outline-none transition focus:border-[#c78a43]" placeholder="you@example.com" /></label><label className="block text-sm font-medium">Password<input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e7ded2] bg-[#0d101d] px-4 py-3 outline-none transition focus:border-[#c78a43]" placeholder="********" /></label>{error && <p role="alert" className="text-sm text-amber-300">{error}</p>}<Button disabled={isSubmitting} className="mt-2 h-12 w-full rounded-xl bg-[#f5f7ff] text-[#15192a] hover:bg-[#e8d9c8]">{isSubmitting ? 'Please wait...' : 'Create your account'} <span aria-hidden="true">-&gt;</span></Button></form><p className="mt-5 text-center text-xs text-[#a4978c]">By continuing, you agree to our Terms and Privacy Policy.</p></div></section><footer className="flex justify-between text-xs text-[#a4978c]"><span>(c) 2024 LevelUp Gaming Cafe</span><span>Made for better mornings.</span></footer></div></main>
}
