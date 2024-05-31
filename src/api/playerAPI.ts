import {PlayerType} from "../containers/dashboard/types";

export function addNewPlayer(player: PlayerType) {
    return new Promise<{ data: PlayerType }>((resolve) => {
        console.log('player added');
        setTimeout(() => resolve({data: player}), 500);
    });
}

export function updateExistingPlayer(player: PlayerType) {
    return new Promise<{ data: PlayerType }>((resolve) => {
        setTimeout(() => resolve({ data: player }), 500);
    });
}

// external API to fetch players data
// https://my-json-server.typicode.com/cb-dipankarnath/dataForTask/playerList