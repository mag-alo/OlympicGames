// This file contains the Participation interface which defines the structure of a participation object.
// It includes properties such as id, year, city, medals count, and athlete count.
export interface Participation{
    id: number;
    year: number;
    city: String;
    medalsCount: number;
    athleteCount: number;
}