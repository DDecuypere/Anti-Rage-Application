import { useState, useEffect} from 'react';
import { Accelerometer } from 'expo-sensors';
import CustomWarning from '../components/customWarning';

import { useUser } from '../providers/userProvider';

const velocityService = () => {
  const [ warningVisible, setWarningVisible] = useState(false);
  const { userSettings} = useUser();

  useEffect(() => {
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      // Calculate the total acceleration magnitude
      const accelerationMagnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

      const threshold = userSettings.maxVelocity;

      // Check if acceleration is above the threshold
      if (accelerationMagnitude > threshold) {
        setWarningVisible(true);
      }
    });
  
    // Clean up the subscription when the component unmounts
    return () => subscription.remove();
  }, [userSettings.maxVelocity]);

  const closeWarning = () => {
    setWarningVisible(false);
  };

  return (
    <>
      <CustomWarning
        visible={warningVisible}
        onClose={closeWarning}
        message="Warning: Be careful with your device!"
      />
    </>
  );
}

export default velocityService;