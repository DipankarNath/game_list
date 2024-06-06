import React, {useState} from "react";

const Player: React.FC<{
    player: PlayerType;
    onSaveUpdate: (player: PlayerType) => void;
    isInput?: boolean;
}> = ({player, onSaveUpdate, isInput = false}) => {
    const [name, setName] = useState<string>(player.name || "");
    const [age, setAge] = useState<number | null>(player.age);
    const [error, setError] = useState<string>("");

    const onChange = ({type, value}: OnChangeType) => {
        type === "AGE" ? setAge(value) : setName(value);
    };

    const validateInputs = (): boolean =>
        !!(age && age >= 15 && age <= 60 && /^[a-zA-Z0-9 ]{3,}$/.test(name));

    const handleClick = () => {
        if (validateInputs()) {
            onSaveUpdate({...player, name, age});
            if (isInput) {
                setAge(null);
                setName("");
            }
        } else {
            setError(
                "The name must be alphanumeric, and the age should be between 15 and 60."
            );
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-between gap-2 m-2">
                <div>
                    <label
                        className="hidden"
                        htmlFor={`${player?.team}_${name ? "update" : "new"}_${name}`}
                    >
                        Name
                    </label>
                    <input
                        id={`${player?.team}_${name ? "update" : "new"}_${name}`}
                        type="text"
                        placeholder="Player Name"
                        value={name}
                        className="w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#005e91]"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange({type: "NAME", value: e.target.value})
                        }
                    />
                </div>
                <div>
                    <label
                        className="hidden"
                        htmlFor={`age_${player?.team}_${name ? "update" : "new"}_${name}`}
                    >
                        Age
                    </label>
                    <input
                        id={`age_${player?.team}_${name ? "update" : "new"}_${name}`}
                        type="number"
                        placeholder="Age"
                        min={15}
                        max={60}
                        value={age || ""}
                        className="w-[70px] rounded-md border-0 p-2 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#005e91]"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange({type: "AGE", value: Number(e.target.value)})
                        }
                    />
                </div>
                <button
                    className="cursor-pointer rounded-md bg-[#005e91] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#005e91]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#005e91] active:bg-[#004469] disabled:bg-[#76a2ba] disabled:cursor-not-allowed"
                    disabled={player.name === name && player.age === age}
                    onClick={() => handleClick()}
                >
                    {player?.name && player.age ? "Save" : "Add"}
                </button>
            </div>

            {!!error && (
                <p className="pl-2 w-[300px] text-xs text-red-600 pb-3">{error}</p>
            )}
        </div>
    );
};

export default Player;
