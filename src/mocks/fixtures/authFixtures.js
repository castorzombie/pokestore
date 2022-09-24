export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '11LW74lhXZV91Fvt1IzPvpOpZL72',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser = {
    uid: '11LW74lhXZV91Fvt1IzPvpOpZL72',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://foto.jpg'
}