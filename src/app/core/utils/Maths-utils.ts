//Calculs
import { Participation } from '../models/Participation';

// This function calculates the total for all olympic games
export function calculateTotal(participations: Participation[], param: string): number {
  if (param === 'athleteCount') {
    return participations.reduce((total, participation) => total + participation.athleteCount, 0);
  }
  return participations.reduce((total, participation) => total + participation.medalsCount, 0);
} 