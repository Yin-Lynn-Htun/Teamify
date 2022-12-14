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
import Head from 'next/head'

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
            <Head>
                <title>Teamify - Players</title>
            </Head>
            <NavBar />
            <h1 className="text-yellow-300 text-center text-4xl font-bold my-10 ">
                Player List
            </h1>
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
