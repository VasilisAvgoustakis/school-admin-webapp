import React, {useState, useEffect, setRole} from 'react';
import {createMaterialTopTabNavigator}  from "@react-navigation/material-top-tabs";
import { Personen, PersonSelectList, Logout, PersonenScreen } from '.';
import { NavigationContainer } from '@react-navigation/native';
import './stylesheets/dashboard.css';


const Tab = createMaterialTopTabNavigator();

export function Navigation() {
  return (
    
    <NavigationContainer >
      
        <Logout />
      
        <Tab.Navigator>
          <Tab.Screen name="Personen" component={PersonenScreen} />
          <Tab.Screen name="Haushalte" component={Logout} />
          <Tab.Screen name="Arbeitsgruppen" component={Logout} />
          <Tab.Screen name="Lerngruppen" component={Logout} />
          <Tab.Screen name="Tätigkeiten" component={Logout} />
          <Tab.Screen name="allg. Abfragen" component={Logout} />
        </Tab.Navigator>
      
    </NavigationContainer>
   
  );
}
