import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/Navbar/Navbar'
import TeamList from '../components/Teams/TeamList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { setStopHasMore, setTeamPage, setTeams } from '../features/teamSlice'

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
    const dispatch = useDispatch()

    useEffect(() => {
        if (!teams.length) {
            dispatch(setTeams(teamsData))
        }
    }, [dispatch, teams, teamsData])

    const fetchMoreData = async () => {
        const res = await fetch(
            `https://www.balldontlie.io/api/v1/teams?per_page=10&&page=${page}`
        )

        if (res.ok) {
            const data = await res.json()
            // console.log(data)
            dispatch(setTeams([...teams, ...data.data]))
            if (!data.meta.next_page) {
                dispatch(setStopHasMore())
            } else {
                dispatch(setTeamPage(teams.length / 10 + 1))
            }
        }
    }

    if (!teams.length) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <NavBar />
            <InfiniteScroll
                dataLength={teams.length}
                next={fetchMoreData}
                hasMore={isHasMore}
                loader={<h4>Loading...</h4>}
            >
                <TeamList teams={teams} />
            </InfiniteScroll>
        </div>
    )
}

export default Team
