import React, {useState, useEffect, setRole} from 'react';
import {createMaterialTopTabNavigator}  from "@react-navigation/material-top-tabs";
import { Personen, PersonSelectList, Logout, PersonenScreen, HaushalteScreen,
ArbeitsgruppenScreen, LerngruppenScreen, JobsScreen, CustomScreen } from '.';
import { NavigationContainer } from '@react-navigation/native';
import './stylesheets/dashboard.css';


const Tab = createMaterialTopTabNavigator();

export function Navigation() {
  return (
    
    <NavigationContainer >
      
        <Logout />
      
        <Tab.Navigator>
          <Tab.Screen name="Personen" component={PersonenScreen} />
          <Tab.Screen name="Haushalte" component={HaushalteScreen} />
          <Tab.Screen name="Arbeitsgruppen" component={ArbeitsgruppenScreen} />
          <Tab.Screen name="Lerngruppen" component={LerngruppenScreen} />
          <Tab.Screen name="Tätigkeiten" component={JobsScreen} />
          <Tab.Screen name="allg. Abfragen" component={CustomScreen} />
        </Tab.Navigator>
      
    </NavigationContainer>
   
  );
}
