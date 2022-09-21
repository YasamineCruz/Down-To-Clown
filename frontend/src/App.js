// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
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
          <Route path="/signup">
            <SignupFormPage />
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
        </Switch>
      )}
    </>
  );
}

export default App;