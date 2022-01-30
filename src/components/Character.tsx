import { FC } from 'react';
import styled from 'styled-components';
import { CharacterObj } from './Characters'

export interface CharacterProps {
    character: CharacterObj;
};

const DIV = styled.div``;

const Character: FC<CharacterProps> = ({ character }) => {

    return (

        <div className="card">
            <img src={character.image} alt="Chracter Pic" />
            <div className="text-container">
                <h3>{character.name}</h3>
                <p className="status">
                    {character.status} - {character.species}
                </p>
                <p className="title">
                    Last seen on
                </p>
                <p>{character.location.name}</p>
            </div>
        </div>
    );
};

export default Character;