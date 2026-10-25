import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { TrackInteractions } from "@/components/track/track-interactions";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import {
  clearanceDips,
  footfallIntervals,
  raceHurdles,
  speedFade,
  story,
  takeoff,
} from "@/lib/track/schematics";
import { TIKTOK_HANDLE, tiktokVideos } from "@/lib/track/tiktok";

import "./track.css";

const INSTAGRAM_URL = "https://www.instagram.com/yuseneverystride/";
const TIKTOK_URL = "https://www.tiktok.com/@yuhsondo";

export const metadata: Metadata = {
  title: "Hurdles: Training for the Individual",
  description:
    "Every hurdler faces the same barriers. That doesn't mean every hurdler should be trained the same way.",
};

const moments = [
  {
    label: "Approach",
    title: "The approach is already individual.",
    body: "Hurdlers show up with different speeds, step lengths and ways of moving. Two approaches don't need to look the same. What matters is whether each one carries the athlete into takeoff with speed, control and rhythm intact.",
  },
  {
    label: "Takeoff",
    title: "Takeoff comes out of everything before it.",
    body: "Ask for an earlier takeoff without changing speed or step length, and something else has to give: a reach, a chopped step or a higher jump.",
  },
  {
    label: "Over",
    title: "Lead leg, trail leg and arms share one job.",
    body: "Get over the barrier and land ready to sprint. Grant Holloway's races are a great place to study that transition. Just remember that footage shows what he does, not why it works for him.",
  },
  {
    label: "Landing",
    title: "Clearing the hurdle is only half the job.",
    body: "Landing, the trail leg coming through and the first steps off the barrier are one movement. Watch how this athlete turns clearance back into sprinting, rather than how closely their lead leg matches an elite one.",
  },
  {
    label: "Rhythm",
    title: "Arm action differs from one hurdler to the next.",
    body: "Treat an elite hurdler's arm action as a place to start looking. Describe what you can actually see, and hold off on giving it a purpose until there's evidence for one.",
  },
];

const takeoffReadouts = [
  "This is where this athlete's approach brings them to the barrier right now.",
  "The final step has to shrink to land on the new spot.",
  "A shorter last step, and a longer flight that needs more height to clear the barrier.",
  "Now they may have to reach, chop a step or jump higher. Changing one distance can create the very problem it was meant to fix.",
];

const athletes = [
  {
    id: "a",
    name: "Athlete A",
    factor: "Speed between hurdles",
    body: "Their clearances can look fine. The time slips away in the running between barriers.",
    focus: ["Sprint mechanics", "Speed development", "Landing into the next steps"],
    chart: "Speed across the race",
  },
  {
    id: "b",
    name: "Athlete B",
    factor: "Rhythm and consistency",
    body: "There's enough speed, but the rhythm won't hold from one barrier to the next. Some gaps get crowded, others stretch out.",
    focus: ["Approach consistency", "Timing between barriers", "Coordination"],
    chart: "Footfalls between barriers",
  },
  {
    id: "c",
    name: "Athlete C",
    factor: "Clearance and recovery",
    body: "They run well between barriers, then lose momentum around every clearance.",
    focus: ["Lead-leg recovery", "Trail-leg mechanics", "Takeoff and landing"],
    chart: "Speed around each clearance",
  },
];

const questions = [
  "What specific problem are we trying to solve?",
  "Why are we using this technique or exercise?",
  "Does the method address this athlete's actual needs?",
  "What evidence would show that the change is working?",
  "Could the change create another problem?",
];

const isNot = ["Abandoning evidence", "Ignoring coaches", "Letting athletes do whatever they want"];
const is = ["Observation", "Appropriate performance data", "Video analysis", "Qualified coaching judgment"];

