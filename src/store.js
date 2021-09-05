import { createStore, combineReducers } from 'redux';

import user from './User/reducer';
import modal from './Modal/reducer';
import search from './Search/reducer';
import fullscreen from './FullscreenImages/reducer';

const rootReducer = combineReducers({
    user, modal, search, fullscreen,
});

const store = createStore(rootReducer);

export default store;
