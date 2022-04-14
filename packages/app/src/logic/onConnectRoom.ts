import * as Colyseus from 'colyseus.js' // not necessary if included via <script> tag.
export const onConnectRoom = (room: Colyseus.Room, map: google.maps.Map) => {
    const timeout = setInterval(() => {
        navigator.geolocation.getCurrentPosition(function (_position) {
            console.log('Latitude is :', _position.coords.latitude)
            console.log('Longitude is :', _position.coords.longitude)
            room.send('changePos', {
                position: {
                    lat: _position.coords.latitude,
                    lng: _position.coords.longitude,
                },
            })
        })
    }, 1000)

    const playersMakers = room.onStateChange((state) => {})

    return { timeout }
}

export interface Player {}
