import React, { useState } from 'react'
import Portal from '../Portal'
import SecondaryButton from '../Buttons/SecondaryButton'
import PrimaryButton from '../Buttons/PrimaryButton'
import { useDispatch } from 'react-redux'
import { login } from '../../features/authSlice'

const LoginModal = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = () => {
        console.log('login')
        dispatch(
            login({
                user: { username, password },
            })
        )
        props.closeModal()
    }

    return (
        <Portal>
            <div className="w-screen h-screen bg-[#030812ef]  fixed top-0 left-0 z-50 overflow-hidden">
                <div className="bg-[#93082b] text-white fixed w-[600px]  center_fixed_component shadow-2xl rounded-lg px-14 py-7">
                    <h1 className="text-2xl font-semibold text-center">
                        Login Here
                    </h1>

                    <div className="my-10">
                        <form>
                            <div>
                                <label htmlFor="name">Username</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="Name Here"
                                    className="my-5 p-2 w-full rounded-md text-black active:outline-none focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Password Here"
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
                            <PrimaryButton onClick={handleLogin}>
                                Login
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default LoginModal
