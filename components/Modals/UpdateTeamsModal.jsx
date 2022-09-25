import React, { useState } from 'react'
import Portal from '../Portal'
import SecondaryButton from '../Buttons/SecondaryButton'
import PrimaryButton from '../Buttons/PrimaryButton'
import { updateTeam } from '../../features/teamSlice'
import { useDispatch } from 'react-redux'

const UpdateTeamModal = (props) => {
    const [name, setName] = useState(props.name)
    const [fullName, setFullName] = useState(props.full_name)
    const [city, setCity] = useState(props.city)
    const [division, setDivision] = useState(props.division)

    const dispatch = useDispatch()

    const handleUpdateTeam = () => {
        console.log('updated')
        dispatch(
            updateTeam({
                id: props.id,
                team: { name, full_name: fullName, city, division },
            })
        )
        props.closeModal()
    }

    return (
        <Portal>
            <div className="w-screen h-screen bg-[#030812ef]  fixed top-0 left-0 z-50 overflow-hidden">
                <div className="bg-[#93082b] text-white fixed w-[600px]  center_fixed_component shadow-2xl rounded-lg px-14 py-7">
                    <h1 className="text-2xl font-semibold text-center">
                        Here you can update the team.
                    </h1>

                    <div className="my-10">
                        <form>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name Here"
                                    className="my-5 p-2 w-full rounded-md text-black active:outline-none focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="fullname">Full Name</label>
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
                                <label htmlFor="city">City</label>
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
                            <div>
                                <label htmlFor="division">Division</label>
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
                            <PrimaryButton onClick={handleUpdateTeam}>
                                Update
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default UpdateTeamModal
