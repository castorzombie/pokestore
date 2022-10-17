import { render, screen} from '@testing-library/react';
import { PokemonChip } from '../../element/components/PokemonChip';

describe("Test ui <PokemonChip />", () => {
    test("To show chip abilities", () => {
        const abilities = ["overgrow"];
        render(<PokemonChip chips={abilities} />);
        expect(screen.getByText(abilities)).toBeTruthy();
    })
})