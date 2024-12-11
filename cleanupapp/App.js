import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importar pantallas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import FeedScreen from './screens/FeedScreen';
import RankingScreen from './screens/RankingScreen';
import GroupsScreen from './screens/GroupsScreen';
import NotificationsScreen from './screens/NotificacionesScreen';
import UserProfile from './screens/UserProfile';
import ConfiguracionPerfilScreen from './screens/ConfiguracionPerfilScreen';
import RecorridoScreen from './screens/RecorridoScreen';
import ResumenScreen from './screens/ResumenScreen';
import RouteHistory from './screens/RouteHistory';
import ImagesHistory from './screens/ImagesHistory';
import GroupsHistory from './screens/GroupsHistory';
import NewGroupScreen from './screens/NewGroupScreen';
import ChatScreen from './screens/ChatScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator para las pestañas principales
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Feed') iconName = 'home';
        else if (route.name === 'Ranking') iconName = 'trophy';
        else if (route.name === 'Groups') iconName = 'people';
        else if (route.name === 'Notifications') iconName = 'notifications';

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#CEDF9F',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Feed" component={FeedScreen} options={{ tabBarLabel: "Inicio", title: "Inicio" }} />
    <Tab.Screen name="Ranking" component={RankingScreen} options={{ tabBarLabel: "Clasificación", title: "Clasificación" }} />
    <Tab.Screen name="Groups" component={GroupsScreen} options={{ tabBarLabel: "Grupos", title: "Grupos" }} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ tabBarLabel: "Notificaciones", title: "Notificaciones" }} />
  </Tab.Navigator>
);

// Stack Navigator para las pantallas adicionales
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Pantallas de inicio de sesión */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

        {/* Pantalla principal con pestañas */}
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />

        {/* Pantallas adicionales */}
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ title: "Perfil de Usuario" }} />
        <Stack.Screen name="ConfiguracionPerfil" component={ConfiguracionPerfilScreen} options={{ title: "Configuración de perfil" }} />
        <Stack.Screen name="RecorridoScreen" component={RecorridoScreen} options={{ title: "Recorrido" }} />
        <Stack.Screen name="Resumen" component={ResumenScreen} options={{ title: "Resumen" }} />
        <Stack.Screen name="RouteHistory" component={RouteHistory} options={{ title: "Mis rutas" }} />
        <Stack.Screen name="ImagesHistory" component={ImagesHistory} options={{ title: "Mis imágenes" }} />
        <Stack.Screen name="GroupsHistory" component={GroupsHistory} options={{ title: "Mis grupos" }} />
        <Stack.Screen name="NewGroup" component={NewGroupScreen} options={{ title: 'Crear Nuevo Grupo' }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route }) => ({ title: route.params.groupName })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}