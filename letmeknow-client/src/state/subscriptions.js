import { atom } from 'recoil';

const subscriptionsAtom = atom({
    key: 'subscriptions',
    default: null
});

export { subscriptionsAtom };