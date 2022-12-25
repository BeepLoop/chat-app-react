import { Box, Button, Stack, Tabs } from '@mantine/core'

function Conversations({ convos }: any) {
    return (
        <div>
            <Stack>
                {convos.map((convo: any) => {
                    return (
                        <Button key={convo.recipient}>{convo.recipient}</Button>
                    )
                })}
            </Stack>
        </div>
    )
}

export default Conversations
