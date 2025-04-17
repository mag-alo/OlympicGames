import { Participation } from "./Participation";

export interface OlympicCountry {
    id: number,
    country: String,
    participations: Participation[];
}