import React, { useState, useEffect } from "react";
import { GroupProvider } from "../../context/CreateGroupContext";
import BackButton from './BackButton';
import NextButton from "./NextButton";

const GroupGuideLines = () => {
    const { page, setPage} = GroupProvider()    
}

export default GroupGuideLines;