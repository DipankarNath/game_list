declare interface PlayerType {
    id?: string;
    name: string;
    age: number | null;
    team: string;
    sport: string;
}

declare interface Team {
    name: string;
    sport: string;
    playerCount: number;
}

declare interface Sport {
    name: string;
    teamCount: number;
}

declare interface DashboardState {
}

declare interface TeamMapType {
    [key: string]: { [key: string]: Array<PlayerType> };
}

declare type OnChangeType =
    | { type: "NAME"; value: string }
    | { type: "AGE"; value: number };
