import { client, manageClient } from './api';
import { REACT_APP_SPACE_ID, REACT_APP_ENV_ID, REACT_APP_SETTING_ID } from '@env';

//get the userid and fetch data from that user
export const getUserApi = async (userId) => {
    try {
        const user = await client.getEntry(userId);
      
        if (user.fields) {
          return flattenUser(user);
        }
    
        return null;
      } catch (error) {
        console.error('Error getting user:', error.message);
      }
};

//post settings from the user in the api and publish to get updated settings
export const updateSettingsApi = async (darkmode, velocity, ppt) => {
    try {
      const locale = 'en-US';

      const settings = await manageClient.getSpace(REACT_APP_SPACE_ID)
        .then(space => space.getEnvironment(REACT_APP_ENV_ID))
        .then(environment => environment.getEntry(REACT_APP_SETTING_ID));


      settings.fields = {
        ...settings.fields,
        darkMode: { [locale] : darkmode },
        maxVelocity: { [locale] : velocity },
        maxPpt: { [locale] : ppt }
      };

      const newSet = await settings.update();
      await newSet.publish();

      console.log('settings succesfully updated');
      return flattenSettings(newSet, locale);
    } catch (error) {
      console.error('Error updating settings:', error.message);
    }
};

//flatten content so user object not bloated
const flattenUser = (entry) => {
    const flattenedEntry = { ...entry.fields };

    // Flatten nested "data" field
    if (flattenedEntry.data && flattenedEntry.data.fields) {
      flattenedEntry.data = { ...flattenedEntry.data.fields };
    }

    // Flatten nested "setting" field
    if (flattenedEntry.setting && flattenedEntry.setting.fields) {
      flattenedEntry.setting = { ...flattenedEntry.setting.fields };
    }

    return flattenedEntry;
};

//flatten content from management client to store state
const flattenSettings = (entry, locale) => {
    return {
      settingsId: entry.fields.settingsId[locale],
      settingName: entry.fields.settingName[locale],
      darkMode: entry.fields.darkMode[locale],
      maxVelocity: entry.fields.maxVelocity[locale],
      maxPpt: entry.fields.maxPpt[locale]
    };
};