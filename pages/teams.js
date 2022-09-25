import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar/Navbar'
import TeamList from '../components/Teams/TeamList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTeams, setTeams } from '../features/teamSlice'

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
    const [page, setPage] = useState(1)
    const { teams } = useSelector((store) => store.team)
    const [isHasMore, setIsHasMore] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTeams(teamsData))
        dispatch(fetchAllTeams())
    }, [dispatch, teamsData])

    const fetchMoreData = async () => {
        console.log('first')
        const res = await fetch(
            `https://www.balldontlie.io/api/v1/teams?per_page=10&&page=${
                page + 1
            }`
        )

        setPage(page + 1)

        if (res.ok) {
            const data = await res.json()
            // console.log(data)
            dispatch(setTeams([...teams, ...data.data]))
            if (!data.meta.null) {
                setIsHasMore(false)
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
