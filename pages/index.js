import React, { useState } from 'react'
import NavBar from '../components/Navbar/Navbar'
import PlayerList from '../components/Players/PlayerList'
import InfiniteScroll from 'react-infinite-scroll-component'

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
    const [page, setPage] = useState(1)
    const [players, setPlayers] = useState(playerData)
    const [isHasMore, setIsHasMore] = useState(true)

    const fetchMoreData = async () => {
        const res = await fetch(
            `https://www.balldontlie.io/api/v1/players?per_page=10&&page=${
                page + 1
            }`
        )

        setPage(page + 1)

        if (res.ok) {
            const data = await res.json()
            // console.log(data)
            setPlayers([...players, ...data.data])
            if (data.meta.current_page === data.meta.total_pages) {
                setIsHasMore(false)
            }
        }
    }

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
