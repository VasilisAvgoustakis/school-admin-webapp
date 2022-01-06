import React, {useState, useEffect, setRole} from 'react';
import {createMaterialTopTabNavigator}  from "@react-navigation/material-top-tabs";
import { Personen, PersonSelectList, Logout } from '.';
import { NavigationContainer } from '@react-navigation/native';
import './stylesheets/dashboard.css';


const Tab = createMaterialTopTabNavigator();

export function Navigation() {
  return (
    
    <NavigationContainer >
      
        <Logout />
      
        <Tab.Navigator>
          <Tab.Screen name="Personen" component={Personen} />
          <Tab.Screen name="Haushalte" component={PersonSelectList} />
          <Tab.Screen name="Arbeitsgruppen" component={PersonSelectList} />
          <Tab.Screen name="Lerngruppen" component={PersonSelectList} />
          <Tab.Screen name="Tätigkeiten" component={PersonSelectList} />
          <Tab.Screen name="allg. Abfragen" component={PersonSelectList} />
        </Tab.Navigator>
      
    </NavigationContainer>
   
  );
}
