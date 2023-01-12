import { Container, Flex } from '@mantine/core';
import DetailsDrawer from './DetailsDrawer';
import JoinChat from './JoinChat';
import NewChat from './NewChat';

function Mainpage({ userInfo }: any) {
    console.log({ userInfo });

    return (
        <Container size="sm">
            <DetailsDrawer userInfo={userInfo} />
            <Flex
                justify="end"
                gap="sm"
            >
                <NewChat userInfo={userInfo} />
                <JoinChat userInfo={userInfo} />
            </Flex>
        </Container>
    );
}

export default Mainpage;
