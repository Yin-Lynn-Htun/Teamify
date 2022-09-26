import React, { useEffect, useState } from 'react'
import Portal from '../Portal'
import SecondaryButton from '../Buttons/SecondaryButton'
import PrimaryButton from '../Buttons/PrimaryButton'
import { fetchAllTeams, updateTeam } from '../../features/teamSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addTeam } from '../../features/playerSlice'

const AddPlayerModal = (props) => {
    const { allTeams } = useSelector((store) => store.team)
    const [selectedTeam, setSelectedTeam] = useState(null)

    const dispatch = useDispatch()

    const handleChooseTeam = () => {
        const item = allTeams.find((team) => team.id == selectedTeam)
        dispatch(addTeam({ id: props.id, team: item }))
        props.closeModal()
    }

    useEffect(() => {
        if (!allTeams.length) {
            dispatch(fetchAllTeams())
        }
    }, [allTeams, dispatch])

    if (!allTeams.length)
        return (
            <Portal>
                <div className="w-screen h-screen bg-[#030812ef]  fixed top-0 left-0 z-50 overflow-hidden">
                    <div className="bg-[#93082b] text-white fixed w-[600px]  center_fixed_component shadow-2xl rounded-lg px-14 py-7">
                        <h1 className="text-xl font-semibold text-center">
                            Teams are loading.
                        </h1>
                    </div>
                </div>
            </Portal>
        )

    return (
        <Portal>
            <div className="w-screen h-screen bg-[#030812ef]  fixed top-0 left-0 z-50 overflow-hidden">
                <div className="bg-[#93082b] text-white fixed w-[600px]  center_fixed_component shadow-2xl rounded-lg px-14 py-7">
                    <h1 className="text-xl font-semibold text-center">
                        You Can Select the team Here.
                    </h1>

                    <h3 className="text-2xl text-center">
                        The player name is{' '}
                        <span className="text-green-300">
                            {props.first_name} {props.last_name}
                        </span>
                    </h3>

                    <div className="my-10">
                        <form>
                            <div className="flex flex-col justify-center items-center">
                                <div>
                                    <label htmlFor="name">Teams</label>
                                    <select
                                        className="text-black ml-10 my-10 rounded-lg px-5 py-3"
                                        name="team"
                                        id="team"
                                        onChange={(e) =>
                                            setSelectedTeam(e.target.value)
                                        }
                                    >
                                        <option value="">Select a team</option>
                                        {allTeams.map((team) => {
                                            return (
                                                <option
                                                    key={team.id}
                                                    value={team.id}
                                                >
                                                    {team.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="flex ">
                                    <div className="ml-auto flex gap-3 ">
                                        <SecondaryButton
                                            type="button"
                                            onClick={props.closeModal}
                                        >
                                            Cancel
                                        </SecondaryButton>
                                        <PrimaryButton
                                            type="button"
                                            disable={!selectedTeam}
                                            onClick={handleChooseTeam}
                                        >
                                            Choose
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default AddPlayerModal
