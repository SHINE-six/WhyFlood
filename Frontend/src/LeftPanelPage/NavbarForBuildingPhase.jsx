import React, { useRef } from 'react';
import { useModifyData } from '../../useChangeData';
import { useSelector } from "react-redux";

const NavbarForBuildingPhase = () => {
    const stepPageJsonData = useSelector(state => state.data.stepPageJsonData)
    const modifyData = useModifyData();
    const pageTitleHeadersRef = useRef([])


    function displayPageTitle() {
        pageTitleHeadersRef.current = []
        for (const pageTitle of stepPageJsonData['leftPanelSteps']){
            if (pageTitle["type"] === 'buildingPhase') {
                pageTitleHeadersRef.current.push({
                    'title' : pageTitle['title'],
                    'settingTitle' : pageTitle['settingTitle']
                })
            }
        }
        return (
            <div className="flex flex-row justify-between">
                {pageTitleHeadersRef.current.map((pageTitleHeader, index) => {
                    return (
                        <div key={index} className={`cursor-pointer ${(stepPageJsonData['leftPanelStepAt'] === pageTitleHeader['settingTitle']) ? 'font-bold' : ''}`} onClick={() => modifyData('leftPanelStepAt', pageTitleHeader['settingTitle'])}>{pageTitleHeader['title']}</div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            {displayPageTitle()}
        </div>
    )
}
export default NavbarForBuildingPhase;