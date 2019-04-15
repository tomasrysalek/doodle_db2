import { combineReducers } from 'redux';
import { reducer} from 'redux-form';
import authReducer from './auth'

export default combineReducers({
    form: reducer,
    auth: authReducer
});