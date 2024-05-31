
export interface PlayerType {
  id?: string;
  name: string;
  age: number | null;
  team: string;
  sport: string;
};

export interface Team {
  name: string;
  sport: string;
  playerCount: number;
}

export interface Sport {
  name: string;
  teamCount: number;
}

export interface DashboardState {
  data: {
    playerList: PlayerType[];
    teamList?: Team[];
    sportList?: Sport[];
  };
  status: 'idle' | 'loading' | 'failed';
}

export interface TeamMapType { [key: string]: { [key: string]: Array<PlayerType> } }