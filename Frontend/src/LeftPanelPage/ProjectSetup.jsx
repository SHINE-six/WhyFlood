import React, { useState } from 'react';
import { useModifyData, useAddData } from '../../useChangeData';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from "react-redux";

  
const center = { lat: 18.52043, lng: 73.856743 };

const ProjectSetup = () => {
    const [coordinate, setCoordinate] = useState(center);
    const modifyData = useModifyData();
    const stepPageJsonData = useSelector(state => state.data.stepPageJsonData)
    const addData = useAddData();

    const containerStyle = {
        width: `${stepPageJsonData['leftPanelWidth'] * 0.8}px`,
        height: `${stepPageJsonData['leftPanelWidth'] * 0.8}px`
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('coordinate', coordinate);
        addData('geolocation', coordinate);
        modifyData('leftPanelStepAt', 'importModel');
    }

    const handleMapClick = (e) => {
        const newPos = e.latLng.toJSON();
        console.log(newPos);
        setCoordinate(newPos);
    }

    const handleChange = (e) => {
        console.log(typeof (e.target.value))
        setCoordinate({...coordinate, [e.target.name]: parseFloat(e.target.value)});
        console.log(coordinate);
    }

    const handleDimChange = (e) => {
        console.log(e.target.value);
        modifyData(e.target.name, e.target.value);
    }


    return (
        <>
            <div>Geolocation</div>
            <form onSubmit={handleSubmit}>
                <label>Longitude</label><br />
                <input type="number" name="lng" placeholder={coordinate['lng']} value={coordinate['lng']} step="0.0001" onChange={handleChange}/><br /><br />
                <label>Latitude</label><br />
                <input type="number" name="lat" placeholder={coordinate['lat']} value={coordinate['lat']} step="0.0001" onChange={handleChange}/><br /><br />
                <label>World Width</label><br />
                <div className="flex flex-row">
                    <input type="range" name="worldWidth" placeholder={stepPageJsonData['worldWidth']} step="1" max={1000} onChange={handleDimChange}/><br /><br />
                    <div>{stepPageJsonData['worldWidth']}</div>
                </div>
                <label>World Depth</label><br />
                <div className='flex flex-row'>
                    <input type="range" name="worldDepth" placeholder={stepPageJsonData['worldDepth']} step="1" max={1000} onChange={handleDimChange}/><br /><br />
                    <div>{stepPageJsonData['worldDepth']}</div>
                </div>
                <input type="submit" value="Submit" />
            </form>
                <div className='border-2 border-black z-50 w-fit h-fit'>
                    {!isLoaded ? (
                        <div>Loading...</div>
                    ): (
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={coordinate}
                            zoom={7}
                            onClick={handleMapClick}
                            mapTypeId="terrain"
                            options={{ mapTypeControl: false, streetViewControl: false, zoomControl: true }}
                        >
                            <Marker position={coordinate} />
                        </GoogleMap>
                    )}
                </div>
        </>
    )
}
export default ProjectSetup;