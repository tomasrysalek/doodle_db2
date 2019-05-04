import { combineReducers } from 'redux';
import { reducer} from 'redux-form';
import authReducer from './auth';
import kalReducer from './kal';
import skupReducer from './skup';

export default combineReducers({
    form: reducer,
    auth: authReducer,
    kal: kalReducer,
    skup: skupReducer

});