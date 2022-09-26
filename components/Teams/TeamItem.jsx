import React, { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { deleteTeam, updateTeam } from '../../features/teamSlice'
import { useDispatch } from 'react-redux'
import UpdateTeamModal from '../Modals/UpdateTeamsModal'
import { removePlayerFromDeleteTeam } from '../../features/playerSlice'

const TeamItem = (props) => {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const handleDeleteTeam = (id) => {
        dispatch(deleteTeam(id))
        dispatch(removePlayerFromDeleteTeam(id))
    }

    return (
        <>
            <div className="w-full p-5 rounded-xl bg-white text-black flex justify-between">
                <div>
                    <p>Name : {props.name}</p>
                    <p>Full Name : {props.full_name}</p>
                    <p>City: {props.city}</p>
                    <p>Division: {props.division}</p>
                </div>
                <div className="flex flex-col gap-10">
                    <BsFillTrashFill
                        onClick={() => handleDeleteTeam(props.id)}
                        className="w-7 h-7 fill-red-500 cursor-pointer"
                    />
                    <AiFillEdit
                        onClick={() => setShowModal(true)}
                        className="w-7 h-7 fill-blue-500 cursor-pointer"
                    />
                </div>
            </div>
            {showModal && (
                <UpdateTeamModal
                    {...props}
                    closeModal={() => setShowModal(false)}
                />
            )}
        </>
    )
}

export default TeamItem
