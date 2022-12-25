import {
    Container,
    Tabs,
    Notification,
    Button,
    Anchor,
    Flex,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import Contact from './Contact'
import Conversations from './Conversations'
import DetailsDrawer from './DetailsDrawer'
import JoinChat from './JoinChat'
import NewChat from './NewChat'

function Mainpage({ userInfo }: any) {
    const [contacts, setContacts] = useState<any[]>([])
    const [messages, setMessages] = useState<any[]>([])
    const [contactError, setContactError] = useState(false)

    console.log({ userInfo })

    async function addContact(values: any) {
        console.log({ values })

        if (contactExists(values.name)) {
            setContactError(true)
            return
        } else {
            fetch(
                `https://chat-app-backend-9ub7.onrender.com/addContact/${values.phone}`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log({ data })
                    if (data.success === false) return
                    setContacts((cur) => [
                        ...cur,
                        {
                            name: values.name,
                            phone: data.data.phone,
                            publicKey: data.data.publicKey,
                        },
                    ])
                })
        }
    }

    function contactExists(name: string) {
        console.log('contact exist check')
        const contact = contacts.filter((contact) => contact.name === name)
        if (contact.length < 1) return false
        return true
    }

    return (
        <Container size="sm">
            <DetailsDrawer userInfo={userInfo} />
            <Tabs defaultValue="messages" variant="outline" mt="sm">
                <Tabs.List>
                    <Tabs.Tab value="messages">Messages</Tabs.Tab>
                    <Tabs.Tab value="chatrooms">Chatrooms</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="messages">
                    <Flex justify="end" gap="sm">
                        <NewChat userInfo={userInfo} />
                        <JoinChat contacts={contacts} userInfo={userInfo} />
                    </Flex>
                    <Conversations convos={messages} />
                </Tabs.Panel>

                <Tabs.Panel value="chatrooms">
                    {contactError ? (
                        <Notification
                            color="red"
                            onClose={() => setContactError(false)}
                        >
                            Cannot be added to contact!
                        </Notification>
                    ) : null}
                    <Contact rooms={contacts} addContact={addContact} />
                </Tabs.Panel>
            </Tabs>
        </Container>
    )
}

export default Mainpage
