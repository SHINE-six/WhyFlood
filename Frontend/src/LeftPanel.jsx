import { useRef } from "react";
import { ProjectSetup, ImportModel, PlaceholderAndEdit } from './LeftPanelPage/index.js';
import { useSelector } from "react-redux";
import { useModifyData } from '../useChangeData';

import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";


const LeftPanel = () => {
  const stepPageJsonData = useSelector(state => state.data.stepPageJsonData)
  const pageContent = useRef(null)
  const modifyData = useModifyData();


  function getPageTitle() {
    for (const pageTitle of stepPageJsonData['leftPanelSteps']){
      if (pageTitle["settingTitle"] === stepPageJsonData['leftPanelStepAt']) {
        return pageTitle['title']
      }
    }
    return 'Page not found'
  }

  function routeToPage() {
    if (stepPageJsonData['leftPanelStepAt'] === 'projectSetup') {
      pageContent.current = <ProjectSetup />
    } else if (stepPageJsonData['leftPanelStepAt'] === 'importModel') {
      pageContent.current = <ImportModel />
    } else if (stepPageJsonData['leftPanelStepAt'] === 'placeholderAndEdit') {
      pageContent.current = <PlaceholderAndEdit />
    }

    return pageContent.current
  }


  return (
    <>
      {stepPageJsonData && stepPageJsonData['leftPanel']?
        <div className="fixed left-0 w-[17rem] h-full bg-gray-500 flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="">{getPageTitle()}</div>
            <div onClick={() => modifyData('leftPanel', false)} className="cursor-default text-[2rem]"><CiSquareMinus /></div>
          </div>
          <div>{routeToPage()}</div>
        </div>
      : 
      <div className="fixed left-0 w-[2rem] h-full bg-gray-500">
        <div onClick={() => modifyData('leftPanel', true)} className="cursor-default text-[2rem]"><CiSquarePlus /></div>
      </div>
      }
    </>
  )
}

export default LeftPanel;
