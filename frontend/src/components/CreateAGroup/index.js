import { Redirect } from "react-router-dom";

const MultipleFormCreateAGroup = ({page}) => {

    switch(page){
        case 1:
            return (
                <Redirect to='/start/location'/>
            );
        case 2:
            return (
                <Redirect to='/start/name'/>
            );
        case 3:
            return (
                <Redirect to='/start/description'/>
         );
        case 4:
            return (
                <Redirect to='/start/private'/>
            );
        case 5:
            return (
                <Redirect to='/start/guidelines'/>
            )
        case 6: 
            return (
                <Redirect to='/start/plans'/>
            );
        default:
            return ( <Redirect to='/start/location' />)
    }           
        
}

export default MultipleFormCreateAGroup;