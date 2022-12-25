import { Accordion, Button, Flex, Group, Modal } from '@mantine/core'
import { useState } from 'react'
import AddContact from './AddContact'

function Contact({ rooms, addContact }: any) {
    const [modalOpened, setModalOpened] = useState(false)

    return (
        <div>
            <Flex justify="end" my="sm">
                <Modal
                    opened={modalOpened}
                    onClose={() => setModalOpened(false)}
                    title="Add Existing Chatroom"
                >
                    <AddContact
                        addContact={addContact}
                        closeModal={() => setModalOpened(false)}
                    />
                </Modal>
                <Group position="center">
                    <Button onClick={() => setModalOpened(true)}>
                        Add Chatroom
                    </Button>
                </Group>
            </Flex>

            <Accordion>
                {rooms.map((room: any) => {
                    return (
                        <Accordion.Item key={room.code} value={room.code}>
                            <Accordion.Control>{room.name}</Accordion.Control>
                            <Accordion.Panel>{room.code}</Accordion.Panel>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
            {/* <Container></Container> */}
        </div>
    )
}

export default Contact
