import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, Clock3, Edit3, Info, LoaderCircle, MapPin, Network, PackageCheck, RefreshCw, ShieldCheck, Sparkles, UsersRound, X } from 'lucide-react';
import { Link } from 'wouter';
import { useCreateMatchingPlan, useListProducerClusters } from '@workspace/api-client-react';
import type { MatchingResult, ParsedRequirement } from '@workspace/api-client-react';
import { parseRequirement as parseRequirementText } from '@/lib/parseRequirement';
import { sampleRequirement } from './Home';

type Step = 'write' | 'review' | 'result';

function formatINR(value: number) {
  return `₹${new Intl.NumberFormat('en-IN').format(Math.round(value))}`;
}

export default function Match() {
  const clustersQuery = useListProducerClusters();
  const matchingPlan = useCreateMatchingPlan();
  const [step, setStep] = useState<Step>('write');
  const [requirementText, setRequirementText] = useState(sampleRequirement);
  const [parsed, setParsed] = useState<ParsedRequirement>(() => parseRequirementText(sampleRequirement));
  const [parseError, setParseError] = useState('');
  const [openAllocation, setOpenAllocation] = useState<number | null>(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [result, setResult] = useState<MatchingResult | null>(null);

  const parseRequirement = () => {
    if (requirementText.trim().length < 15) {
      setParseError('Add a little more detail so we can identify the product, quantity, and delivery need.');
      return;
    }
    setParseError('');
    setParsed(parseRequirementText(requirementText));
    setStep('review');
  };

  const updateParsed = (field: keyof ParsedRequirement, value: string | number | boolean) => {
    setParsed((current) => ({ ...current, [field]: value }));
  };

  const submitMatching = () => {
    if (!parsed.product.trim() || !parsed.location.trim() || parsed.quantity < 1 || parsed.deadlineDays < 1 || parsed.budgetPerUnit < 0) {
      setParseError('Check the highlighted details before matching.');
      return;
    }
    setParseError('');
    matchingPlan.mutate(
      {
        data: {
          requirementText,
          parsedRequirement: {
            product: parsed.product,
            quantity: parsed.quantity,
            category: parsed.category,
            location: parsed.location,
            deadlineDays: parsed.deadlineDays,
            budgetPerUnit: parsed.budgetPerUnit,
            womenLedPreference: parsed.womenLedPreference,
          },
        },
      },
      {
        onSuccess: (nextResult) => {
          setResult(nextResult);
          setOpenAllocation(0);
          setShowTimeline(false);
          setStep('result');
        },
      },
    );
  };

  const startOver = () => {
    setStep('write');
    setResult(null);
    setParseError('');
    setShowTimeline(false);
  };

  return (
    <div className="sajha-grain min-h-[100dvh] bg-background text-foreground">
      <header className="border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link href="/" className="group flex items-center gap-3" data-testid="link-match-logo">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-[-6deg]"><Network size={18} /></span>
            <span><span className="sajha-display block text-xl font-bold leading-none">sajha</span><span className="sajha-mono mt-1 block text-[8px] uppercase tracking-[0.15em] text-muted-foreground">buyer matching</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-muted-foreground sm:inline">A better brief makes a better plan.</span>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-foreground" data-testid="link-back-home"><ArrowLeft size={15} /> Home</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-5 pb-20 pt-10 sm:px-8 md:pt-14 lg:px-12">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <div className="sajha-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Buyer requirement / 01</div>
            <h1 className="sajha-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{step === 'result' ? 'A plan you can stand behind.' : 'What are you looking to make?'}</h1>
          </div>
          <div className="hidden items-center gap-2 md:flex" aria-label="Matching flow progress">
            {(['write', 'review', 'result'] as Step[]).map((item, index) => (
              <div className="flex items-center gap-2" key={item}>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${step === item || (step === 'result' && item !== 'write') ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'}`}>{index + 1}</span>
                {index < 2 && <span className="h-px w-8 bg-border" />}
              </div>
            ))}
          </div>
        </div>

        {step === 'write' && (
          <section className="sajha-enter grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm sm:p-9">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor="requirement" className="text-sm font-bold">Describe what you need in plain English</label>
                <button type="button" onClick={() => { setRequirementText(sampleRequirement); setParseError(''); }} className="inline-flex items-center gap-2 self-start rounded-full border border-primary/25 bg-secondary/20 px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-secondary/40 sm:self-auto" data-testid="button-try-sample-order">
                  <Sparkles size={13} /> Try Sample Order
                </button>
              </div>
              <div className="sajha-mono mt-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Plain language is perfect</div>
              <textarea id="requirement" value={requirementText} onChange={(event) => { setRequirementText(event.target.value); setParseError(''); }} className="sajha-field mt-5 min-h-[210px] w-full resize-y rounded-2xl border border-input bg-background px-5 py-4 text-lg leading-8 text-foreground placeholder:text-muted-foreground/60" data-testid="input-requirement" placeholder="Tell us what you need, where it needs to go, and when..." />
              {parseError && <div className="mt-3 flex items-start gap-2 text-sm font-medium text-destructive" data-testid="text-requirement-error"><X size={16} className="mt-0.5 shrink-0" />{parseError}</div>}
              <div className="mt-6 flex flex-col justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Sparkles size={14} className="text-primary" /> We’ll show every field before anything is submitted.</div>
                <button type="button" onClick={parseRequirement} className="sajha-button inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground" data-testid="button-parse-requirement">Review the brief <ArrowRight size={16} /></button>
              </div>
            </div>
            <aside className="rounded-[28px] border border-border bg-secondary/20 p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-foreground"><Info size={20} /></div>
              <h2 className="sajha-display mt-8 text-2xl font-semibold">A note on how SAJHA works</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">This isn’t a search box. Your brief is read against real cluster capacity, past fulfillment, location, and your preferences — then assembled into one practical allocation.</p>
              <div className="mt-8 space-y-4">
                {['No bidding or lead marketplace', 'Every recommendation has a reason', 'You can edit the brief before matching'].map((item) => <div className="flex items-center gap-3 text-sm font-medium" key={item}><span className="flex h-6 w-6 items-center justify-center rounded-full bg-card text-primary"><Check size={14} /></span>{item}</div>)}
              </div>
            </aside>
          </section>
        )}

        {step === 'review' && (
          <section className="sajha-enter grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[28px] bg-sidebar p-6 text-sidebar-foreground sm:p-8">
              <div className="sajha-mono text-[10px] uppercase tracking-[0.17em] text-sidebar-primary">Your words</div>
              <p className="mt-7 text-xl leading-8">“{requirementText}”</p>
              <button type="button" onClick={() => setStep('write')} className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-sidebar-primary underline decoration-sidebar-primary/30 underline-offset-8" data-testid="button-edit-original"><Edit3 size={15} /> Edit original brief</button>
            </div>
            <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm sm:p-9">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div><div className="sajha-mono text-[10px] uppercase tracking-[0.17em] text-primary">Deterministic parse / check 02</div><h2 className="sajha-display mt-3 text-3xl font-semibold">Here’s what we heard.</h2></div>
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-secondary/30 px-3 py-1.5 text-xs font-bold text-foreground"><Check size={14} className="text-[#577441]" /> Ready to edit</span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Field label="Product" value={parsed.product} onChange={(value) => updateParsed('product', value)} id="product" wide error={!parsed.product.trim() ? 'Add a product' : undefined} />
                <Field label="Quantity" value={String(parsed.quantity)} onChange={(value) => updateParsed('quantity', Number(value))} id="quantity" type="number" suffix="units" error={parsed.quantity < 1 ? 'At least 1' : undefined} />
                <Field label="Category" value={parsed.category} onChange={(value) => updateParsed('category', value)} id="category" />
                <Field label="Delivery to" value={parsed.location} onChange={(value) => updateParsed('location', value)} id="location" error={!parsed.location.trim() ? 'Add a destination' : undefined} />
                <Field label="Deadline" value={String(parsed.deadlineDays)} onChange={(value) => updateParsed('deadlineDays', Number(value))} id="deadline" type="number" suffix="days" error={parsed.deadlineDays < 1 ? 'At least 1 day' : undefined} />
                <Field label="Budget / unit" value={String(parsed.budgetPerUnit)} onChange={(value) => updateParsed('budgetPerUnit', Number(value))} id="budget" type="number" prefix="₹" error={parsed.budgetPerUnit < 0 ? 'Cannot be negative' : undefined} />
              </div>
              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5 text-sm font-semibold transition-colors hover:bg-muted">
                <input type="checkbox" checked={parsed.womenLedPreference} onChange={(event) => updateParsed('womenLedPreference', event.target.checked)} className="h-4 w-4 accent-[hsl(var(--primary))]" data-testid="input-women-led" />
                Prefer women-led clusters
                <span className="ml-auto text-xs font-normal text-muted-foreground">a preference, not a filter</span>
              </label>
              {parseError && <div className="mt-4 flex items-start gap-2 text-sm font-medium text-destructive" data-testid="text-review-error"><X size={16} className="mt-0.5 shrink-0" />{parseError}</div>}
              <div className="mt-7 flex flex-col-reverse justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
                <button type="button" onClick={() => setStep('write')} className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground" data-testid="button-back-to-write"><ArrowLeft size={15} /> Back to brief</button>
                <button type="button" onClick={submitMatching} disabled={matchingPlan.isPending} className="sajha-button inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60" data-testid="button-submit-matching">
                  {matchingPlan.isPending ? <><LoaderCircle size={16} className="animate-spin" /> Building your plan...</> : <>Find the right collective <ArrowRight size={16} /></>}
                </button>
              </div>
              {matchingPlan.isError && <div className="mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" data-testid="status-matching-error"><X size={16} /> We couldn’t build that plan just now. Please try again.</div>}
            </div>
          </section>
        )}

        {step === 'result' && result && (
          <ResultView result={result} showTimeline={showTimeline} setShowTimeline={setShowTimeline} openAllocation={openAllocation} setOpenAllocation={setOpenAllocation} startOver={startOver} clusterCount={clustersQuery.data?.length ?? 0} />
        )}

        {step === 'result' && !result && matchingPlan.isPending && (
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="h-[440px] animate-pulse rounded-[28px] bg-muted" />
            <div className="h-[440px] animate-pulse rounded-[28px] bg-muted" />
          </div>
        )}
      </main>
    </div>
  );
}

function Field({ label, value, onChange, id, type = 'text', suffix, prefix, wide = false, error }: { label: string; value: string; onChange: (value: string) => void; id: string; type?: string; suffix?: string; prefix?: string; wide?: boolean; error?: string }) {
  return (
    <label className={wide ? 'sm:col-span-2' : ''}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.11em] text-muted-foreground">{label}</span>
      <span className="relative block">
        {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">{prefix}</span>}
        <input id={id} type={type} min={type === 'number' ? 0 : undefined} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} className={`sajha-field w-full rounded-xl border ${error ? 'border-destructive/70' : 'border-input'} bg-background px-4 py-3 text-sm font-semibold ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-16' : ''}`} data-testid={`input-${id}`} />
        {suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suffix}</span>}
      </span>
      {error && <span className="mt-1.5 block text-xs font-medium text-destructive" data-testid={`text-error-${id}`}>{error}</span>}
    </label>
  );
}

function ResultView({ result, showTimeline, setShowTimeline, openAllocation, setOpenAllocation, startOver, clusterCount }: { result: MatchingResult; showTimeline: boolean; setShowTimeline: (value: boolean) => void; openAllocation: number | null; setOpenAllocation: (value: number | null) => void; startOver: () => void; clusterCount: number }) {
  const requirement = result.parsedRequirement;
  return (
    <section className="sajha-enter">
       <div className="mb-6 flex flex-col justify-between gap-4 rounded-[24px] border border-border bg-card px-5 py-4 sm:flex-row sm:items-center sm:px-7">
         <div className="flex items-start gap-3"><span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${result.feasible ? 'bg-secondary text-foreground' : 'bg-accent text-foreground'}`}><PackageCheck size={16} /></span><div><div className="text-sm font-bold">{result.feasible ? '✓ Feasible' : 'Not feasible within the available pool'}</div><div className="mt-0.5 text-xs text-muted-foreground">Pooled capacity {result.pooledCapacity.toLocaleString('en-IN')} vs required {result.requiredUnits.toLocaleString('en-IN')} · {requirement.location} · {requirement.deadlineDays} days</div></div></div>
        <div className="flex items-center gap-3"><button type="button" onClick={startOver} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground" data-testid="button-start-over"><RefreshCw size={15} /> New brief</button><span className="hidden h-5 w-px bg-border sm:block" /><span className="sajha-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">{clusterCount || 'network'} clusters considered</span></div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div><div className="sajha-mono text-[10px] uppercase tracking-[0.17em] text-primary">Pooled allocation</div><h2 className="sajha-display mt-3 text-3xl font-semibold">One order, {result.allocations.length || 0} connected clusters.</h2></div>
            <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-secondary/30 text-primary sm:flex"><Network size={20} /></div>
          </div>
           <FlowDiagram result={result} />
           <div className="mt-8 space-y-3">
            {result.allocations.length === 0 && <div className="rounded-2xl bg-muted p-5 text-sm text-muted-foreground" data-testid="empty-allocations">No allocation was returned for this brief. Try widening the location or deadline.</div>}
            {result.allocations.map((allocation, index) => <AllocationRow key={`${allocation.cluster.id}-${index}`} allocation={allocation} index={index} isOpen={openAllocation === index} onToggle={() => setOpenAllocation(openAllocation === index ? null : index)} />)}
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
             <div className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15} className="text-primary" /> Allocation favors fit, consistency, and a fair split.</div>
             <button type="button" onClick={() => setShowTimeline(!showTimeline)} className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-foreground" data-testid="button-toggle-timeline">{showTimeline ? 'Hide fulfillment plan' : 'Create Fulfillment Plan'} {showTimeline ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>
          </div>
          {showTimeline && <Timeline result={result} />}
        </div>
        <aside className="space-y-5">
          <div className="rounded-[28px] bg-sidebar p-6 text-sidebar-foreground sm:p-8">
            <div className="sajha-mono text-[10px] uppercase tracking-[0.17em] text-sidebar-primary">Plan at a glance</div>
            <div className="mt-7 grid grid-cols-2 gap-y-7">
              <Metric label="Pooled capacity" value={`${result.pooledCapacity.toLocaleString('en-IN')}`} suffix="units" />
              <Metric label="Required" value={`${result.requiredUnits.toLocaleString('en-IN')}`} suffix="units" />
              <Metric label="Order value" value={formatINR(result.projectedOrderValue)} />
              <Metric label="Estimated finish" value={`${result.estimatedCompletionDays}`} suffix="days" />
            </div>
          </div>
          <div className="rounded-[28px] border border-border bg-accent/25 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-bold"><UsersRound size={17} className="text-primary" /> People behind the plan</div>
            <div className="mt-5 flex items-end gap-3"><span className="sajha-display text-5xl font-semibold">{result.producersInvolved}</span><span className="pb-1 text-sm text-muted-foreground">producers involved</span></div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-card"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(result.capacityUtilization, 100)}%` }} /></div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>Capacity used</span><span data-testid="text-capacity-utilization">{result.capacityUtilization.toFixed(1)}%</span></div>
          </div>
          <div className="rounded-[28px] border border-border bg-card p-6">
            <div className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-primary" /><div><div className="text-sm font-bold">Delivery to {requirement.location}</div><div className="mt-1 text-xs leading-5 text-muted-foreground">The plan accounts for your {requirement.deadlineDays}-day window and ₹{requirement.budgetPerUnit} per-unit budget.</div></div></div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FlowDiagram({ result }: { result: MatchingResult }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted/35 p-4 sm:p-5" data-testid="visual-allocation-flow">
      <div className="sajha-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Order flow</div>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex min-w-[145px] items-center gap-3 rounded-2xl border border-primary/20 bg-card px-4 py-3 shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><PackageCheck size={16} /></span>
          <span><span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">One order</span><span className="block text-lg font-bold">{result.requiredUnits.toLocaleString('en-IN')}</span></span>
        </div>
        <div className="hidden h-px flex-1 bg-primary/35 md:block" />
        <div className="flex-1 space-y-2">
          {result.allocations.map((allocation) => (
            <div className="relative flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5" key={`flow-${allocation.cluster.id}`}>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
              <span className="min-w-0 flex-1 truncate text-xs font-semibold">{allocation.cluster.name}</span>
              <span className="text-xs font-bold text-primary">{allocation.units.toLocaleString('en-IN')} units</span>
              <span className="sajha-mono text-[10px] text-muted-foreground">{allocation.percentage.toFixed(1)}%</span>
            </div>
          ))}
          {result.allocations.length === 0 && <div className="rounded-xl border border-dashed border-border px-3 py-3 text-xs text-muted-foreground">No matching clusters found.</div>}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return <div><div className="text-xs text-sidebar-foreground/55">{label}</div><div className="mt-1 text-2xl font-bold">{value}{suffix && <span className="ml-1 text-xs font-normal text-sidebar-foreground/55">{suffix}</span>}</div></div>;
}

