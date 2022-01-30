import { FC } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

export interface CharacterProps { };

const DIV = styled.div``;

interface Response {
    info: any;
    results: Character[];
}

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Origin;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

interface Origin {
    name: string;
    url: string;
}

const Characters: FC<CharacterProps> = (props) => {

    const fetchCharacters = async () => {
        const response = await fetch("https://rickandmortyapi.com/api/character")
        const data = await response.json()
        return data
    }
    const { data, status } = useQuery<Response>('CHARACTERS', fetchCharacters)

    if (status === 'loading') return <h1>LOADING....</h1>

    return (
        <DIV>
            {data && data.results.map((character: Character) => (
                <div key={character.id}>
                    {character.name}
                </div>
            ))}
        </DIV>
    );
};

export default Characters;