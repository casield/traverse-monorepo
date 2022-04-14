import * as Colyseus from 'colyseus.js' // not necessary if included via <script> tag.
import { Player } from 'schema/Player'
import { V2 } from 'schema/V2'
import { WorldState } from 'schema/WorldState'
export const onConnectRoom = (
    room: Colyseus.Room<WorldState>,
    map: google.maps.Map
) => {
    const timeout = setInterval(() => {
        navigator.geolocation.getCurrentPosition(function (_position) {
            const pos: any = {}
            pos.lat = _position.coords.latitude
            pos.lng = _position.coords.longitude
            room.send('changePos', pos)
        })
    }, 1000)

    room.onLeave((code) => {
        clearInterval(timeout)
    })

    const players: { [key: string]: PlayerMarker } = {}

    room.state.players.onAdd = (player, key) => {
        console.log('New player!')
        const marker = new google.maps.Marker({
            position: player.position,
            map: map,
            title: 'Hello',
        })
        players[key] = { player: player, marker }
        player.onChange = (changes) => {
            for (const change of changes) {
                if (change.field === 'position') {
                    console.log('new pos', change)
                    marker.setPosition(change.value)
                }
            }
        }
        player.triggerAll()
    }

    return { timeout }
}

export interface PlayerMarker {
    player: Player
    marker: google.maps.Marker
}
