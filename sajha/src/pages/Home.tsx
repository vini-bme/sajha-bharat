import { ArrowUpRight, Check, CircleDot, HeartHandshake, MapPin, Network, Route, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { Link } from 'wouter';

const sampleRequirement = 'I need 1,000 cotton school bags for an event in Lucknow within 30 days, budget ₹180 per unit, prefer women-led producers.';
const clusterCount = 12;
const producerCount = 186;
const networkReady = true;

export default function Home() {
  

  return (
    <div className="sajha-grain min-h-[100dvh] overflow-hidden bg-background text-foreground">
      <header className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-3" data-testid="link-home-logo">
          <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-primary text-primary-foreground shadow-sm transition-transform group-hover:rotate-[-6deg]">
            <Network size={20} strokeWidth={2.3} />
          </span>
          <span>
            <span className="block sajha-display text-[1.3rem] font-bold leading-none">sajha</span>
            <span className="sajha-mono mt-1 block text-[9px] uppercase tracking-[0.17em] text-muted-foreground">rural capacity network</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#how-it-works" className="transition-colors hover:text-foreground" data-testid="link-how-it-works">How it works</a>
          <a href="#network" className="transition-colors hover:text-foreground" data-testid="link-network">The network</a>
          <Link href="/match" className="sajha-button inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2.5 font-semibold text-primary" data-testid="link-start-matching">
            I have a requirement <ArrowUpRight size={15} />
          </Link>
        </nav>
        <Link href="/match" className="sajha-button inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground md:hidden" data-testid="link-start-matching-mobile">
          Begin <ArrowUpRight size={15} />
        </Link>
      </header>

      <main>
        <section className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-20 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10 lg:px-12 lg:pt-24">
          <div className="relative z-10 max-w-[630px]">
            <div className="sajha-enter mb-7 inline-flex items-center gap-2 rounded-full border border-secondary/70 bg-secondary/20 px-3 py-1.5 text-xs font-semibold tracking-[0.02em] text-foreground">
              <span className="h-2 w-2 rounded-full bg-[#6f895d]" />
              A coordination layer for rural making
            </div>
            <h1 className="sajha-display sajha-enter sajha-enter-delay-1 max-w-[700px] text-[clamp(3.8rem,8vw,7.55rem)] font-semibold leading-[0.9] text-foreground">
                One producer
                <br />
                <span className="sajha-ink-line text-primary">can't fulfill 1,000 alone.</span>
            </h1>
            <p className="sajha-enter sajha-enter-delay-2 mt-8 max-w-[530px] text-lg leading-8 text-muted-foreground sm:text-xl">
              SAJHA turns scattered rural production into one dependable fulfillment plan — so institutional buyers can order with clarity, fairness, and confidence.
            </p>
            <div className="sajha-enter sajha-enter-delay-3 mt-9 flex flex-wrap items-center gap-4">
              <Link href="/match" className="sajha-button inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground" data-testid="link-hero-match">
                I have a requirement <ArrowUpRight size={17} />
              </Link>
              <span className="text-sm text-muted-foreground">No marketplace browsing. Just a clear plan.</span>
            </div>
          </div>

          <div className="relative mx-auto min-h-[420px] w-full max-w-[620px] lg:min-h-[520px]">
            <div className="absolute right-[3%] top-[3%] h-[83%] w-[82%] rounded-[40%_55%_48%_46%] bg-secondary/35 blur-[1px]" />
            <div className="absolute bottom-[2%] left-[10%] h-[65%] w-[75%] rounded-[54%_42%_45%_58%] border border-primary/15 bg-accent/15" />
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 620 520" fill="none" aria-label="Connected rural producer clusters">
              <path d="M105 343 C173 275 208 236 279 208 S398 149 502 113" stroke="hsl(var(--primary) / .33)" strokeWidth="1.5" strokeDasharray="5 8" />
              <path d="M122 343 C207 367 260 376 337 339 S415 264 502 113" stroke="hsl(var(--primary) / .24)" strokeWidth="1.5" strokeDasharray="5 8" />
              <path d="M150 200 C210 230 248 252 279 208 S382 184 455 286" stroke="hsl(var(--secondary-foreground) / .30)" strokeWidth="1.5" strokeDasharray="5 8" />
              <path d="M105 343 C128 384 157 408 201 411" stroke="hsl(var(--secondary-foreground) / .30)" strokeWidth="1.5" strokeDasharray="5 8" />
              <circle cx="105" cy="343" r="20" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <circle cx="279" cy="208" r="26" fill="hsl(var(--primary))" />
              <circle cx="502" cy="113" r="22" fill="hsl(var(--accent))" stroke="hsl(var(--foreground) / .16)" strokeWidth="1" />
              <circle cx="150" cy="200" r="13" fill="hsl(var(--secondary))" />
              <circle cx="455" cy="286" r="15" fill="hsl(var(--card))" stroke="hsl(var(--secondary-foreground) / .4)" strokeWidth="2" />
              <circle cx="201" cy="411" r="10" fill="hsl(var(--primary))" opacity=".6" />
              <path d="M279 198v20M269 208h20" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinecap="round" />
              <path d="M97 343h16M105 335v16" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
              <path d="M494 113h16M502 105v16" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" opacity=".55" />
            </svg>
            <div className="absolute left-[2%] top-[13%] hidden -rotate-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-md backdrop-blur-sm sm:block">
              <div className="sajha-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">producer cluster</div>
              <div className="mt-1 flex items-center gap-2 text-sm font-bold"><MapPin size={14} className="text-primary" /> Barabanki · Uttar Pradesh</div>
            </div>
            <div className="absolute bottom-[10%] right-[1%] rotate-2 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-md backdrop-blur-sm">
              <div className="sajha-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">pooled capacity</div>
              <div className="mt-1 flex items-baseline gap-1 text-xl font-bold"><span className="text-primary">1,870</span><span className="text-xs font-medium text-muted-foreground">units pooled</span></div>
            </div>
            <div className="absolute right-[23%] top-[43%] flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg">
              <Route size={21} />
            </div>
            <div className="absolute bottom-[0%] left-[20%] flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-px w-8 bg-primary/50" /> coordinated, not commodified
            </div>
          </div>
        </section>

        <section className="border-y border-border/80 bg-card/50" id="how-it-works">
          <div className="mx-auto grid max-w-[1240px] divide-y divide-border/80 px-5 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
            {[
              { number: '01', icon: Sparkles, title: 'Fragmented capacity', text: 'A single producer may be small, even when the surrounding skill is strong.' },
              { number: '02', icon: Network, title: 'Pooled with intent', text: 'SAJHA finds the right clusters and allocates the order fairly across them.' },
              { number: '03', icon: ShieldCheck, title: 'One reliable delivery', text: 'You get one clear plan, with proof behind every allocation.' },
            ].map(({ number, icon: Icon, title, text }) => (
              <div className="flex gap-4 py-7 md:flex-col md:gap-7 md:px-8 md:py-10 first:md:pl-0 last:md:pr-0" key={number}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-primary"><Icon size={18} /></div>
                <div>
                  <div className="sajha-mono text-[10px] font-bold tracking-[0.2em] text-primary">{number}</div>
                  <h2 className="sajha-display mt-2 text-2xl font-semibold">{title}</h2>
                  <p className="mt-2 max-w-[290px] text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 sm:px-8 md:grid-cols-[0.86fr_1.14fr] md:py-28 lg:px-12" id="network">
          <div>
            <div className="sajha-mono text-xs font-bold uppercase tracking-[0.17em] text-primary">The network, made visible</div>
            <h2 className="sajha-display mt-4 max-w-[450px] text-4xl font-semibold leading-[1.05] sm:text-5xl">Reliability is a collective craft.</h2>
            <p className="mt-6 max-w-[450px] leading-7 text-muted-foreground">Every allocation is grounded in what a cluster has made, what it can take on now, and how it has shown up before. No mystery black box. No race to the bottom.</p>
            <Link href="/match" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary underline decoration-primary/30 underline-offset-8 transition-colors hover:text-foreground" data-testid="link-network-cta">
              Explore a real requirement <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-[26px] bg-sidebar p-7 text-sidebar-foreground sm:row-span-2">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[22px] border-sidebar-primary/20" />
              <UsersRound size={21} className="text-sidebar-primary" />
              <div className="mt-16 sajha-display text-6xl font-semibold">{clusterCount}</div>
              <div className="mt-2 max-w-[150px] text-sm leading-5 text-sidebar-foreground/65">producer clusters ready to coordinate</div>
              <div className="absolute bottom-6 left-7 right-7 flex items-center gap-2 text-xs text-sidebar-foreground/50"><CircleDot size={12} className="text-sidebar-primary" /> live network signal</div>
            </div>
            <div className="rounded-[26px] border border-border bg-card p-6">
              <HeartHandshake size={20} className="text-primary" />
              <div className="mt-6 text-3xl font-bold">{producerCount}<span className="ml-1 text-base font-medium text-muted-foreground">makers</span></div>
              <p className="mt-1 text-sm text-muted-foreground">across craft, food, and farm-linked production</p>
            </div>
            <div className="rounded-[26px] border border-border bg-accent/25 p-6">
              <Check size={20} className="text-primary" />
              <div className="mt-6 text-3xl font-bold">1 clear plan</div>
              <p className="mt-1 text-sm text-muted-foreground">instead of a dozen unanswered calls</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 md:pb-28 lg:px-12">
          <div className="relative overflow-hidden rounded-[32px] bg-primary px-7 py-10 text-primary-foreground sm:px-12 sm:py-14">
            <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full border-[34px] border-primary-foreground/10" />
            <div className="relative z-10 max-w-[720px]">
              <div className="sajha-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/65">For teams that buy with care</div>
              <h2 className="sajha-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Bring us the requirement. We’ll bring the coordination.</h2>
              <p className="mt-5 max-w-[580px] text-base leading-7 text-primary-foreground/75">Start with the order sitting in your inbox. You’ll see exactly how a fair, pooled fulfillment plan takes shape.</p>
              <Link href="/match" className="sajha-button mt-8 inline-flex items-center gap-3 rounded-full bg-background px-6 py-3.5 text-sm font-bold text-foreground" data-testid="link-final-match">
                I have a requirement <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span className="sajha-mono tracking-[0.1em]">SAJHA / भारत में साझा क्षमता</span>
          <span data-testid="status-network-health">{networkReady ? 'Network signal: connected' : 'Network signal unavailable'}</span>
           <span className="max-w-[500px] text-center sm:text-right">We don't compete with GeM, ONDC or eSaras — we're the missing coordination layer before fulfillment.</span>
        </div>
      </footer>
    </div>
  );
}

export { sampleRequirement };
