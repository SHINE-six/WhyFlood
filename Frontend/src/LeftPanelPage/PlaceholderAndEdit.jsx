import React from 'react';
import NavbarForBuildingPhase from './NavbarForBuildingPhase';
import { useModifyData } from '../../useChangeData';
import { useSelector } from "react-redux";


const PlaceholderAndEdit = () => {
    const stepPageJsonData = useSelector(state => state.data.stepPageJsonData)
    const modifyData = useModifyData();

    const handleClick = () => {
        modifyData('leftPanelStepAt', 'projectSetup');
    }


    return (
        <>
            <NavbarForBuildingPhase />
            <div onClick={() => handleClick()}>placefrghreugh</div>
        </>
    )
}
export default PlaceholderAndEdit;