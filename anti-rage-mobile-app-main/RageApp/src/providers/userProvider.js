import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_USER_ID } from '@env';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { getUserApi, updateSettingsApi } from '../api/query';
import { fetchCurseWords } from '../api/api';

//initialize context
const UserContext = createContext();

// track the state of the data from api, adjust state based on action type
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...action.payload, isLoggedIn: true };
    case 'UPDATE':
      return { ...state, ...action.payload};
    case 'LOGOUT':
      return { user: null, username: null, isLoggedIn: false };
    default:
      return state;
  }
};

 //initial state of userdata (before user is logged in)
 const initialState = {
  user: null,
  settings: null,
  username: null,
  isLoggedIn: false
};

export const UserProvider = ({ children }) => {
  //initialise reducer
  const [state, dispatch] = useReducer(userReducer, initialState);

  //on mount of provider, check if username available. if the data is still there setUser
  useEffect(() => {
    const updateUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('username');
        if (storedUser) {
          const {username} = JSON.parse(storedUser);
          loginProcess(username)
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    updateUserData();
  }, []);

  const loginProcess = async (username = "") => {
    try {
      await setUser(username);
      await setUserCurseWords();
    } catch (error) {
      throw new Error('error within login process:', error);
    }
  }
  
  //set the user state and store username in asyncstorage
  const setUser = async (username) => {
    try {
      const {data, setting, name} = await getUserData();
      if (username) {
        dispatch({ type: 'LOGIN', payload: {user: data, settings: setting, username: username}});
        await AsyncStorage.setItem('username', JSON.stringify({username: username}));
      } else {
        dispatch({ type: 'LOGIN', payload: {user: data, settings: setting, username: name}});
        await AsyncStorage.setItem('username', JSON.stringify({username: name}));
      }
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  };

  const getUserData = async() => {
    try {
      const { setting, name } = await getUserApi(REACT_APP_USER_ID);
      const data = await AsyncStorage.getItem('userdata');

      return {setting, name, data};
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  }

  //parse json to 
  const parseMessage = (message) => {
    const jsonBody = JSON.stringify(message)
    const jsonParsed = JSON.parse(jsonBody);
    return Object.entries(jsonParsed);
  }

  //get the curse words from the api call
  const setUserCurseWords = async() => {
    try {
      const data = await fetchCurseWords();

      if (data){
        const curseWords = getMostUsedWords(parseMessage(data));
        await AsyncStorage.setItem('userdata', JSON.stringify(curseWords));
      }else {
        return false;
      }
    } catch (error) {
      console.error('Error setting new word list:', error);
    }
  }

  const getMostUsedWords = (data) => {
    // Sort the array in descending order based on the count (value)
    const sortedArray = data.sort((a, b) => b[1] - a[1]);

    // Take the first three elements
    const topThreePairs = sortedArray.slice(0, 3);
    return topThreePairs;
  }

  //set setting localy and on contentful
  const setSettings = async (dark, velo, press) => {
    try {
      const settings = await updateSettingsApi(dark,velo,press);
      dispatch({ type: 'UPDATE', payload: {settings: settings}});
    } catch (error) {
      console.error('Error setting user settings:', error);
    }
  }

  //remove the data
  const logout = async () => {
    try {
      dispatch({ type: 'LOGOUT' });
      await AsyncStorage.removeItem('username');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  //wrap all screens in provider to all get the values
  return (
    <UserContext.Provider value={{ userData: state.user, userSettings: state.settings, username: state.username, isLoggedIn: state.isLoggedIn, loginProcess, logout, setSettings }}>
      {children}
    </UserContext.Provider>
  );
};

//makes sure we can acces values of context
export const useUser = () => {
    return useContext(UserContext);
  };