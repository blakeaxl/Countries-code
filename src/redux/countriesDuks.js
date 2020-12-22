import Axios from 'axios';


const initialData = {
    array: [],
    singleCountry: [],
    favorites: []
}

const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';

const GET_SINGLE_COUNTRY_SUCCESS = 'GET_SINGLE_COUNTRY_SUCCESS';

const GET_FAVORITES_SUCCESS = 'GET_FAVORITES_SUCCESS'; 

const ADD_COUNTRY_TO_FAVORITES = 'ADD_COUNTRY_TO_FAVORITES';

const REMOVE_COUNTRY_FROM_FAVORITES = 'REMOVE_COUNTRY_FROM_FAVORITES';

export default function countriesReducer(state = initialData, action){
    switch(action.type){
        case GET_COUNTRIES_SUCCESS:
            return {...state, array: action.payload}
        case GET_SINGLE_COUNTRY_SUCCESS:
            return {...state, singleCountry: action.payload}
        case GET_FAVORITES_SUCCESS:
            return{...state, favorites: action.payload}
        case ADD_COUNTRY_TO_FAVORITES:

            const filter = state.favorites.filter(item => item.name === action.payload.name);

            if(filter.length === 0){
                return{...state, favorites: [...state.favorites, action.payload]}
            }

            return state
        case REMOVE_COUNTRY_FROM_FAVORITES:

            const test = state.favorites.filter(item => item.name === action.payload.name);

            if(test.length !== 0){

                const array = state.favorites.filter(item => item.name !== action.payload.name);

                localStorage.setItem('favorites', JSON.stringify(array));

                return state

            }
            else{
                return state
            }

        default:
            return state
    }
}

export const GetCountries = () => async (dispatch, getState) => {
    try{
        const res = await Axios.get('https://restcountries.eu/rest/v2/all');

        dispatch({
            type: GET_COUNTRIES_SUCCESS,
            payload: res.data
        })
    }
    catch(error){
        console.log(error);
    }
}

export const GetSingleCountryData = ({country}) => async (dispatch, getState) => {
    try{
        const res =  await Axios.get('https://restcountries.eu/rest/v2/name/' + country);

        dispatch({
            type: GET_SINGLE_COUNTRY_SUCCESS,
            payload: res.data
        })

    }
    catch(err){
        console.log(err);
    }
}

export const GetFavoritesCountries = () => (dispatch, getState) => {
    try{
        dispatch({
            type: GET_FAVORITES_SUCCESS,
            payload: JSON.parse(localStorage.getItem('favorites')) || []
        })
    }
    catch(err){
        console.log(err);
    }
}

export const AddToFavorites = (item) => (dispatch, getState) => {

    const array = JSON.parse(localStorage.getItem('favorites')) || [];

    const filter = array.filter(favItem => favItem.name === item.name);

    if(filter.length === 0){

        array.push(item);

        localStorage.setItem('favorites', JSON.stringify(array));

        try{
            dispatch({
                type: ADD_COUNTRY_TO_FAVORITES,
                payload: item
            })
        }
        catch(err){
            console.log(err);
        }

    }
    else{
        console.log('ya se encuentra en favoritos')
    }
}

export const RemoveFromFavorites = (item) => (dispatch, getState) => {

    const array = JSON.parse(localStorage.getItem('favorites')) || [];

    const filter = array.filter(favItem => favItem.name !== item.name);

    localStorage.setItem('favorites', JSON.stringify(filter));

    try{
        dispatch({
            type: REMOVE_COUNTRY_FROM_FAVORITES,
            payload: item
        })
    }
    catch(err){
        console.log(err)
    }

}