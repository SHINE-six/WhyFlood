import React from 'react';
import NavbarForBuildingPhase from './NavbarForBuildingPhase';
import { useModifyData } from '../../useChangeData';
import { useSelector } from "react-redux";


const ImportModel = () => {
    const stepPageJsonData = useSelector(state => state.data.stepPageJsonData)
    const modifyData = useModifyData();

    const handleClick = () => {
        modifyData('flatWorld', !stepPageJsonData['flatWorld']);
        console.log('import model clicked', stepPageJsonData)
    }


    return (
        <>
            <NavbarForBuildingPhase />
            <div onClick={() => handleClick()}>Flat/Unflat World</div>
        </>
    )
}
export default ImportModel;