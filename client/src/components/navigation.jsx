import React from 'react';
import {createMaterialTopTabNavigator}  from "@react-navigation/material-top-tabs";
import {Logout, PersonenScreen, HaushalteScreen, ArbeitsgruppenScreen, LerngruppenScreen, JobsScreen, CustomScreen } from '.';
import { NavigationContainer } from '@react-navigation/native';
import '../stylesheets/dashboard.css';


/**
 * A material-design themed tab bar on the top of the screen that lets you 
 * switch between different routes by tapping the tabs or swiping horizontally. 
 * Transitions are animated by default. 
 * Screen components for each route are mounted immediately.
 */
const Tab = createMaterialTopTabNavigator();


/**
 * 'Navigation' is a functional React component that returns the Entity Navigation Bar
 * at the top of dashboard. The bar provides easy switching between available DB Entities.
 * 
 * @returns  NavigationContainer
 */

export function Navigation() {

    return (

        /**
         * The NavigationContainer is responsible for managing your app state and linking 
         * your top-level navigator to the app environment.
         * The container takes care of platform specific integration and provides various 
         * useful functionality:
         *  1. Deep link integration with the linking prop.
         *  2. Notify state changes for screen tracking, state persistence etc.
         *  3. Handle system back button on Android by using the BackHandler API from React Native.
         */

        <NavigationContainer >
            <Logout />
            <Tab.Navigator>
              <Tab.Screen name="Personen" component={PersonenScreen} />
              <Tab.Screen name="Haushalte" component={HaushalteScreen} />
              <Tab.Screen name="Arbeitsgruppen" component={ArbeitsgruppenScreen} />
              <Tab.Screen name="Lerngruppen" component={LerngruppenScreen} />
              <Tab.Screen id="jobs_tab" name="Tätigkeiten" component={JobsScreen} />
              <Tab.Screen name="allg. Abfragen" component={CustomScreen} />
            </Tab.Navigator>
        </NavigationContainer>
      
    )
}
