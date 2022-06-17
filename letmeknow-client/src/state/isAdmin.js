import { atom } from 'recoil';

const isAdminAtom = atom({
    key: 'isadmin',
    // get initial state from local storage to enable user to stay logged in
    default: localStorage.getItem('isadmin')
});

export { isAdminAtom };