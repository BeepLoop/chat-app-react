import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import Mainpage from './components/Mainpage'

type Tuserinfo = {
    username: string
    publicKey: string
}

function App() {
    const [userInfo, setUserInfo] = useState<Tuserinfo>()
    const [serverKeys, setServerKeys] = useState<any>()

    useEffect(() => {
        getServerKeys()
    }, [])

    async function setUser(user: any) {
        console.log('setting user: ', user)
        const response = await fetch(
            'https://chat-app-backend-9ub7.onrender.com/addContact',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username: user.username,
                    publicKey: user.publicKey,
                    privateKey: user.privateKey,
                }),
            }
        )
        const parsed = await response.json()
        setUserInfo(parsed)
    }

    async function getServerKeys() {
        const response = await fetch(
            'https://chat-app-backend-9ub7.onrender.com/serverKeys'
        )
        const serverKeys = await response.json()
        setServerKeys(serverKeys)
        console.log('retrieved server keys')
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            userInfo ? (
                                <Mainpage userInfo={userInfo} />
                            ) : (
                                <Login setUser={setUser} />
                            )
                        }
                    />
                    <Route path="/chat" element={<Chat keys={serverKeys} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
