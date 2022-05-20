import React, { useEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../../interfaces/appInterfaces';

const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [routeLines, setRouteLines] = useState<Location[]>([]);

    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });


    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    },[])

    useEffect(() => {
        getCurrentLocation()
            .then( location => {

                if( !isMounted.current ) return;

                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines( routes => [...routes, location]);
                setHasLocation(true);
            });
    },[]);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise ( (resolve, reject) => {
            Geolocation.getCurrentPosition(
            ({coords}) => {
                if( !isMounted.current ) return;

                resolve({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                })
            },
            error => reject(error),
            {
                enableHighAccuracy: true,
            }
        );
        })
    }

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({coords}) => {

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }

                setUserLocation(location);
                setRouteLines( routes => [...routes, location]);
            },
            error => console.log(error),
            { enableHighAccuracy: true, distanceFilter: 10 }
        )
    }

    const stopFollowUserLocation = () => {
        if (watchId.current) {
            Geolocation.clearWatch( watchId.current);
        }
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines
    }
}

export default useLocation