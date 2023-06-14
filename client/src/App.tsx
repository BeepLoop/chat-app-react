import { LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import Mainpage from './components/Mainpage';

type Tuserinfo = {
    username: string;
    publicKey: string;
};

function App() {
    const [userInfo, setUserInfo] = useState<Tuserinfo>();
    const [serverKeys, setServerKeys] = useState<any>();
    const [gettingKeys, setGettingKeys] = useState(false);

    useEffect(() => {
        getServerKeys();
    }, []);

    async function setUser(user: any) {
        console.log('setting user: ', user);
        setUserInfo(user);
    }

    async function getServerKeys() {
        setGettingKeys(true);
        const response = await fetch(
            'https://chat-e2ee-backend.onrender.com/serverKeys'
        );
        const serverKeys = await response.json();
        setServerKeys(serverKeys);
        setGettingKeys(false);
        console.log('retrieved server keys');
    }

    return (
        <div className="App">
            <LoadingOverlay visible={gettingKeys} />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            userInfo ? (
                                <Mainpage userInfo={userInfo} />
                            ) : (
                                <Login
                                    setUser={setUser}
                                    serverKeys={serverKeys}
                                />
                            )
                        }
                    />
                    <Route
                        path="/chat"
                        element={<Chat keys={serverKeys} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
