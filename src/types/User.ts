enum userTypes {
    assistant = 0,
    admin = 1,
}

interface User {
    userId: number;
    userType: userTypes;
}

export default User;