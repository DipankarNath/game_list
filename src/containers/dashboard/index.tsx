import {useEffect, useState, FC} from "react";
import Player from "../../components/Player";
import {isExistingPlayer} from "../../utils";
import useFetchData from "../../hooks/useFetchData";

const Dashboard: FC = () => {
    const [teamMap, setTeamMap] = useState({} as TeamMapType);

    const {
        data,
        isLoading,
        isError
    } = useFetchData('https://my-json-server.typicode.com/cb-dipankarnath/dataForTask/playerList');

    // validates and dispatches actions to add or update player data
    const onSaveUpdate = (player: PlayerType, isInput: boolean) => {
        const isExisting = isExistingPlayer(player, data!);
        if (isInput) {
            if (isExisting) {
                alert("Player Already Exist With That Name!!");
            } else {
                // add player
            }
        } else {
            // update player
        }
    };

    useEffect(() => {
        // structuring flat team data received from redux
        const tempTeamMap = {} as TeamMapType;
        data?.forEach((player: PlayerType) => {
            tempTeamMap[player.sport]?.[player.team]?.push(player) ||
            (tempTeamMap[player.sport]
                ? (tempTeamMap[player.sport][player.team] = [player])
                : (tempTeamMap[player.sport] = {[player.team]: [player]}));
        });

        setTeamMap(tempTeamMap);
    }, [isLoading]);


    if (isLoading) {
        return (
            <div className="w-full flex justify-center my-12">
                <div
                    className={'p-16 rounded-md font-medium text-lg text-stone-600 bg-stone-100'}>{'Loading...'}</div>
            </div>);
    }

    if (isError) {
        return (
            <div className="w-full flex justify-center my-12">
                <div
                    className={'p-16 rounded-md font-medium text-lg text-rose-600 bg-rose-100'}>{'Opps... Could not fetch your data'}</div>
            </div>);
    }

    return (
        <div className="w-full flex justify-center my-12">
            <div className="overflow-hidden rounded-md border border-solid bottom-1">
                {Object.keys(teamMap).map((sport, index) => (
                    <div key={`${sport}__${index}`}>
                        <div className="text-lg font-bold bg-slate-200 p-2">{sport}</div>
                        {Object.keys(teamMap[sport]).map((team, index) => (
                            <div key={`${team}__${index}`}>
                                <div className="p-3">
                                    <div className="text-sm font-bold p-2">
                                        {team} ({teamMap[sport][team].length})
                                    </div>
                                    <div className="p-3">
                                        <Player
                                            player={{name: "", age: null, team, sport}}
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
