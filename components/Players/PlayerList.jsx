import React from 'react'
import PlayerItem from './PlayerItem'

const PlayerList = ({ players }) => {
    return (
        <div className="flex flex-wrap gap-5 px-10">
            {players.map((player) => (
                <PlayerItem key={player.id} {...player} />
            ))}
        </div>
    )
}

export default PlayerList
