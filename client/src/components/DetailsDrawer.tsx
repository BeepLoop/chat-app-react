import {
    Button,
    CopyButton,
    Divider,
    Drawer,
    Group,
    Text,
} from '@mantine/core';
import { useState } from 'react';

function DetailsDrawer({ userInfo }: any) {
    const [opened, setOpened] = useState(false);

    return (
        <div>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="Details"
                padding="sm"
                size="lg"
            >
                <Divider />
                <Group
                    grow
                    m="sm"
                >
                    <Text>{userInfo.username}</Text>
                    <CopyButton
                        value={userInfo.username}
                        timeout={2000}
                    >
                        {({ copied, copy }) => (
                            <Button
                                color={copied ? 'teal' : 'blue'}
                                onClick={copy}
                            >
                                {copied ? 'Copied' : 'Copy Username'}
                            </Button>
                        )}
                    </CopyButton>
                </Group>
                <Group
                    grow
                    m="sm"
                >
                    <Text>{userInfo.publicKey}</Text>
                    <CopyButton
                        value={userInfo.publicKey}
                        timeout={2000}
                    >
                        {({ copied, copy }) => (
                            <Button
                                color={copied ? 'teal' : 'blue'}
                                onClick={copy}
                            >
                                {copied ? 'Copied' : 'Copy PublicKey'}
                            </Button>
                        )}
                    </CopyButton>
                </Group>
            </Drawer>
            <Button
                variant="outline"
                onClick={() => setOpened(true)}
            >
                My Details
            </Button>
        </div>
    );
}

export default DetailsDrawer;