function AllocationRow({ allocation, index, isOpen, onToggle }: { allocation: MatchingResult['allocations'][number]; index: number; isOpen: boolean; onToggle: () => void }) {
  const cluster = allocation.cluster;
  return (
    <div className={`rounded-2xl border transition-colors ${isOpen ? 'border-primary/40 bg-secondary/10' : 'border-border bg-background'}`} data-testid={`card-allocation-${cluster.id}`}>
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-4 p-4 text-left sm:p-5" data-testid={`button-rationale-${cluster.id}`}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">{index + 1}</span>
        <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{cluster.name}</span><span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin size={12} /> {cluster.district}, {cluster.state} · {cluster.distanceKm} km away</span></span>
        <span className="hidden text-right sm:block"><span className="block text-lg font-bold">{allocation.units.toLocaleString('en-IN')}</span><span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">units · {allocation.percentage.toFixed(1)}%</span></span>
         <span className="flex items-center gap-2 text-xs font-semibold text-primary"><span className="hidden sm:inline">Why this allocation?</span>{isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</span>
      </button>
      <div className="flex items-center justify-between border-t border-border/70 px-4 pb-4 pt-3 sm:hidden"><span className="text-xs text-muted-foreground">Allocation</span><span className="text-sm font-bold">{allocation.units.toLocaleString('en-IN')} units · {allocation.percentage.toFixed(1)}%</span></div>
       {isOpen && <div className="grid gap-4 border-t border-primary/15 px-4 py-4 sm:grid-cols-[1fr_auto] sm:px-5"><p className="text-sm leading-6 text-muted-foreground"><span className="font-bold text-foreground">Why this allocation: </span>{allocation.rationale}</p><div className="flex flex-wrap gap-2 text-[11px] font-semibold text-muted-foreground"><span className="rounded-full bg-muted px-2.5 py-1">Quality {cluster.qualityScore.toFixed(0)}</span><span className="rounded-full bg-muted px-2.5 py-1">{cluster.onTimeRate.toFixed(0)}% on time</span>{cluster.womenLed && <span className="rounded-full bg-accent/50 px-2.5 py-1 text-foreground">Women-led</span>}</div></div>}
    </div>
  );
}

function Timeline({ result }: { result: MatchingResult }) {
  const events = [
    { icon: Check, title: 'Plan confirmed', text: 'SAJHA shares the allocation with each cluster.', days: 'Today' },
    { icon: PackageCheck, title: 'Making across clusters', text: `${result.producersInvolved} producers work in parallel, with one coordinated check-in.`, days: `Days 1–${Math.max(2, result.estimatedCompletionDays - 5)}` },
    { icon: ShieldCheck, title: 'Quality and consolidation', text: 'Finished units are checked and pooled for dispatch.', days: `Days ${Math.max(3, result.estimatedCompletionDays - 4)}–${Math.max(4, result.estimatedCompletionDays - 2)}` },
    { icon: Clock3, title: 'Ready for delivery', text: `Your ${result.parsedRequirement.location} delivery is ready inside the promised window.`, days: `By day ${result.estimatedCompletionDays}` },
  ];
  return <div className="mt-6 rounded-2xl border border-border bg-background p-5 sm:p-6" data-testid="panel-fulfillment-timeline"><div className="sajha-mono text-[10px] uppercase tracking-[0.16em] text-primary">Fulfillment timeline</div><div className="mt-5 space-y-0">{events.map(({ icon: Icon, title, text, days }, index) => <div className="relative flex gap-4 pb-5 last:pb-0" key={title}><div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground"><Icon size={15} />{index < events.length - 1 && <span className="absolute left-1/2 top-8 h-[calc(100%+1px)] w-px -translate-x-1/2 bg-border" />}</div><div className="flex flex-1 flex-col gap-1 sm:flex-row sm:justify-between"><div><div className="text-sm font-bold">{title}</div><div className="mt-1 text-xs leading-5 text-muted-foreground">{text}</div></div><span className="sajha-mono pt-1 text-[10px] text-primary">{days}</span></div></div>)}</div></div>;
}