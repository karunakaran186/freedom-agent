import { FreedomMapData, MapNode, MapEdge } from '../types';

export const POPULAR_PROMPTS = [
  "Overthinking every major life decision",
  "Financial stress & uncertainty about the future",
  "Fear of quitting my job to start a business",
  "The pressure to constantly please everyone",
  "Imposter syndrome holding my career back",
  "Postponing my health and creative dreams"
];

// Fallback deterministic interpretation engine when offline or no API key is provided
export function generateDeterministicFreedomMap(input: string): FreedomMapData {
  const cleanInput = input.trim();
  const lower = cleanInput.toLowerCase();

  if (lower.includes('job') || lower.includes('career') || lower.includes('work') || lower.includes('boss') || lower.includes('corporate')) {
    return {
      freedomFrom: 'Corporate inertia and fear of starting over',
      freedomToward: 'Professional autonomy and purposeful career ownership',
      coreContext: cleanInput || 'Seeking greater freedom in work and professional trajectory',
      factors: [
        'Financial runway & emergency reserve',
        'Market validation of personal skills',
        'Fear of peer judgment vs regret of inaction',
        'Timeline for deliberate transition'
      ],
      firstStep: 'Carve out 5 hours this week to map your minimum viable transition plan.',
      freedomStatement: 'I choose purposeful courage over comfortable stagnation.',
      category: 'career',
      energyShift: 'Heavy hesitation → Structured momentum',
      originalThought: cleanInput
    };
  }

  if (lower.includes('money') || lower.includes('financial') || lower.includes('debt') || lower.includes('income') || lower.includes('earn') || lower.includes('house')) {
    return {
      freedomFrom: 'Financial anxiety and scarcity mindset',
      freedomToward: 'Financial sovereignty, clarity, and peace of mind',
      coreContext: cleanInput || 'Navigating monetary decisions and building long-term security',
      factors: [
        'Clear baseline budget & liquidity',
        'Decoupling self-worth from net worth',
        'Systematic asset building vs impulsive worry',
        'High-leverage income generation channels'
      ],
      firstStep: 'Audit your last 90 days of cash flow to replace guesswork with concrete numbers.',
      freedomStatement: 'I choose conscious financial mastery over reactive worry.',
      category: 'financial',
      energyShift: 'Constriction & fear → Calculated certainty',
      originalThought: cleanInput
    };
  }

  if (lower.includes('business') || lower.includes('startup') || lower.includes('entrepreneur') || lower.includes('client') || lower.includes('product')) {
    return {
      freedomFrom: 'Analysis paralysis and fear of launching publicly',
      freedomToward: 'Execution speed and customer-tested value creation',
      coreContext: cleanInput || 'Overcoming hesitation to launch and scale a business initiative',
      factors: [
        'Customer problem clarity over perfectionism',
        'Minimum viable offer tested in 7 days',
        'Tolerating early friction as data',
        'Consistent daily distribution habits'
      ],
      firstStep: 'Speak to 3 real target customers or publish a simple pre-launch offer this week.',
      freedomStatement: 'I choose decisive action over perpetual planning.',
      category: 'creativity',
      energyShift: 'Perfectionist stall → Rapid real-world feedback',
      originalThought: cleanInput
    };
  }

  if (lower.includes('think') || lower.includes('overthink') || lower.includes('mind') || lower.includes('doubt') || lower.includes('fear') || lower.includes('anxiety')) {
    return {
      freedomFrom: 'Looping thoughts and the illusion of certainty',
      freedomToward: 'Internal clarity, trust, and present-moment ease',
      coreContext: cleanInput || 'Untangling mental loops to make grounded, peaceful decisions',
      factors: [
        'Distinguishing real risks from imagined catastrophes',
        'Trusting self-correction after action',
        'Setting strict decision deadlines',
        'Reclaiming mental bandwidth for what matters'
      ],
      firstStep: 'Write down the single decision you are delaying and make a 70% confidence choice today.',
      freedomStatement: 'I choose quiet conviction over noisy overthinking.',
      category: 'mindset',
      energyShift: 'Mental fog → Razor-sharp simplicity',
      originalThought: cleanInput
    };
  }

  if (lower.includes('people') || lower.includes('family') || lower.includes('relationship') || lower.includes('pleas') || lower.includes('say no')) {
    return {
      freedomFrom: 'People-pleasing and external validation seeking',
      freedomToward: 'Unapologetic boundaries and authentic self-expression',
      coreContext: cleanInput || 'Establishing healthy boundaries while maintaining love and respect',
      factors: [
        'Clarity on personal non-negotiables',
        'Comfort with other people\'s temporary disappointment',
        'Communicating with calm firmness',
        'Investing energy in reciprocal relationships'
      ],
      firstStep: 'Say a polite, non-negotiable "no" to one obligation that drains your energy this week.',
      freedomStatement: 'I choose authentic self-respect over pleasing everyone.',
      category: 'relationship',
      energyShift: 'Self-diminishing compliance → Grounded personal power',
      originalThought: cleanInput
    };
  }

  // General default
  return {
    freedomFrom: 'Unspoken hesitation and invisible barriers',
    freedomToward: 'Unstoppable clarity and aligned personal freedom',
    coreContext: cleanInput || 'Breaking free from limitations to live with purpose',
    factors: [
      'Identifying the hidden cost of staying the same',
      'Reframing risk as the price of growth',
      'Daily micro-commitments toward your vision',
      'Unwavering trust in your capability'
    ],
    firstStep: 'Take one irreversible micro-action within the next 24 hours.',
    freedomStatement: 'I choose my freedom today over lingering doubt tomorrow.',
    category: 'life',
    energyShift: 'Passive waiting → Active liberation',
    originalThought: cleanInput
  };
}

