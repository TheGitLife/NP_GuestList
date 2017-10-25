import React, { Component } from "react";
import Mixes from "./Mixes";
import DetailEvent from "./DetailEvent";
import CreateEvent from './CreateEvent';
import CheckIn from './CheckIn';

import { StackNavigator } from "react-navigation";

export default (DrawNav = StackNavigator({
  Mixes: { screen: Mixes },
  DetailEvent: { screen: DetailEvent },
  CreateEvent: { screen: CreateEvent },
  CheckIn: { screen: CheckIn }
}));
