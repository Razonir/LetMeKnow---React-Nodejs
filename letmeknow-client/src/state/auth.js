import { atom } from 'recoil';

const authAtom = atom({
    key: 'auth',
    // get initial state from local storage to enable user to stay logged in
    default: localStorage.getItem('user')
});

export { authAtom };