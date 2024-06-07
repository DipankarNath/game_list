export function addNewPlayer(player: PlayerType) {
    return new Promise<{ data: PlayerType }>((resolve) => {
        console.log("player added");
        setTimeout(() => resolve({data: player}), 500);
    });
}

export function updateExistingPlayer(player: PlayerType) {
    return new Promise<{ data: PlayerType }>((resolve) => {
        setTimeout(() => resolve({data: player}), 500);
    });
}
