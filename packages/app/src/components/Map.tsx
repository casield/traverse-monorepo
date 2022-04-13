import { FC, useEffect, useRef, useState } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

const render = (status: Status) => {
    console.log(status)
    if (status === Status.FAILURE) return <div>Error</div>
    return <div>Loading</div>
}
const TraverseMap: FC = () => {
    const ref = useRef<HTMLHeadingElement>(null)
    const [loaded, setLoaded] = useState(false)
    const [map, setMap] = useState<google.maps.Map>()
    useEffect(() => {
        if (!ref.current) return
        const map = new window.google.maps.Map(ref.current, {
            center: { lat: 19.351034980369246, lng: -99.17647082054216 },
            zoom: 13,
        })

        setMap(map)

        console.log('Map', map)

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('Latitude is :', position.coords.latitude)
            console.log('Longitude is :', position.coords.longitude)
        })
    }, [loaded])

    return (
        <Wrapper
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}
            render={render}
            callback={(status, loader) => {
                console.log({ status, loader })
                if (status === Status.SUCCESS) {
                    setLoaded(true)
                }
            }}
        >
            <div ref={ref} id="map" className="h-96 w-full border-2"></div>
            <button
                onClick={() => {
                    //19.372836070357412, -99.21689304560884
                    map?.setCenter({
                        lat: 19.372836070357412,
                        lng: -99.21689304560884,
                    })
                    map?.setZoom(15)
                }}
            >
                Change place
            </button>
        </Wrapper>
    )
}

export default TraverseMap
