import {render, screen} from "@testing-library/react";
import user from "@testing-library/user-event";
import Player from "../Player";

describe("Player Component Test", () => {
    test("Should render Player", async () => {
        const team = "india";
        const sport = "cricket";
        const player = {
            name: "",
            age: null,
            team,
            sport,
        };
        render(<Player player={player} onSaveUpdate={(e) => e} isInput={true}/>);
        const playerNameInputElement = screen.getByRole("textbox", {
            name: "Name",
        });
        expect(playerNameInputElement).toBeInTheDocument();

        const playerAgeInputElement = screen.getByRole("spinbutton", {
            name: "Age",
        });
        expect(playerAgeInputElement).toBeInTheDocument();

        const playerAddButtonElement = screen.getByRole("button", {
            name: "Add",
        });
        expect(playerAddButtonElement).toBeInTheDocument();
        expect(playerAddButtonElement).toBeDisabled();
    });

    test("Should render Error text", async () => {
        user.setup();
        const team = "india";
        const sport = "cricket";
        const player = {
            name: "",
            age: null,
            team,
            sport,
        };
        render(<Player player={player} onSaveUpdate={(e) => e} isInput={true}/>);
        const playerNameInputElement = screen.getByRole("textbox", {
            name: "Name",
        });
        expect(playerNameInputElement).toBeInTheDocument();

        const playerAgeInputElement = screen.getByRole("spinbutton", {
            name: "Age",
        });
        expect(playerAgeInputElement).toBeInTheDocument();

        const playerAddButtonElement = screen.getByRole("button", {
            name: "Add",
        });
        expect(playerAddButtonElement).toBeInTheDocument();
        expect(playerAddButtonElement).toBeDisabled();

        await user.type(playerNameInputElement, "Rama");

        expect(playerNameInputElement).toHaveValue("Rama");

        await user.type(playerAgeInputElement, "12");
        expect(playerAgeInputElement).toHaveValue(12);

        expect(playerAddButtonElement).toBeEnabled();
        await user.click(playerAddButtonElement);

        const validationErrorElement = screen.getByRole("paragraph");
        expect(validationErrorElement).toHaveTextContent(
            "The name must be alphanumeric, and the age should be between 15 and 60."
        );
    });
});
