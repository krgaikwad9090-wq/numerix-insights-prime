// Numerology calculation engine — pure functions, no side effects.

export type LeadInput = {
  fullName: string;
  email: string;
  mobile: string;
  dob: string; // yyyy-mm-dd
  reason: string;
};

const LETTER_VALUES: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);
const MASTER = new Set([11, 22, 33]);

export function reduceNumber(value: number, keepMaster = true): number {
  let n = value;
  while (n > 9 && !(keepMaster && MASTER.has(n))) {
    n = String(n)
      .split("")
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return n;
}

function lettersOf(name: string) {
  return name.toLowerCase().replace(/[^a-z]/g, "").split("");
}

function sumLetters(letters: string[]) {
  return letters.reduce((sum, ch) => sum + (LETTER_VALUES[ch] ?? 0), 0);
}

export function expressionNumber(fullName: string) {
  return reduceNumber(sumLetters(lettersOf(fullName)));
}

export function soulUrgeNumber(fullName: string) {
  return reduceNumber(sumLetters(lettersOf(fullName).filter((c) => VOWELS.has(c))));
}

export function personalityNumber(fullName: string) {
  return reduceNumber(sumLetters(lettersOf(fullName).filter((c) => !VOWELS.has(c))));
}

export function lifePathNumber(dob: string) {
  const [y, m, d] = dob.split("-").map(Number);
  return reduceNumber(reduceNumber(y, false) + reduceNumber(m, false) + reduceNumber(d, false));
}

export function birthdayNumber(dob: string) {
  const d = Number(dob.split("-")[2]);
  return reduceNumber(d);
}

export function personalYearNumber(dob: string, year: number) {
  const [, m, d] = dob.split("-").map(Number);
  return reduceNumber(reduceNumber(m, false) + reduceNumber(d, false) + reduceNumber(year, false), false);
}

export function maturityNumber(dob: string, fullName: string) {
  return reduceNumber(lifePathNumber(dob) + expressionNumber(fullName));
}

type Trait = { title: string; essence: string; strengths: string[]; watchOut: string; careers: string[]; relationship: string };

const TRAITS: Record<number, Trait> = {
  1: {
    title: "The Initiator",
    essence: "You are wired to start things. Independence, decisiveness and original thinking define how you move through life.",
    strengths: ["Self-starting drive", "Clear decision making", "Original ideas", "Natural leadership"],
    watchOut: "Impatience with slower people and a reluctance to ask for help.",
    careers: ["Founder / entrepreneur", "Product or project lead", "Independent consultant", "Sales leadership"],
    relationship: "You need a partner who respects your autonomy. Say what you need out loud — you assume others already know.",
  },
  2: {
    title: "The Diplomat",
    essence: "You read rooms before you speak. Cooperation, sensitivity and quiet influence are your real power.",
    strengths: ["Deep empathy", "Peace-making", "Attention to detail", "Loyal partnership"],
    watchOut: "Over-accommodating others until your own needs disappear.",
    careers: ["Counselling / therapy", "HR and people ops", "Design collaboration", "Client relationships"],
    relationship: "You give generously. Practise receiving — and set boundaries before resentment forms.",
  },
  3: {
    title: "The Communicator",
    essence: "Expression is your oxygen. Ideas, words, colour and humour move through you easily.",
    strengths: ["Creative expression", "Optimism", "Social ease", "Storytelling"],
    watchOut: "Scattering energy across too many projects and finishing few.",
    careers: ["Content and media", "Marketing / branding", "Teaching and training", "Performing arts"],
    relationship: "You bring lightness. Stay present in the hard conversations instead of deflecting with humour.",
  },
  4: {
    title: "The Builder",
    essence: "You create stability where others create noise. Systems, discipline and follow-through are your signature.",
    strengths: ["Reliability", "Structure and planning", "Endurance", "Practical problem solving"],
    watchOut: "Rigidity — treating every change as a threat to the plan.",
    careers: ["Operations and logistics", "Engineering", "Finance and audit", "Architecture / construction"],
    relationship: "You show love through dependability. Add words to your actions; partners need to hear it too.",
  },
  5: {
    title: "The Explorer",
    essence: "Freedom, variety and movement fuel you. You learn fastest by doing and by changing context.",
    strengths: ["Adaptability", "Quick learning", "Courage with change", "Persuasive energy"],
    watchOut: "Restlessness that ends things a little before they mature.",
    careers: ["Business development", "Travel and hospitality", "Journalism", "Growth marketing"],
    relationship: "Commitment feels safer when it includes space. Choose partners who travel with you, not who fence you in.",
  },
  6: {
    title: "The Nurturer",
    essence: "Responsibility finds you. Home, harmony and caring for others shape most of your major choices.",
    strengths: ["Devotion", "Aesthetic sense", "Protective instinct", "Community building"],
    watchOut: "Carrying loads that were never yours, then feeling unappreciated.",
    careers: ["Healthcare and wellness", "Education", "Interior / hospitality design", "Community leadership"],
    relationship: "You are the anchor. Let your partner care for you sometimes — it deepens the bond.",
  },
  7: {
    title: "The Seeker",
    essence: "You go beneath the surface. Analysis, solitude and inner truth matter more to you than applause.",
    strengths: ["Analytical depth", "Intuition", "Research ability", "Self-sufficiency"],
    watchOut: "Withdrawing into your head when connection is what's actually needed.",
    careers: ["Research and analytics", "Technology / data", "Writing and philosophy", "Specialist advisory"],
    relationship: "You need thinking space. Tell your partner it isn't distance — otherwise silence gets misread.",
  },
  8: {
    title: "The Achiever",
    essence: "You think in scale, results and long horizons. Material mastery and authority are part of your path.",
    strengths: ["Strategic vision", "Resilience under pressure", "Financial instinct", "Executive presence"],
    watchOut: "Measuring self-worth purely by output and outcomes.",
    careers: ["Business leadership", "Investment and finance", "Real estate", "Law and negotiation"],
    relationship: "Bring the same ambition to your personal life that you bring to work — it needs scheduling too.",
  },
  9: {
    title: "The Humanitarian",
    essence: "You see the bigger picture and feel it deeply. Service, art and compassion run through your work.",
    strengths: ["Broad perspective", "Generosity", "Creative vision", "Emotional intelligence"],
    watchOut: "Holding on to what has already completed its cycle.",
    careers: ["Non-profit and social impact", "Creative direction", "Medicine and healing", "Global / policy work"],
    relationship: "You love expansively. Make sure the person in front of you gets as much as the cause does.",
  },
  11: {
    title: "The Visionary (Master 11)",
    essence: "A heightened 2 — intuition, inspiration and sensitivity operate at unusually high voltage.",
    strengths: ["Powerful intuition", "Inspiring others", "Idealistic vision", "Spiritual awareness"],
    watchOut: "Nervous energy and self-doubt when the vision outpaces the practical steps.",
    careers: ["Coaching and mentoring", "Creative direction", "Spiritual / wellness teaching", "Innovation roles"],
    relationship: "You feel everything. Ground yourself daily so relationships get calm you, not overwhelmed you.",
  },
  22: {
    title: "The Master Builder (Master 22)",
    essence: "A heightened 4 — you can turn large visions into structures that outlast you.",
    strengths: ["Big-picture execution", "Discipline at scale", "Leadership", "Practical idealism"],
    watchOut: "Pressure from your own standards; burnout hides behind productivity.",
    careers: ["Enterprise leadership", "Large-scale projects", "Systems architecture", "Institution building"],
    relationship: "Your work can consume you. Protect unhurried time with the people you love.",
  },
  33: {
    title: "The Master Teacher (Master 33)",
    essence: "A heightened 6 — devotion, healing and teaching through example define this rare path.",
    strengths: ["Compassionate leadership", "Healing presence", "Creative teaching", "Deep responsibility"],
    watchOut: "Self-sacrifice taken past the point of sustainability.",
    careers: ["Teaching and mentoring", "Therapy and healing", "Social entrepreneurship", "Creative arts"],
    relationship: "You give abundantly. Equal partnership — not rescue — is where you thrive.",
  },
};

const PERSONAL_YEAR: Record<number, { theme: string; focus: string; months: string[] }> = {
  1: { theme: "New beginnings", focus: "Plant seeds. Start the thing you have been circling for a year.", months: ["Decide direction", "Build early momentum", "Ask for support"] },
  2: { theme: "Patience and partnership", focus: "Growth is quiet this year. Nurture relationships and let things develop.", months: ["Strengthen alliances", "Refine, don't rush", "Protect your energy"] },
  3: { theme: "Expression and visibility", focus: "Put your voice and work in front of people. Social capital compounds now.", months: ["Create publicly", "Network widely", "Finish what you start"] },
  4: { theme: "Foundation and discipline", focus: "Unglamorous work pays. Systems built this year carry the next four.", months: ["Organise finances", "Build routines", "Repair weak structures"] },
  5: { theme: "Change and freedom", focus: "Expect movement. Say yes to the opportunity that feels slightly too big.", months: ["Explore options", "Travel or relocate", "Stay flexible"] },
  6: { theme: "Responsibility and home", focus: "Family, health and commitments take centre stage. Balance care with boundaries.", months: ["Tend relationships", "Improve home base", "Reset health habits"] },
  7: { theme: "Reflection and mastery", focus: "A year to study, specialise and go inward before the next expansion.", months: ["Learn deeply", "Reduce noise", "Clarify purpose"] },
  8: { theme: "Power and reward", focus: "Money, authority and recognition are available — negotiate boldly.", months: ["Ask for more", "Invest wisely", "Lead visibly"] },
  9: { theme: "Completion and release", focus: "Close cycles. Let go of what you have outgrown to make room for a new nine-year arc.", months: ["Finish and forgive", "Declutter", "Give back"] },
};

const LUCKY_DAYS: Record<number, string> = {
  1: "Sunday & Monday", 2: "Monday & Friday", 3: "Thursday & Tuesday", 4: "Sunday & Saturday",
  5: "Wednesday & Friday", 6: "Friday & Wednesday", 7: "Monday & Sunday", 8: "Saturday & Friday",
  9: "Tuesday & Thursday", 11: "Monday & Thursday", 22: "Sunday & Saturday", 33: "Friday & Thursday",
};

const COLOURS: Record<number, string> = {
  1: "Gold, amber, deep red", 2: "Ivory, soft green, pale blue", 3: "Yellow, violet, turquoise",
  4: "Slate grey, forest green, navy", 5: "Silver, light grey, aqua", 6: "Rose, indigo, cream",
  7: "Deep blue, seafoam, pearl white", 8: "Charcoal, royal blue, black", 9: "Crimson, bronze, warm white",
  11: "Silver, moon white, pale violet", 22: "Bronze, deep teal, sand", 33: "Rose gold, sage, ivory",
};

export type NumerologyReport = ReturnType<typeof generateReport>;

export function generateReport(input: LeadInput, now: Date = new Date()) {
  const lifePath = lifePathNumber(input.dob);
  const expression = expressionNumber(input.fullName);
  const soulUrge = soulUrgeNumber(input.fullName);
  const personality = personalityNumber(input.fullName);
  const birthday = birthdayNumber(input.dob);
  const maturity = maturityNumber(input.dob, input.fullName);
  const year = now.getFullYear();
  const personalYear = personalYearNumber(input.dob, year);

  const core = TRAITS[lifePath];
  const expr = TRAITS[expression];
  const soul = TRAITS[soulUrge];
  const persona = TRAITS[personality];
  const py = PERSONAL_YEAR[personalYear] ?? PERSONAL_YEAR[1];

  const luckyNumbers = Array.from(
    new Set([lifePath, expression, birthday, reduceNumber(lifePath + expression, false)]),
  ).map((n) => (n > 9 ? reduceNumber(n, false) : n));

  const reasonFocus: Record<string, string> = {
    Career: `With Life Path ${lifePath} and Expression ${expression}, your career grows fastest when you ${expr.careers[0].toLowerCase()} style work sits at the centre of your week, not the edges.`,
    Relationship: `${core.relationship} Your Soul Urge ${soulUrge} means you privately need ${soul.essence.toLowerCase()}`,
    Business: `Your ${core.title} pattern favours ownership. Pair it with the discipline of your Expression ${expression} to convert ideas into revenue.`,
    "Self Discovery": `Your Soul Urge ${soulUrge} is the quiet engine: ${soul.essence}`,
    "Life Purpose": `Your Maturity number ${maturity} shows the version of you that consolidates after 35 — ${TRAITS[maturity].essence}`,
    "Personal Growth": `In a Personal Year ${personalYear} (${py.theme}), growth comes from one thing: ${py.focus}`,
    Other: `Your combination of Life Path ${lifePath} and Soul Urge ${soulUrge} shapes almost every decision you make. ${core.essence}`,
  };

  return {
    input,
    generatedAt: now.toISOString(),
    year,
    numbers: { lifePath, expression, soulUrge, personality, birthday, maturity, personalYear },
    core,
    expression: expr,
    soul,
    persona,
    maturityTrait: TRAITS[maturity],
    personalYear: { number: personalYear, ...py },
    lucky: {
      numbers: luckyNumbers,
      days: LUCKY_DAYS[lifePath] ?? LUCKY_DAYS[1],
      colours: COLOURS[lifePath] ?? COLOURS[1],
    },
    focus: reasonFocus[input.reason] ?? reasonFocus.Other,
    actions: [
      `Block two hours each week for work that uses your ${core.title.replace("The ", "").toLowerCase()} strength directly.`,
      `Name your biggest watch-out — ${core.watchOut.toLowerCase()} — and pick one habit that counters it this month.`,
      `Align this year's single biggest decision with your Personal Year ${personalYear} theme: ${py.theme.toLowerCase()}.`,
    ],
    summary: `${input.fullName.trim()}, you carry a Life Path ${lifePath} — ${core.title}. ${core.essence} Your name adds an Expression ${expression} (${expr.title}) and a Soul Urge ${soulUrge} (${soul.title}), so the world meets you as ${persona.title.replace("The ", "a ")} while your inner motive stays ${soul.title.replace("The ", "").toLowerCase()}. Through ${year} you are in a Personal Year ${personalYear}: ${py.theme.toLowerCase()}.`,
  };
}

export const TRAIT_TABLE = TRAITS;
