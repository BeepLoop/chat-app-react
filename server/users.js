const users = [];

let user = {};

user.joinChat = ({ username, chatcode, publicKey, socketId }) => {
    const user = { username, chatcode, publicKey, socketId };
    users.push(user);
    return user;
};

user.getMembers = (chatcode) => {
    const members = users.filter((user) => user.chatcode === chatcode);
    console.log({ members });
    return members;
};

user.currentUser = (socketId) => {
    const user = users.filter((user) => user.socketId === socketId);
    return user[0];
};

user.leaveChat = (socketId) => {
    const index = users.findIndex((user) => user.socketId === socketId);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

user.chatCodeExists = (chatcode) => {
    try {
        console.log({ chatcode });
        const chat = users.find((user) => user.chatcode === chatcode);
        console.log({ chat });

        if (!chat)
            return {
                success: false,
                exists: false,
                errorMessage: 'Chat room does not exist',
            };
        return { success: true, exists: true };
    } catch (err) {
        return {
            success: false,
            error: err,
            errorMessage: 'An error occurred while checking your code',
        };
    }
};

user.getUser = (username, chatcode) => {
    const user = users.find(
        (user) => user.username === username && user.chatcode === chatcode
    );
    return user;
};

user.getPublicKey = (username, chatcode) => {
    try {
        const user = users.find(
            (user) => user.username == username && user.chatcode === chatcode
        );
        console.log('found result: ', user);
        if (!user) return { success: false };
        return { success: true, data: user };
    } catch (err) {
        return { success: false, error: err };
    }
};

user.users = () => {
    return users;
};

module.exports = user;
