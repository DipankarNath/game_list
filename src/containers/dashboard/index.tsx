import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { addPlayer, updatePlayer } from "./reducer";

import Player from "../../components/Player";

const Dashboard = () => {
  const [teamMap, setTeamMap] = useState({} as TeamMapType);

  const playerList = useAppSelector((state) => state.player?.data?.playerList);
  const dispatch = useAppDispatch();

  const isExistingPlayer = (player: PlayerType): boolean => {
    const index = playerList.findIndex(({ name }) => name === player.name);
    return index !== -1;
  };

  useEffect(() => {
    const tempTeamMap = {} as TeamMapType;
    playerList.forEach((player: PlayerType) => {
      tempTeamMap[player.sport]?.[player.team]?.push(player) ||
        (tempTeamMap[player.sport]
          ? (tempTeamMap[player.sport][player.team] = [player])
          : (tempTeamMap[player.sport] = { [player.team]: [player] }));
    });
    setTeamMap(tempTeamMap);
  }, [playerList]);

  const onSaveUpdate = (player: PlayerType, isInput: boolean) => {
    const isExisting = isExistingPlayer(player);
    if (isInput) {
      if (isExisting) {
        alert("Player Already Exist With That Name!!");
      } else {
        dispatch(addPlayer(player));
      }
    } else {
      dispatch(updatePlayer(player));
    }
  };

  return (
    <div className="w-full flex justify-center my-12">
      <div className="overflow-hidden rounded-md border border-solid bottom-1">
        {Object.keys(teamMap).map((sport, index) => (
          <div key={`${sport}__${index}`}>
            <div className="text-lg font-bold bg-slate-200 p-2">{sport}</div>
            {Object.keys(teamMap[sport]).map((team, index) => (
              <div key={`${team}__${index}`}>
                <div className="sport-body">
                  <div className="text-sm font-bold p-2">
                    {team} ({teamMap[sport][team].length})
                  </div>
                  <div className="team-body">
                    <Player
                      player={{ name: "", age: null, team, sport }}
                      onSaveUpdate={(player) => onSaveUpdate(player, true)}
                      isInput={true}
                    />
                    {teamMap[sport][team].map((player, index) => (
                      <Player
                        key={`${player.name}__${index}`}
                        player={player}
                        onSaveUpdate={(player) => onSaveUpdate(player, false)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
