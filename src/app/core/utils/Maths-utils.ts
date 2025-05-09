// Maths Uilities
import { Participation } from '../models/Participation';

// otal of medals or of athletes for all olympic games calcul
export function calculateTotal(participations: Participation[], param: string): number {
  if (param === 'athleteCount') {
    return participations.reduce((total, participation) => total + participation.athleteCount, 0);
  }
  return participations.reduce((total, participation) => total + participation.medalsCount, 0);
} 