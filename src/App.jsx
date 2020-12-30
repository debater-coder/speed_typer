import React, {useState, useEffect, useRef} from "react"
import _ from "lodash"
import useWordGame from "./hooks/useWordGame"

function App() {
    const {
        textBoxRef,
        handleChange,
        text,
        isTimeRunning,
        timeRemaining,
        startGame,
        wordCount
    } = useWordGame(20)
    const [leaderboard, setLeaderboard] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch("/api/message")
            .then(response => response.json())
            .then(data => setLeaderboard(data))
            .then(() => setLoading(false))
    }, [])
    useEffect(() => console.log(leaderboard), [leaderboard])
    return (
        <div>
            <h1>How fast do you type?</h1>
            <textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
            />
            <h4>Time remaining: {timeRemaining}</h4>
            <button
                onClick={startGame}
                disabled={isTimeRunning}
            >
                Start
            </button>
            <h1>Word count: {wordCount}</h1>
            <h1>Leaderboard</h1>
            {!loading ? _.toPairs(leaderboard.leaderboard).map(entry => <h5>{entry[0]}: {entry[1]}</h5>) : "Loading..."}
        </div>
    )
}

export default App
