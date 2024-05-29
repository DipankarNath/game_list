import { MouseEventHandler, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addPlayer } from "./reducer";
import { PlayerType, TeamMapType } from "./types";

const isExistingPlayer = (player: PlayerType): boolean => {
  return !!(player.name && player.age);
};

const Player = ({
  player,
  onSaveUpdate,
}: {
  player: PlayerType;
  onSaveUpdate: (player: PlayerType) => void;
}) => {
  const [name, setName] = useState(player.name || "");
  const [age, setAge] = useState(player.age || 0);
  const [enableSaveBtn, setEnableSaveBtn] = useState(false);
  const [error, setError] = useState("");

  /*
    Problem Statement:
    1. The save button should be enabled when the name has at least 3 characters and age is between 15 & 60, but this is currently not functioning as expected, fix this error.
    2. Enhance the validation logic to validate and show message specific to the name and age errors.
    3. Add unit test cases to verify the `validateInputs` functionality.
  */

  /** code with error starts here */
  const onChange = (type: string, value: any) => {
    type === "age" ? setAge(value) : setName(value);
    setEnableSaveBtn(validateInputs(type, type === "age" ? age : name));
  };

  const validateInputs = (type: string, value: any): boolean => {
    const res =
      type === "age"
        ? (value || 0) > 15 && (value || 0) < 60
        : /^[a-zA-Z0-9 ]{3,}$/.test(value);
    setError(
      res
        ? ""
        : "The name must be alphanumeric, and the age should be between 15 and 60.",
    );
    return res;
  };
  /** code with error ends here */

  /** solution code starts here */
  // const onChange = (type: string, value: any) => {
  //   type === 'age' ? setAge(value) : setName(value);
  //   setEnableSaveBtn(validateInputs(type, value));
  // };

  // const validateInputs = (type: string, value: any): boolean => {
  //   const res = (type === 'age') ? ((value || 0) > 15 && (value || 0) < 60) : /^[a-zA-Z0-9 ]{3,}$/.test(value);
  //   setError(res ? '' : 'The name must be alphanumeric, and the age should be between 15 and 60.');
  //   console.log(res, type, value);
  //   return res;
  // }
  /** solution code ends here */

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "5px",
          margin: "5px",
        }}
      >
        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          style={{ width: "100px" }}
        ></input>
        <input
          type="number"
          placeholder="age"
          min={15}
          max={60}
          value={age || ""}
          onChange={(e) => onChange("age", e.target.value)}
          style={{ width: "50px" }}
        ></input>
        <button
          disabled={!enableSaveBtn}
          onClick={() => onSaveUpdate({ ...player, name, age })}
        >
          {player.name && player.age ? "Save" : "Add"}
        </button>
      </div>
      {!!error && (
        <div
          className="error-wrap"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
            margin: "5px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [teamMap, setTeamMap] = useState({} as TeamMapType);

  const playerList = useAppSelector((state) => state.player?.data?.playerList);
  const dispatch = useAppDispatch();

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

  const onSaveUpdate = (player: PlayerType) => {
    console.log("I am clicked");
    dispatch(addPlayer(player));
  };
  console.log("API_URL", process.env.REACT_APP_API_URL);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          border: "1px solid #ededed",
          width: "300px",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        {Object.keys(teamMap).map((sport) => (
          <>
            <div className="sport-head">{sport}</div>
            {Object.keys(teamMap[sport]).map((team) => (
              <>
                <div className="sport-body">
                  <div className="team-head">
                    {team} ({teamMap[sport][team].length})
                  </div>
                  <div className="team-body">
                    <Player
                      player={{ name: "", age: null, team, sport }}
                      onSaveUpdate={onSaveUpdate}
                    />
                    {teamMap[sport][team].map((player, index) => (
                      <Player
                        key={`${player.name}${index}`}
                        player={player}
                        onSaveUpdate={onSaveUpdate}
                      />
                    ))}
                  </div>
                </div>
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
