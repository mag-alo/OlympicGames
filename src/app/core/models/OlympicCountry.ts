// This file defines the OlympicCountry interface, which represents a country participating in the Olympics.
// It includes the country's ID, name, and an array of participations. Each participation contains details about the Olympic event, including the year, athlete count, and medals won.
import { Participation } from "./Participation";

export interface OlympicCountry {
    id: number,
    country: string,
    participations: Participation[];
}