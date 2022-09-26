import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/Navbar/Navbar'
import TeamList from '../components/Teams/TeamList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { setStopHasMore, setTeamPage, setTeams } from '../features/teamSlice'
import Head from 'next/head'
import CreateTeamModal from '../components/Modals/CreateTeamModal'
import PrimaryButton from '../components/Buttons/PrimaryButton'

export async function getStaticProps() {
    const res = await fetch(
        'https://www.balldontlie.io/api/v1/teams?per_page=10&&page=1'
    )
    if (res.ok) {
        const data = await res.json()

        return {
            props: {
                teams: data.data,
                meta: data.meta,
            },
        }
    }
    return []
}

const Team = ({ teams: teamsData }) => {
    const { teams, page, isHasMore } = useSelector((store) => store.team)
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!teams.length) {
            dispatch(setTeams(teamsData))
        }
    }, [dispatch, teams, teamsData])

    const fetchMoreData = async () => {
        if (teams.length >= 25) {
            return
        }
        const res = await fetch(
            `https://www.balldontlie.io/api/v1/teams?per_page=10&&page=${page}`
        )

        if (res.ok) {
            const data = await res.json()
            dispatch(setTeams([...teams, ...data.data]))
            if (!data.meta.next_page) {
                dispatch(setStopHasMore())
            } else {
                dispatch(setTeamPage(page + 1))
            }
        }
    }

    if (!teams.length) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div>
                <Head>
                    <title>Teamify - Teams</title>
                </Head>
                <NavBar />
                <div className="relative">
                    <h1 className="text-blue-300 text-center text-4xl font-bold my-10 ">
                        Team List
                    </h1>

                    <div className="absolute top-0 right-10 text-center py-3">
                        <PrimaryButton
                            onClick={() => setShowCreateTeamModal(true)}
                        >
                            + Create Team
                        </PrimaryButton>
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={teams.length}
                    next={fetchMoreData}
                    hasMore={isHasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <TeamList teams={teams} />
                </InfiniteScroll>
            </div>
            {showCreateTeamModal && (
                <CreateTeamModal
                    closeModal={() => setShowCreateTeamModal(false)}
                />
            )}
        </>
    )
}

export default Team
