import { atom } from 'recoil';

const notificationsAtom = atom({
    key: 'notifications',
    default: null
});

export { notificationsAtom };