export function buildGraphNodesAndEdges(data: FreedomMapData, isMobile: boolean = false): { nodes: MapNode[]; edges: MapEdge[] } {
  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];

  // Coordinate math based on viewport mode
  // Center is (0, 0) relative or normalized 500x500
  const cx = 500;
  const cy = 400;

  // Node 1: YOU (Center - Navy Blue Ashoka Chakra Sovereign Center)
  nodes.push({
    id: 'you',
    type: 'you',
    label: 'YOU',
    title: 'Your Core Will',
    subtitle: 'The Sovereign Decision Maker',
    details: 'You are at the focal point of India\'s 2026 freedom journey. Every breakthrough begins with a single sovereign decision.',
    color: '#1E3A8A', // Deep Navy Blue (Ashoka Chakra)
    accentColor: '#1D4ED8',
    x: cx,
    y: cy
  });

  // Node 2: CONTEXT (Navy / Slate Blue)
  nodes.push({
    id: 'context',
    type: 'context',
    label: 'YOUR CONTEXT',
    title: 'The Present Reality',
    subtitle: data.coreContext.length > 45 ? data.coreContext.slice(0, 42) + '...' : data.coreContext,
    details: data.coreContext,
    color: '#0284C7', // Sky / Azure
    accentColor: '#0369A1',
    x: isMobile ? cx : cx - 230,
    y: isMobile ? cy - 140 : cy - 50
  });

  // Node 3: FREEDOM FROM (Left Wing - Warm Saffron Amber)
  nodes.push({
    id: 'from',
    type: 'from',
    label: 'FREEDOM FROM',
    title: data.freedomFrom,
    subtitle: 'Past Weight to Shed',
    details: `Releasing: ${data.freedomFrom}. The heavy pattern, doubt, or external friction you are choosing to leave behind.`,
    color: '#EA580C', // Saffron / Orange
    accentColor: '#C2410C',
    x: isMobile ? cx - 140 : cx - 260,
    y: isMobile ? cy + 120 : cy + 130
  });

  // Node 4: FREEDOM TOWARD (Top Center - Pure Indian Saffron Kesari #FF9933)
  nodes.push({
    id: 'toward',
    type: 'toward',
    label: 'FREEDOM TOWARD',
    title: data.freedomToward,
    subtitle: 'Future Horizon of Autonomy',
    details: `Ascending toward: ${data.freedomToward}. The sovereign space of peace, achievement, and authenticity waiting for you.`,
    color: '#F97316', // Kesari Saffron
    accentColor: '#EA580C',
    x: cx,
    y: isMobile ? cy - 250 : cy - 230
  });

  // Factor Nodes (Right Wing - Saffron to Emerald Bridge)
  const factorPositions = isMobile ? [
    { x: cx + 140, y: cy - 90 },
    { x: cx + 140, y: cy + 70 },
    { x: cx + 140, y: cy + 210 }
  ] : [
    { x: cx + 240, y: cy - 100 },
    { x: cx + 250, y: cy + 40 },
    { x: cx + 240, y: cy + 180 }
  ];

  (data.factors || []).slice(0, 3).forEach((factor, idx) => {
    const pos = factorPositions[idx] || { x: cx + 220, y: cy + (idx * 110) };
    const factorColors = ['#F97316', '#2563EB', '#16A34A']; // Tricolor progression
    nodes.push({
      id: `factor-${idx + 1}`,
      type: 'factor',
      label: `STRATEGIC LEVER 0${idx + 1}`,
      title: factor,
      subtitle: 'Critical Lever',
      details: `Key strategic factor: "${factor}". Addressing this directly untangles the bottleneck holding back your breakthrough.`,
      color: factorColors[idx] || '#2563EB',
      accentColor: factorColors[idx] || '#1D4ED8',
      x: pos.x,
      y: pos.y
    });
  });

  // Node: FIRST STEP (Bottom Center - Indian Emerald Green #138808)
  nodes.push({
    id: 'step',
    type: 'step',
    label: 'YOUR FIRST STEP',
    title: data.firstStep,
    subtitle: 'Immediate Catalyst for Action',
    details: `Concrete action: "${data.firstStep}". Do not wait for ideal conditions. Execute this within the next 24-48 hours.`,
    color: '#16A34A', // Vibrant Emerald India Green
    accentColor: '#15803D',
    x: cx,
    y: isMobile ? cy + 340 : cy + 300
  });

  // Build Edges
  edges.push(
    { id: 'e-context-you', source: 'context', target: 'you', label: 'Informs', color: '#0284C7', flowDirection: 'forward' },
    { id: 'e-from-you', source: 'from', target: 'you', label: 'Releasing', color: '#EA580C', flowDirection: 'reverse' },
    { id: 'e-you-toward', source: 'you', target: 'toward', label: 'Ascending', active: true, color: '#F97316', flowDirection: 'forward' },
    { id: 'e-you-factor-1', source: 'you', target: 'factor-1', label: 'Levers', color: '#F97316', flowDirection: 'forward' },
    { id: 'e-you-factor-2', source: 'you', target: 'factor-2', color: '#2563EB', flowDirection: 'forward' },
    { id: 'e-factor-3', source: 'you', target: 'factor-3', color: '#16A34A', flowDirection: 'forward' },
    { id: 'e-factors-step', source: 'factor-2', target: 'step', label: 'Actionable', active: true, color: '#16A34A', flowDirection: 'forward' },
    { id: 'e-factors-step-2', source: 'factor-3', target: 'step', color: '#16A34A', flowDirection: 'forward' },
    { id: 'e-you-step', source: 'you', target: 'step', label: 'Execution Path', active: true, color: '#16A34A', flowDirection: 'forward' }
  );

  return { nodes, edges };
}
