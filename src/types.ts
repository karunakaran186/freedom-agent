export interface FreedomMapData {
  freedomFrom: string;
  freedomToward: string;
  coreContext: string;
  factors: string[];
  firstStep: string;
  freedomStatement: string;
  category?: 'career' | 'financial' | 'mindset' | 'relationship' | 'creativity' | 'health' | 'life';
  energyShift?: string;
  originalThought?: string;
}

export type AppStep = 'hero' | 'input' | 'processing' | 'map' | 'reflection';

export interface MapNode {
  id: string;
  type: 'you' | 'context' | 'from' | 'toward' | 'factor' | 'step';
  label: string;
  title: string;
  subtitle?: string;
  details?: string;
  color: string;
  accentColor: string;
  x: number;
  y: number;
  highlighted?: boolean;
}

export interface MapEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  active?: boolean;
  color?: string;
  flowDirection?: 'forward' | 'reverse';
}

export interface CounterResponse {
  count: number;
  success: boolean;
}
