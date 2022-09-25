import React from 'react'
import TeamItem from './TeamItem'

const TeamList = ({ teams }) => {
    return (
        <div className="flex flex-wrap gap-5 px-10">
            {teams.map((team) => (
                <TeamItem key={team.id} {...team} />
            ))}
        </div>
    )
}

export default TeamList