// Each premise cites an entry in `research` by its number in the list.
const premises = [
  {
    title: "The same program doesn't produce the same athlete.",
    body: "Put a group on an identical, standardized program and they don't improve by the same amount. A review of this research found that individuals respond very differently to the same training, and set out the factors linked to that variation. One program for everyone means some athletes are always being trained for someone else.",
    cite: 6,
  },
  {
    title: "There is no proven perfect technique to copy.",
    body: "Biomechanists have tried to calculate the one optimal way to move. Glazier and Davids argue it can't yet be done, because the best movement depends on biological, task and environmental constraints that models don't fully capture, and they make the case for assessing athletes individually.",
    cite: 5,
  },
  {
    title: "Variation isn't automatically a fault.",
    body: "Coaching often treats any difference from the model as an error to fix. Bartlett, Wheat and Robins argue that movement variability can be functional: it can help athletes adapt and may lower injury risk. Some of what gets coached out may be doing a job.",
    cite: 4,
  },
  {
    title: "Even the barrier isn't the same for every body.",
    body: "At the 2017 World Championships, the men's hurdles stood about 7% higher relative to the athletes' height than the women's. Hanley and colleagues found that changed the movement itself: the women cleared relatively lower and took relatively longer steps. A single template ignores differences that big.",
    cite: 3,
  },
];

const research = [
  {
    authors: "McDonald, C., & Dapena, J. (1991)",
    title: "Linear kinematics of the men's 110-m and women's 100-m hurdles races",
    venue: "Medicine and Science in Sports and Exercise, 23(12), 1382–1391",
    note: "Step-by-step speeds and distances through full hurdle races.",
    href: "https://www.bisp-surf.de/Record/PU199305057037",
  },
  {
    authors: "Salo, A., & Grimshaw, P. N. (1998)",
    title: "An examination of kinematic variability of motion analysis in sprint hurdles",
    venue: "Journal of Applied Biomechanics, 14(2), 211–222",
    note: "How repeatable video measurements of hurdlers are, and which ones to trust.",
    href: "https://doi.org/10.1123/jab.14.2.211",
  },
  {
    authors: "Hanley, B., Walker, J., Paradisis, G. P., Merlino, S., & Bissas, A. (2021)",
    title: "Biomechanics of world-class men and women hurdlers",
    venue: "Frontiers in Sports and Active Living, 3, 704308",
    note: "Kinematics of 2017 World Championships finalists.",
    href: "https://doi.org/10.3389/fspor.2021.704308",
  },
  {
    authors: "Bartlett, R., Wheat, J., & Robins, M. (2007)",
    title: "Is movement variability important for sports biomechanists?",
    venue: "Sports Biomechanics, 6(2), 224–243",
    note: "Argues that variation between and within athletes can be functional, not just noise.",
    href: "https://doi.org/10.1080/14763140701322994",
  },
  {
    authors: "Glazier, P. S., & Davids, K. (2009)",
    title: "Constraints on the complete optimization of human motion",
    venue: "Sports Medicine, 39(1), 15–28",
    note: "Why a single optimal technique is hard to define, and the case for individual assessment.",
    href: "https://doi.org/10.2165/00007256-200939010-00002",
  },
  {
    authors: "Mann, T. N., Lamberts, R. P., & Lambert, M. I. (2014)",
    title: "High responders and low responders: factors associated with individual variation in response to standardized training",
    venue: "Sports Medicine",
    note: "Why the same program produces different results in different people.",
    href: "https://doi.org/10.1007/s40279-014-0197-3",
  },
  {
    authors: "Davids, K., Button, C., & Bennett, S. (2008)",
    title: "Dynamics of skill acquisition: A constraints-led approach",
    venue: "Human Kinetics",
    note: "A book on how each learner's body, task and setting shape the movement they find.",
  },
];

const tools = [
  { name: "Claude", href: "https://claude.ai" },
  { name: "ChatGPT", href: "https://chatgpt.com" },
];

const instagramTopics = [
  "Technical breakdowns of hurdle mechanics",
  "Analysis of elite hurdlers",
  "Stride length, takeoff distance, arm action and rhythm",
  "Critiques of standardized training assumptions",
  "How training needs differ between athletes",
];

