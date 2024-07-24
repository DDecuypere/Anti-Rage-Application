import { REACT_APP_SPACE_ID, REACT_APP_BEARER_TOKEN, REACT_APP_MANAGEMENT_BEARER_TOKEN } from '@env';
import { createClient as createContentfulClient  } from 'contentful';
import { createClient as createManagementClient  } from 'contentful-management';

// create contentful api connection for fetching
export const client = createContentfulClient({ 
  space: REACT_APP_SPACE_ID,
  accessToken: REACT_APP_BEARER_TOKEN,
});

// create contentful api for updating
export const manageClient = createManagementClient({
  accessToken: REACT_APP_MANAGEMENT_BEARER_TOKEN
})

//fetch data fom azure cloud for curse words
export const fetchCurseWords = async() => {
  try {
    
    const response = await fetch('https://function-rage.azurewebsites.net/api/ExpoFix?code=sN54Jx3IyyuDaj-m-cIfNKtCjNKZMaeGsHfdSxEGnQRmAzFuzmhNyw==', {
      method: 'POST',
    });

    const data = await getDataFromCall(response);
    if (data) {
        return data;
    }
  } catch (error) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}

//fetch data fom azure cloud for notifications
export const fetchNotifications = async() => {
    try {
        const response = await fetch('https://function-rage.azurewebsites.net/api/ExpoFix2?code=of-rpjNGXicQ5wllMhzodam55JOV93DrX95xAuaEiwpiAzFu-QX9OQ==', {
          method: 'POST',
        });
        
        const data = await getDataFromCall(response);
        if (data) {
          return data;
        }
    } catch (error) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

//get the json out of the response
const getDataFromCall = async(response) => {
  if (response.ok) {
    try {
      return await response.json();
    } catch (jsonError) {
      throw new Error('Error parsing JSON:', jsonError);
    }
  } else if (response.status === 504) {
    return;
  } else {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
}
