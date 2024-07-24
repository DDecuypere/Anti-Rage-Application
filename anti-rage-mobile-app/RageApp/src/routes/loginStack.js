import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';

//initialize stack nav
const LoginStack = createStackNavigator();

//wrap the nav around the pages so it is used on these screens
const Screens = () => {
    return (
        <LoginStack.Navigator
            screenOptions={{
                headerStyle: {
                backgroundColor: 'black',
                },
                headerTitleStyle: {
                color: 'white',
                },
                headerTitleAlign: 'center'
            }}
        >
            <LoginStack.Screen name='Login' component={Login}/>
        </LoginStack.Navigator>
    );
};

export default Screens;