// A still frame for a TikTok video: a lane running to the horizon with one barrier.
// The real player only loads when someone presses play (see initClips).
function ClipPoster() {
  return (
    <>
      <svg className="clip-lanes" viewBox="0 0 90 160" aria-hidden>
        {[-60, -15, 30, 60, 105, 150].map((x) => (
          <line key={x} x1="45" y1="62" x2={x} y2="160" />
        ))}
        <line x1="0" y1="62" x2="90" y2="62" />
        <line className="clip-bar" x1="33.5" y1="104" x2="56.5" y2="104" />
        <line className="clip-post" x1="35" y1="104" x2="35" y2="116" />
        <line className="clip-post" x1="55" y1="104" x2="55" y2="116" />
      </svg>
      <span className="clip-play" aria-hidden>
        <svg viewBox="0 0 20 20">
          <path d="M4 2 L18 10 L4 18 Z" />
        </svg>
      </span>
      <span className="clip-corner" aria-hidden>
        <span>@{TIKTOK_HANDLE}</span>
        <span data-clip-action>Play</span>
      </span>
    </>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5">
      <a href={`#ref-${n}`} aria-label={`Source ${n}`} className="font-medium text-primary no-underline hover:underline">
        {n}
      </a>
    </sup>
  );
}

function FillText({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <span key={i} data-word>
      {word}{" "}
    </span>
  ));
}

function Hurdle({ x, top, ground }: { x: number; top: number; ground: number }) {
  return (
    <g className="fill-foreground">
      <rect x={x - 3} y={top} width={6} height={ground - top} />
      <rect x={x - 12} y={top - 4} width={24} height={9} rx={2} />
      <rect x={x - 18} y={ground - 4} width={36} height={4} rx={2} />
    </g>
  );
}

function StoryFigure() {
  const { groundY, hurdle, path, footfalls, stops } = story;
  return (
    <svg viewBox={story.viewBox} className="h-auto w-full" role="img" aria-label="Path of a hurdler from approach, over one barrier, to the steps after landing">
      <line x1={16} x2={592} y1={groundY} y2={groundY} className="stroke-border" strokeWidth={2} />
      {footfalls.map((x) => (
        <ellipse key={x} cx={x} cy={groundY + 2} rx={7} ry={2.5} className="fill-muted-foreground/40" />
      ))}
      <Hurdle x={hurdle.x} top={hurdle.top} ground={groundY} />
      <path data-story-path d={path} fill="none" className="stroke-muted-foreground/35" strokeWidth={2} strokeDasharray="2 6" strokeLinecap="round" />
      <path data-story-progress d={path} fill="none" className="stroke-primary" strokeWidth={3} strokeLinecap="round" style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }} />
      <circle data-story-dot cx={130} cy={groundY} r={9} className="fill-primary stroke-card" strokeWidth={4} />
      {stops.map((x, i) => (
        <text key={x} data-story-label x={x} y={304} textAnchor="middle" className="story-label">
          {moments[i].label}
        </text>
      ))}
    </svg>
  );
}

function TakeoffFigure() {
  const { groundY, hurdle, steps, baseTakeoff, landing } = takeoff;
  return (
    <svg viewBox={takeoff.viewBox} className="h-auto w-full" role="img" aria-label="An approach of three steps into a takeoff spot before a hurdle, and the flight path over it">
      <line x1={16} x2={592} y1={groundY} y2={groundY} className="stroke-border" strokeWidth={2} />
      <Hurdle x={hurdle.x} top={hurdle.top} ground={groundY} />
      {steps.slice(1).map((x, i) => (
        <line key={x} x1={steps[i]} x2={x} y1={groundY + 16} y2={groundY + 16} className="stroke-muted-foreground/45" strokeWidth={2} strokeLinecap="round" />
      ))}
      <line data-takeoff-gap x1={steps[2]} x2={baseTakeoff} y1={groundY + 16} y2={groundY + 16} className="stroke-primary" strokeWidth={3} strokeLinecap="round" />
      {steps.map((x) => (
        <ellipse key={x} cx={x} cy={groundY + 2} rx={8} ry={3} className="fill-muted-foreground/60" />
      ))}
      <ellipse data-takeoff-ghost cx={baseTakeoff} cy={groundY + 2} rx={8} ry={3} fill="none" className="stroke-muted-foreground/60" strokeDasharray="3 3" opacity={0} />
      <path data-takeoff-arc d={`M${baseTakeoff} ${groundY} Q${(baseTakeoff + landing) / 2} 20 ${landing} ${groundY}`} fill="none" className="stroke-primary" strokeWidth={2.5} strokeDasharray="1 7" strokeLinecap="round" />
      <g data-takeoff-foot>
        <ellipse cx={baseTakeoff} cy={groundY + 2} rx={9} ry={3.5} className="fill-primary" />
      </g>
      <ellipse cx={landing} cy={groundY + 2} rx={8} ry={3} className="fill-muted-foreground/60" />
      <text x={(steps[2] + baseTakeoff) / 2 - 10} y={groundY + 34} textAnchor="middle" className="story-label">last step</text>
    </svg>
  );
}

