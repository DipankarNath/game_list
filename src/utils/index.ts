export const isExistingPlayer = (player: PlayerType, playerList: PlayerType[]): boolean => {
    const index = playerList.findIndex(({ name }) => name === player.name);
    return index !== -1;
  };
