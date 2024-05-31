import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addPlayer, updatePlayer } from './reducer';
import { PlayerType, TeamMapType } from './types';

import Player from './player';

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
      (tempTeamMap[player.sport]?.[player.team]?.push(player) || ((tempTeamMap[player.sport] ? (tempTeamMap[player.sport][player.team] = [player]) : (tempTeamMap[player.sport] = { [player.team]: [player] }))));
    });
    setTeamMap(tempTeamMap);
  }, [playerList]);

  const onSaveUpdate = (player: PlayerType, isInput: boolean) => {
    const isExisting = isExistingPlayer(player);
    if (isExisting) {
      alert('Player Already Exists!!');
    } else {
      if (isInput) {
        dispatch(addPlayer(player));
      } else {
        dispatch(updatePlayer(player))
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '50px' }}>
      <div style={{ border: '1px solid #ededed', width: '300px', borderRadius: '3px', overflow: 'hidden' }}>
        {Object.keys(teamMap).map((sport, index) => <div key={`${sport}__${index}`}>
          <div className="sport-head">{sport}</div>
          {Object.keys(teamMap[sport]).map((team, index) => <div key={`${team}__${index}`}>
            <div className="sport-body">
              <div className="team-head">{team} ({teamMap[sport][team].length})</div>
              <div className="team-body">
                <Player player={{ id: uuidv4(), name: '', age: null, team, sport }} onSaveUpdate={(player) => onSaveUpdate(player, true)} isInput={true} />
                {teamMap[sport][team].map((player, index) =>
                  <Player key={`${player.name}__${index}`} player={player} onSaveUpdate={(player) => onSaveUpdate(player, false)} />
                )}
              </div>
            </div>
          </div>)}
        </div>)}
      </div>
    </div>
  )
}

export default Dashboard;
