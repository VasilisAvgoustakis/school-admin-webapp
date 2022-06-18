import React, {useState, useEffect, setRole} from 'react';
import axios from 'axios';
import {createMaterialTopTabNavigator}  from "@react-navigation/material-top-tabs";
import { Personen, PersonSelectList, Logout, PersonenScreen, HaushalteScreen,
ArbeitsgruppenScreen, LerngruppenScreen, JobsScreen, CustomScreen } from '.';
import { NavigationContainer } from '@react-navigation/native';
import './stylesheets/dashboard.css';
import {Sleep} from "../globalFunctions"





const Tab = createMaterialTopTabNavigator();

export function Navigation() {


  const [data, setData] = useState([]);



  

  // if(data != ''){
    return (
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
  //}else{return (<p>error</p>)};
}
