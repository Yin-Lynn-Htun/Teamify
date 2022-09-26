import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PrimaryButton from '../Buttons/PrimaryButton'
import Wrapper from '../Wrapper'
import SecondaryButton from '../Buttons/SecondaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import LoginModal from '../Modals/LoginModal'
import { logout } from '../../features/authSlice'
import CreateTeamModal from '../Modals/CreateTeamModal'
// import NavForMobile from './NavForMobile'

const NavBar = () => {
    const { isLogin, user } = useSelector((store) => store.auth)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            <div className="text-white h-20 px-10 flex justify-between items-center z-10 sticky top-0 bg-main-background">
                <div className="flex items-center ">
                    {/* <Link href="/">
                            <a>
                                <Image
                                    src={'/static/images/logo.svg'}
                                    width={50}
                                    height={50}
                                    alt="Logo"
                                    className="cursor-pointer"
                                />
                            </a>
                        </Link> */}
                    <h1 className=" block ml-5 font-bold text-3xl">
                        {isLogin && user ? user.username : 'Teamify'}
                    </h1>
                </div>
                <div className=" font-semibold text-xl  flex gap-7 items-center ml-auto">
                    <Link href={'/'} passHref>
                        <a className="hover:text-text-pink">Teams</a>
                    </Link>
                    <Link href={'/players'} passHref>
                        <a className="hover:text-text-pink">Players</a>
                    </Link>
                    <PrimaryButton onClick={() => setShowCreateTeamModal(true)}>
                        Create Team
                    </PrimaryButton>
                    {!isLogin ? (
                        <SecondaryButton
                            onClick={() => setShowLoginModal(true)}
                        >
                            LOGIN
                        </SecondaryButton>
                    ) : (
                        <SecondaryButton onClick={handleLogout}>
                            Logout
                        </SecondaryButton>
                    )}
                </div>

                {/* <div className="lg:hidden ml-20">
                <NavForMobile />
            </div> */}
            </div>
            {showLoginModal && (
                <LoginModal closeModal={() => setShowLoginModal(false)} />
            )}
            {showCreateTeamModal && (
                <CreateTeamModal
                    closeModal={() => setShowCreateTeamModal(false)}
                />
            )}
        </>
    )
}

export default NavBar
