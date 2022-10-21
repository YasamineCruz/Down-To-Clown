import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GroupLocation from "./components/CreateAGroup/CreateAGroupLocation";
import GroupName from "./components/CreateAGroup/CreateAGroupName";
import GroupDescription from "./components/CreateAGroup/CreateAGroupDescription";
import GroupPrivate from "./components/CreateAGroup/CreateAGroupPrivate";
import GroupGuideLines from "./components/CreateAGroup/CreateAGroupPageGuidelines";
import GroupPlan from "./components/CreateAGroup/CreateAGroupPlan";
import { useGroupContext } from './context/GroupContext'
import MultipleFormCreateAGroup from "./components/CreateAGroup";
import HomePage from "./components/HomePage/HomePage";
import TestPage from "./components/ReadAllGroups";
import CreateAGroupImage from "./components/CreateAGroup/CreateAGroupImage";
import EditGroup from "./components/EditGroup/EditGroup";
import GroupPage from "./components/GetGroup/GetGroup";
import CurrentUsersGroups2 from "./components/GetCurrentUsersGroups/GetCurrent";
import DeleteGroup from "./components/DeleteGroup/DeleteGroup";
import CreateEvent from "./components/CreateAEvent";
import CreateVenue from "./components/CreateVenue";
import GetEvents from "./components/GetEvents";
import GetAEvent from "./components/GetAEvent";
import DeleteEvent from "./components/DeleteEvent";
import EditEvent from "./components/EditEvent";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const {page} = useGroupContext();
 

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage /> 
          </Route>
          <Route exact path='/groups'>
            <TestPage />
          </Route>
          <Route exact path="/start/location">
            <GroupLocation />
            <MultipleFormCreateAGroup page={page}/>
          </Route>
          <Route exact path="/start/name">
            <GroupName />
            <MultipleFormCreateAGroup page={page}/>
          </Route>
          <Route exact path="/start/description">
            <GroupDescription />
            <MultipleFormCreateAGroup page={page}/>
          </Route>
          <Route exact path="/start/private">
            <GroupPrivate />
            <MultipleFormCreateAGroup page={page}/>
          </Route>
          <Route exact path="/start/guidelines">
            <GroupGuideLines />
            <MultipleFormCreateAGroup page={page}/>
          </Route>
          <Route exact path="/start/plans">
            <GroupPlan />
            <MultipleFormCreateAGroup page={page}/>
          </Route> 
          <Route exact path='/start/groupimage'>
            <CreateAGroupImage />
          </Route>
          <Route exact path='/groups/:groupId'>
            <GroupPage />
          </Route>
          <Route exact path='/groups/:groupId/edit'>
            <EditGroup />
          </Route>
          <Route exact path='/groups/:groupId/newEvent'>
            <CreateEvent />
          </Route>
          <Route exact path ='/groups/:groupId/delete'>
            <DeleteGroup />
          </Route>
          <Route exact path='/groups/:groupId/newVenue'>
            <CreateVenue />
          </Route>
          <Route exact path='/events'>
            <GetEvents />
          </Route>
          <Route exact path='/events/:eventId'>
            <GetAEvent />
          </Route>
          <Route exact path='/events/:eventId/edit'>
            <EditEvent />
          </Route>
          <Route exact path='/events/:eventId/delete'>
            <DeleteEvent />
          </Route>
          <Route exact path='/user/groups'>
            <CurrentUsersGroups2 />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;