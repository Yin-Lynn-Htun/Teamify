import React, { useEffect, useState } from 'react'
import Portal from '../Portal'
import SecondaryButton from '../Buttons/SecondaryButton'
import PrimaryButton from '../Buttons/PrimaryButton'
import { createTeam, fetchAllTeams } from '../../features/teamSlice'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'react-uuid'

const CreateTeamModal = (props) => {
    const teamNames = useSelector((store) => store.team.allTeamNames)

    const [name, setName] = useState('')
    const [fullName, setFullName] = useState('')
    const [playerCount, setPlayerCount] = useState(0)
    const [city, setCity] = useState('')
    const [division, setDivision] = useState('')

    const dispatch = useDispatch()

    const handleCreateTeam = () => {
        if (!isFormValid) return
        console.log('updated')
        dispatch(
            createTeam({
                id: uuid(),
                name,
                player_count: playerCount,
                full_name: fullName,
                city,
                division,
            })
        )
        props.closeModal()
    }

    useEffect(() => {
        if (!teamNames.length) {
            dispatch(fetchAllTeams())
        }
    })

    if (!teamNames.length) return <p>Loading...</p>

    const isNameUnique = !teamNames.includes(name)
    const isFormValid =
        name && isNameUnique && fullName && playerCount && city && division

    return (
        <Portal>
            <div className="w-screen h-screen bg-[#030812ef]  fixed top-0 left-0 z-50 overflow-hidden">
                <div className="bg-gray-600 text-white fixed w-[600px]  center_fixed_component shadow-2xl rounded-lg px-14 py-7">
                    <h1 className="text-2xl font-semibold text-center">
                        Create A New Team
                    </h1>

                    <div className="my-10">
                        <form>
                            <div className="my-5">
                                <label htmlFor="name">Name*</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name Here"
                                    className={`p-2 w-full rounded-md text-black active:outline-none focus:outline-none ${
                                        isNameUnique
                                            ? ''
                                            : 'border-2 border-red-600'
                                    }`}
                                />{' '}
                                <p className="text-cyan-300  inline-block">
                                    Team name need to be unique*
                                </p>
                            </div>
                            <div>
                                <label htmlFor="fullname">Full Name*</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    id="fullname"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    placeholder="Full name Here"
                                    className="my-5 p-2 w-full rounded-md text-black active:outline-none focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="playerCount">
                                    Player Count*
                                </label>
                                <input
                                    type="number"
                                    name="playerCount"
                                    id="playerCount"
                                    value={playerCount}
                                    onChange={(e) =>
                                        setPlayerCount(e.target.value)
                                    }
                                    placeholder="Player count Here"
                                    className="my-5 p-2 w-full rounded-md text-black active:outline-none focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="division">Region*</label>
                                <input
                                    type="text"
                                    name="division"
                                    id="division"
                                    value={division}
                                    onChange={(e) =>
                                        setDivision(e.target.value)
                                    }
                                    placeholder="Division Here"
                                    className="my-5 p-2 w-full rounded-md text-black active:outline-none focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="city">Country*</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City Here"
                                    className="my-5 p-2 w-full rounded-md text-black active:outline-none focus:outline-none"
                                />
                            </div>
                        </form>
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
                                onClick={handleCreateTeam}
                                disable={!isFormValid}
                            >
                                Create
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default CreateTeamModal
