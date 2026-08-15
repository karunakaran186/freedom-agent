export interface FreedomMapSchema {
  freedomFrom: string;
  freedomToward: string;
  coreContext: string;
  factors: string[];
  firstStep: string;
  freedomStatement: string;
}

export function sanitizeAndValidateOutput(parsed: any, fallbackInput: string): FreedomMapSchema {
  return {
    freedomFrom: typeof parsed?.freedomFrom === 'string' && parsed.freedomFrom.trim().length > 0
      ? parsed.freedomFrom.trim().slice(0, 120)
      : 'Lingering doubt & invisible friction',
    freedomToward: typeof parsed?.freedomToward === 'string' && parsed.freedomToward.trim().length > 0
      ? parsed.freedomToward.trim().slice(0, 120)
      : 'Uncompromised clarity & forward momentum',
    coreContext: typeof parsed?.coreContext === 'string' && parsed.coreContext.trim().length > 0
      ? parsed.coreContext.trim().slice(0, 180)
      : fallbackInput.slice(0, 180),
    factors: Array.isArray(parsed?.factors) && parsed.factors.length > 0
      ? parsed.factors.slice(0, 4).map((f: any) => String(f).trim().slice(0, 80))
      : [
          'Fear of making the wrong trade-off',
          'Financial & emotional runway',
          'Clear boundaries with external opinions',
          'Daily consistent micro-actions'
        ],
    firstStep: typeof parsed?.firstStep === 'string' && parsed.firstStep.trim().length > 0
      ? parsed.firstStep.trim().slice(0, 160)
      : 'Commit to one decisive step within the next 24 hours.',
    freedomStatement: typeof parsed?.freedomStatement === 'string' && parsed.freedomStatement.trim().length > 0
      ? parsed.freedomStatement.trim().slice(0, 120)
      : 'I choose purposeful courage over prolonged hesitation.'
  };
}

export function heuristicFallback(input: string): FreedomMapSchema {
  const clean = input.trim();
  const lower = clean.toLowerCase();

  if (lower.includes('job') || lower.includes('career') || lower.includes('boss') || lower.includes('work')) {
    return {
      freedomFrom: 'Corporate inertia and fear of the unknown',
      freedomToward: 'Career autonomy and authentic professional ownership',
      coreContext: clean,
      factors: [
        'Financial transition runway (6 months)',
        'Personal skill validation',
        'Fear of regret vs fear of risk',
        'Deliberate timeline execution'
      ],
      firstStep: 'Carve out 5 hours this week to map your minimum viable transition strategy.',
      freedomStatement: 'I choose calculated courage over comfortable stagnation.'
    };
  }

  if (lower.includes('money') || lower.includes('financial') || lower.includes('debt') || lower.includes('house') || lower.includes('earn')) {
    return {
      freedomFrom: 'Financial anxiety and scarcity loops',
      freedomToward: 'Financial sovereignty, resilience, and quiet confidence',
      coreContext: clean,
      factors: [
        'Cash flow clarity over vague fears',
        'Separating net worth from self-worth',
        'Systematic asset growth',
        'Actionable high-leverage habits'
      ],
      firstStep: 'Audit your last 90 days of cash flow to replace guesswork with concrete numbers.',
      freedomStatement: 'I choose financial mastery over reactive worry.'
    };
  }

  if (lower.includes('overthink') || lower.includes('doubt') || lower.includes('fear') || lower.includes('mind') || lower.includes('stuck')) {
    return {
      freedomFrom: 'Looping analysis paralysis and chronic second-guessing',
      freedomToward: 'Decisive clarity, self-trust, and inner peace',
      coreContext: clean,
      factors: [
        'Distinguishing real risk from imagined catastrophe',
        'Embracing good-enough 70% decisions',
        'Quieting external noise',
        'Reclaiming active momentum'
      ],
      firstStep: 'Identify the decision you have avoided the longest and choose your direction today.',
      freedomStatement: 'I choose quiet conviction over loud overthinking.'
    };
  }

  return {
    freedomFrom: 'Hesitation and unspoken limitations',
    freedomToward: 'Direct agency, freedom of choice, and self-liberation',
    coreContext: clean,
    factors: [
      'The silent cost of staying unchanged',
      'Reframing fear into fuel for momentum',
      'Daily micro-commitments to yourself',
      'Stepping into your 2026 sovereignty'
    ],
    firstStep: 'Take one concrete, irreversible micro-action within the next 24 hours.',
    freedomStatement: 'I choose my freedom today over lingering doubt tomorrow.'
  };
}
