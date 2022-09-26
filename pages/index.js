import React, { useEffect, useState } from 'react'
import NavBar from '../components/Navbar/Navbar'
import PlayerList from '../components/Players/PlayerList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import {
    setPage,
    setPlayers,
    setStopPlayerHasMore,
} from '../features/playerSlice'

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
const firstTime = true

const Home = ({ players: playerData }) => {
    const { players, page, isHasMore } = useSelector((store) => store.player)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!players.length) {
            dispatch(setPlayers(playerData))
        }
    }, [dispatch, playerData, players])

    useEffect(() => {
        console.log('ented')
        if (firstTime) {
            const value = players.length / 10 + 1
            dispatch(setPage(Math.floor(value)))
        }
        firstTime = false
    }, [dispatch, players])

    const fetchMoreData = async () => {
        const res = await fetch(
            `https://www.balldontlie.io/api/v1/players?per_page=10&&page=${page}`
        )

        if (res.ok) {
            const data = await res.json()
            dispatch(setPlayers([...players, ...data.data]))
            if (!data.meta.next_page) {
                dispatch(setStopPlayerHasMore())
            } else {
                dispatch(setPage(page + 1))
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
