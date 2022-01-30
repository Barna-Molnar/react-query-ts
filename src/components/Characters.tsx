import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Character from './Character';
import { type } from 'os';

export interface CharacterProps { };

const DIV = styled.div`
 display: grid;
 grid-template-columns: 1fr 1fr ;
 grid-gap: 4rem;
`;

interface Response {
    info: any;
    results: CharacterObj[];
}

export interface CharacterObj {
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

    const [page, setPage] = useState(1);

    const fetchCharacters = async ({ queryKey }: any) => {

        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
        const data = await response.json()
        console.log(data);
        return data
    }
    const { data, status } = useQuery<Response>(['CHARACTERS', page], fetchCharacters, {
        keepPreviousData: true
    })



    if (status === 'loading') return <h1>LOADING....</h1>

    return (
        <div className='characters'>
            {data && data.results.map((character: CharacterObj) => (
                <Character character={character} key={character.id} />
            ))}

            <div>

                <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>Previus</button>
                <button disabled={page >= 42} onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>

        </div>
    );
};

export default Characters;