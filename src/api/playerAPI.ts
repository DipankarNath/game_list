import { PlayerType } from "../containers/dashboard/types";

export function addNewPlayer(player: PlayerType) {
  return new Promise<{ data: PlayerType }>((resolve) => {
    console.log('player added');
    setTimeout(() => resolve({ data: player }), 500);
  });
}
