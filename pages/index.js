import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/Navbar/Navbar'
import PlayerList from '../components/Players/PlayerList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTeams } from '../features/teamSlice'
import { setPlayers } from '../features/playerSlice'

export async function getStaticProps() {
    const res = await fetch(
        'https://www.balldontlie.io/api/v1/players?per_page=10&&page=1'
    )
    if (res.ok) {
        const data = await res.json()

        return {
            props: {
                players: data.data,
                meta: data.meta,
            },
        }
    }
    return []
}

const Home = ({ players: playerData }) => {
    const { players, page } = useSelector((store) => store.player)
    const [isHasMore, setIsHasMore] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!players.length) {
            dispatch(setPlayers(playerData))
        }
    }, [dispatch, playerData, players])

    const fetchMoreData = async () => {
        const res = await fetch(
            `https://www.balldontlie.io/api/v1/players?per_page=10&&page=${page}`
        )

        dispatch(setPage(page + 1))

        if (res.ok) {
            const data = await res.json()
            setPlayers([...players, ...data.data])
            if (!data.meta.next_page) {
                setIsHasMore(false)
            }
        }
    }

    if (!players.length) return <p>Loading...</p>

    return (
        <div>
            <NavBar />
            <InfiniteScroll
                dataLength={players.length}
                next={fetchMoreData}
                hasMore={isHasMore}
                loader={<h4>Loading...</h4>}
            >
                <PlayerList players={players} />
            </InfiniteScroll>
        </div>
    )
}

export default Home
