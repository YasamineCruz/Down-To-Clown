import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { GroupContext } from '../../context/CreateGroupContext'
import GroupDescription from "./CreateAGroupDescription";
import GroupName from "./CreateAGroupName";
import GroupGuideLines from "./CreateAGroupPageGuidelines";
import GroupPlan from "./CreateAGroupPlan";
import GroupPrivate from "./CreateAGroupPrivate";

const MultipleFormCreateAGroup = () => {
    const {page, setPage} = useContext(GroupContext);
    

    switch(page){
        case 1:
            return (
                <Route path='/start/location'>
                    <GroupLocation />
                </Route>
            );
        case 2:
            return (
              <Route path='/start/name'>
                <GroupName />
                </Route>
            );
        case 3:
            return (
                <Route path='/start/description'>
                    <GroupDescription />
                </Route>
         );
        case 4:
            return (
                <Route path='/start/private'>
                    <GroupPrivate />
                </Route>
            );
        case 5:
            return (
                <Route path='/start/guidelines'>
                    <GroupGuideLines />
                </Route>
            )
        case 6: 
            return (
                <Route path='/start/plans'>
                    <GroupPlan />
            </Route> 
            )
    }           
        
}

export default MultipleFormCreateAGroup;