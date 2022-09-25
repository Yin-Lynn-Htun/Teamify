import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

const PlayerItem = (props) => {
    return (
        <div className="w-full p-5 rounded-xl bg-white text-black ">
            <p>First Name : {props.first_name}</p>
            <p>Last Name : {props.last_name}</p>
            <p>position: {props.position}</p>
            <div>
                <h3>Teams</h3>
                <p>Name: {props.team.name}</p>
            </div>
        </div>
    )
}

export default PlayerItem