function RaceAxis() {
  return (
    <>
      <line x1={40} x2={580} y1={170} y2={170} className="stroke-border" strokeWidth={2} />
      {raceHurdles.map((x) => (
        <line key={x} x1={x} x2={x} y1={160} y2={170} className="stroke-muted-foreground/50" strokeWidth={2} />
      ))}
      <text x={40} y={192} className="story-label">Start</text>
      <text x={580} y={192} textAnchor="end" className="story-label">Finish</text>
    </>
  );
}

function AthleteChart({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 600 200" className="h-auto w-full" aria-hidden>
      <RaceAxis />
      {id === "a" && <path data-draw d={speedFade} fill="none" className="stroke-primary" strokeWidth={3} strokeLinecap="round" />}
      {id === "b" &&
        footfallIntervals.map(({ irregular, xs }, i) =>
          xs.map((x) => (
            <circle key={`${i}-${x}`} data-pop cx={x} cy={110} r={irregular ? 5 : 4} className={irregular ? "fill-primary" : "fill-muted-foreground/50"} />
          ))
        )}
      {id === "c" && (
        <>
          {raceHurdles.map((x) => (
            <rect key={x} data-pop x={x - 14} y={40} width={28} height={120} rx={6} className="fill-primary/10" />
          ))}
          <path data-draw d={clearanceDips} fill="none" className="stroke-primary" strokeWidth={3} strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function TrackPage() {
  return (
    <div id="track-root" className="track-theme bg-background font-display text-foreground">
      <TrackInteractions rootId="track-root" />

      <header className="track-nav fixed inset-x-0 top-0 z-50">
        <nav aria-label="Main" className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6 text-sm">
          <a href="#top" className="font-semibold tracking-tight">Hurdles</a>
          <ul className="hidden items-center gap-6 text-foreground/75 md:flex">
            <li><a className="transition-colors hover:text-foreground" href="#argument">Argument</a></li>
            <li><a className="transition-colors hover:text-foreground" href="#moments">One barrier</a></li>
            <li><a className="transition-colors hover:text-foreground" href="#takeoff">Takeoff</a></li>
            <li><a className="transition-colors hover:text-foreground" href="#athletes">Athletes</a></li>
            <li><a className="transition-colors hover:text-foreground" href="#method">Method</a></li>
          </ul>
          <div className="flex items-center gap-5">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              Instagram <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              TikTok <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <ParallaxComponent
          subtitle="Training for the individual"
          title="Hurdles"
          images={[
            { src: "/track/backdrop.svg" },
            { src: "/track/far-track.svg" },
            { src: "/track/near-track.svg" },
          ]}
        >
          <div className="mx-auto max-w-3xl text-center">
            <blockquote className="font-serif text-balance text-3xl italic leading-snug sm:text-5xl">
              &ldquo;Every hurdler faces the same barriers. That doesn&rsquo;t mean every hurdler should be trained the same way.&rdquo;
            </blockquote>
            <p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              A closer look at hurdle technique. What the usual model gets right, where it holds athletes back, and how to tell whether a method actually fits the person using it.
            </p>
            <a href="#argument" className="mt-10 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium transition-colors hover:border-primary hover:text-primary">
              Start with the argument <ArrowDown className="size-4" aria-hidden />
            </a>
          </div>
        </ParallaxComponent>

        <section id="argument" className="scroll-mt-12 px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-6xl">
          <h2 data-fill-text className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            <FillText text="Hurdlers are coached as if there’s one right way to move. The research doesn’t back that up." />
          </h2>
          <p data-reveal className="mt-8 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">
            Copying one model for every hurdler feels safe. Four findings suggest it&rsquo;s closer to a guess.
          </p>

          <ol className="mt-20 grid gap-x-16 md:grid-cols-2">
            {premises.map((p, i) => (
              <li data-reveal key={p.title} className="grid grid-cols-[2rem_1fr] border-t border-foreground/80 py-8 sm:py-10">
                <span className="pt-1.5 text-sm font-medium tabular-nums text-primary">{i + 1}</span>
                <div>
                  <h3 className="text-balance text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                    {p.body}
                    <Cite n={p.cite} />
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-20 max-w-3xl border-l-2 border-primary pl-6 sm:pl-10">
            <p data-reveal className="text-pretty font-serif text-2xl leading-snug sm:text-4xl">
              If athletes respond differently, no technique is provably best, variation can be useful, and the barrier fits bodies differently, then one template for everyone is mostly habit.
            </p>
            <p data-reveal className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed">
              A more rigorous approach treats every model as a hypothesis and tests it on the athlete in front of you.
            </p>
          </div>

          <div data-reveal className="mt-24 grid gap-10 border-t border-border pt-12 md:grid-cols-[1fr_1.4fr]">
            <h3 className="text-2xl font-semibold tracking-tight">&ldquo;But the standard model works for plenty of athletes.&rdquo;</h3>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                It does, and that&rsquo;s exactly why it&rsquo;s worth keeping. Drills, step patterns and technical models hold a lot of hard-won coaching knowledge, and they give young hurdlers a shared place to start.
              </p>
              <p>
                I&rsquo;m not saying the model is wrong. Working for many athletes just isn&rsquo;t the same as working for this one. When it&rsquo;s applied on autopilot, because everyone does this drill or a champion moves this way, nobody checks how this athlete actually responds. That check is what this page is about.
              </p>
            </div>
          </div>
          </div>
        </section>

        <section id="moments" data-story className="scroll-mt-12 bg-card">
          <div className="mx-auto max-w-6xl px-6 pt-28 sm:pt-36">
            <h2 data-reveal className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">What happens over one barrier</h2>
            <p data-reveal className="mt-5 max-w-xl text-lg text-muted-foreground">What to watch, from the approach to the first steps after landing.</p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-x-16 px-6 pb-20 lg:grid-cols-[1.15fr_1fr]">
            <div className="sticky top-14 z-10 -mx-6 bg-card px-6 py-4 lg:top-24 lg:mx-0 lg:h-fit lg:px-0 lg:py-0 lg:pt-16">
              <div className="story-figure rounded-sm border border-border bg-background p-4 sm:p-8">
                <StoryFigure />
              </div>
            </div>
            <ol className="lg:pt-8">
              {moments.map(({ label, title, body }, i) => (
                <li key={label} data-story-step data-x={story.stops[i]} className="story-step flex min-h-[46vh] flex-col justify-center py-10 lg:min-h-[78vh]">
                  <h3 className=" text-balance text-2xl font-semibold tracking-tight sm:text-4xl">{title}</h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto max-w-6xl px-6 pb-28">
            <p data-reveal className="max-w-2xl font-serif text-2xl italic leading-snug sm:text-3xl">
              A sprint hurdle race asks for this ten times. Every clearance is tied to the steps before and after it, so a problem rarely lives in one hurdle or one body part.
            </p>
          </div>
        </section>

        <section id="takeoff" data-takeoff className="scroll-mt-12 px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <h2 data-reveal className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Move the takeoff spot and see what else has to change</h2>
              <p data-reveal className="mt-5 text-lg text-muted-foreground">Same athlete, same speed, same step length. Only the takeoff spot moves.</p>
            </div>
            <div data-reveal className="takeoff-card mt-14 rounded-sm border border-border bg-card p-5 sm:p-10">
              <TakeoffFigure />
              <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_1.1fr] sm:items-center">
                <div>
                  <label htmlFor="takeoff-range" className="text-sm font-medium">Ask for an earlier takeoff</label>
                  <input id="takeoff-range" data-takeoff-input type="range" min={0} max={100} defaultValue={0} className="takeoff-range mt-3 w-full" />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>Where they take off now</span>
                    <span>Much earlier</span>
                  </div>
                </div>
                <div aria-live="polite" className="min-h-[4.5rem] font-serif text-xl leading-snug">
                  {takeoffReadouts.map((t, i) => (
                    <p key={i} data-takeoff-readout hidden={i !== 0}>{t}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="athletes" className="scroll-mt-12 bg-card px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <h2 data-reveal className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Three hurdlers, three different places they lose time</h2>
            <p data-reveal className="mt-5 max-w-xl text-lg text-muted-foreground">Three hypothetical athletes in the same race. Pick one to see where an analysis might start.</p>

            <div data-reveal data-tabs className="mt-12" style={{ ["--tab-count" as string]: 3 }}>
              <div role="tablist" aria-label="Choose an athlete" className="segmented">
                {athletes.map((a, i) => (
                  <button key={a.id} id={`tab-${a.id}`} role="tab" type="button" aria-selected={i === 0} aria-controls={`panel-${a.id}`} tabIndex={i === 0 ? 0 : -1}>
                    {a.name}
                  </button>
                ))}
              </div>
              {athletes.map((a, i) => (
                <div key={a.id} id={`panel-${a.id}`} role="tabpanel" aria-labelledby={`tab-${a.id}`} hidden={i !== 0} className="mt-10 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{a.factor}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{a.body}</p>
                    <p className="mt-6 text-sm font-medium">Where an analysis might start</p>
                    <ul className="mt-2 text-lg leading-relaxed">
                      {a.focus.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <figure>
                    <AthleteChart id={a.id} />
                    <figcaption className="mt-2 text-sm text-muted-foreground">{a.chart}. A schematic shape, not real data.</figcaption>
                  </figure>
                </div>
              ))}
            </div>

            <p data-reveal className="mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              These are sketches, not diagnoses or prescriptions. Real hurdlers rarely have just one limiting factor, and each one needs their own assessment. Give all three the same fix and you might solve the right problem for one athlete and the wrong one for the other two.
            </p>
          </div>
        </section>

        <section id="method" className="scroll-mt-12 px-6 py-28 sm:py-36">
          <div className="mx-auto max-w-6xl">
            <h2 data-reveal className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Before you change the athlete, question the method.</h2>
            <p data-reveal className="mt-5 max-w-xl text-lg text-muted-foreground">Five questions for any drill, cue or technical change. Ask them in this order.</p>
            <ol className="mt-14 space-y-6">
              {questions.map((q, i) => (
                <li data-reveal key={q} className="flex items-baseline gap-5 border-b border-border pb-6 sm:gap-8">
                  <span className="w-6 shrink-0 text-lg font-medium tabular-nums text-primary">{i + 1}</span>
                  <span className="text-balance text-2xl font-medium tracking-tight sm:text-4xl">{q}</span>
                </li>
              ))}
            </ol>

            <div data-reveal className="mt-20 grid gap-12 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">What individualization involves</h3>
                <ul className="mt-4 divide-y divide-border border-y border-border text-lg">
                  {is.map((t) => (
                    <li key={t} className="py-3">{t}</li>
                  ))}
                </ul>
                <p className="mt-4 text-muted-foreground">Used together to check whether a method fits the athlete, instead of applying it without looking.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">What it doesn&rsquo;t mean</h3>
                <ul className="mt-4 divide-y divide-border border-y border-border text-lg text-muted-foreground">
                  {isNot.map((t) => (
                    <li key={t} className="py-3">{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="philosophy" className="bg-card px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-6xl">
            <h2 className="sr-only">My philosophy</h2>
            <p data-reveal className="max-w-4xl text-balance font-serif text-3xl italic leading-snug sm:text-5xl">
              I want to know why a training method works, not just whether a successful athlete uses it.
            </p>
            <p data-reveal className="mt-10 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              The same barrier can cause different problems for different hurdlers. I&rsquo;m not trying to swap one rigid system for another. I want to question assumptions, study performance up close, and keep asking whether a method is actually serving the athlete who uses it.
            </p>
          </div>
        </section>

        <section id="instagram" className="px-6 py-24 sm:py-32">
          <div data-reveal className="mx-auto grid max-w-6xl gap-12 border-t border-foreground/80 pt-12 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">More on Instagram and TikTok</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
                This page lays out the argument. Instagram and TikTok are where I put it to work, one race and one movement at a time.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-primary pb-1 font-medium text-primary transition-colors hover:text-foreground">
                  Instagram @yuseneverystride <ArrowUpRight className="size-4" aria-hidden />
                </a>
                <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-primary pb-1 font-medium text-primary transition-colors hover:text-foreground">
                  TikTok @yuhsondo <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>
            <ul className="text-lg">
              {instagramTopics.map((t) => (
                <li key={t} className="border-b border-border py-3 first:pt-0">{t}</li>
              ))}
            </ul>
          </div>

          <div data-reveal className="mx-auto mt-20 max-w-6xl">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-border pt-4">
              <h3 className="text-xl font-semibold tracking-tight">Recent on TikTok</h3>
              <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                All videos at @{TIKTOK_HANDLE} <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
            <ul data-clips className="clip-list mt-6">
              {tiktokVideos.map((v, i) => (
                <li key={v.id} className="clip">
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noreferrer"
                    data-clip={v.id}
                    className="clip-frame"
                    aria-label={`Play TikTok video ${i + 1}${v.title ? `: ${v.title}` : ""}`}
                  >
                    <ClipPoster />
                  </a>
                  <p className="clip-cap">
                    <span>{v.title}</span>
                    <a href={v.href} target="_blank" rel="noreferrer">
                      Open on TikTok <ArrowUpRight className="inline size-3.5" aria-hidden />
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <p data-reveal className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Study the athlete in front of you before you copy someone else&rsquo;s.
          </p>
          <section aria-labelledby="sources-h" className="mt-16 border-t border-border pt-10">
            <h2 data-reveal id="sources-h" className="text-xl font-semibold tracking-tight">Sources and further reading</h2>
            <p data-reveal className="mt-2 max-w-2xl text-muted-foreground">
              Research on hurdle technique, movement variability and individual responses to training that sits behind the ideas on this page.
            </p>
            <ol className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
              {research.map((r, i) => (
                <li data-reveal key={r.title} id={`ref-${i + 1}`} className="min-w-0 scroll-mt-24 text-sm leading-relaxed">
                  <p className="text-muted-foreground">
                    <span className="mr-2 font-medium tabular-nums text-primary">{i + 1}</span>
                    {r.authors}
                  </p>
                  <p className="mt-0.5 font-medium">
                    {r.href ? (
                      <a href={r.href} target="_blank" rel="noreferrer" className="underline decoration-border underline-offset-4 transition-colors hover:decoration-primary">
                        {r.title}
                      </a>
                    ) : (
                      r.title
                    )}
                  </p>
                  <p className="font-serif italic text-muted-foreground">{r.venue}</p>
                  <p className="mt-1 text-muted-foreground">{r.note}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm text-muted-foreground">
              Written and built with help from{" "}
              {tools.map(({ name, href }, i) => (
                <span key={name}>
                  {i > 0 && " and "}
                  <a href={href} target="_blank" rel="noreferrer" className="underline decoration-border hover:decoration-primary">
                    {name}
                  </a>
                </span>
              ))}
              .
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
}
