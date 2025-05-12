/**
 * Maths Uilities
 */
import { Participation } from '../models/Participation';

/**
 * Calculates the total value of a specified property from an array of participations.
 *
 * @param participations - An array of `Participation` objects containing data to aggregate.
 * @param param - The property to sum up. Use `'athleteCount'` to calculate the total number of athletes,
 *                or any other value to calculate the total number of medals.
 * @returns The total sum of the specified property across all participations.
 */
export function calculateTotal(participations: Participation[], param: string): number {
  if (param === 'athleteCount') {
    return participations.reduce((total, participation) => total + participation.athleteCount, 0);
  }
  return participations.reduce((total, participation) => total + participation.medalsCount, 0);
} 