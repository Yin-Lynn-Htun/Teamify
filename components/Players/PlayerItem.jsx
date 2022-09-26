import React, { useState } from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import AddPlayerModal from '../Modals/AddPlayerModal'

const PlayerItem = (props) => {
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)

    return (
        <>
            <div className="w-[70%] mx-auto p-5 rounded-xl bg-white text-black flex">
                <div className=" flex flex-col gap-5">
                    <div>
                        <h1 className="font-bold">Player Information</h1>
                        <p>First Name : {props.first_name}</p>
                        <p>Last Name : {props.last_name}</p>
                        <p>position: {props.position}</p>
                    </div>
                    <div>
                        <h1 className="font-bold">Team Information</h1>
                        {props.team?.name ? (
                            <>
                                <p>Name: {props.team.name}</p>
                                <p>City: {props.team.city}</p>
                                <p>Division: {props.team.division}</p>
                            </>
                        ) : (
                            <p>This player does not have a team.</p>
                        )}
                    </div>
                </div>
                <div className="ml-auto">
                    <AiOutlineUserAdd
                        onClick={() => setShowAddPlayerModal(true)}
                        className="fill-green-800 w-16 h-16 cursor-pointer"
                    />
                </div>
            </div>

            {showAddPlayerModal && (
                <AddPlayerModal
                    {...props}
                    closeModal={() => setShowAddPlayerModal(false)}
                />
            )}
        </>
    )
}

export default PlayerItem
