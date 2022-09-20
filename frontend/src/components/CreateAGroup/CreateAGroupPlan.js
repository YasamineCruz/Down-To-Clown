import React, { useState, useEffect } from "react";
import { GroupContext } from "../../context/CreateGroupContext";
import { useDispatch } from "react-redux";
import * as groupActions from '../../store/groups';
import BackButton from './BackButton';


const GroupPlan = () => {
    const { page, setPage} = useContext(GroupContext);
    
}

export default GroupPlan;