import { Room, Client } from 'colyseus'
import { Player, WorldState } from './schema/WorldState'

export class WorldRoom extends Room<WorldState> {
    onCreate(options: any) {
        this.setState(new WorldState())

        this.onMessage('changePos', (client, message) => {
            console.log(message)
        })
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, 'joined!')
        this.state.players.set(client.sessionId, new Player())
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, 'left!')
    }

    onDispose() {
        console.log('room', this.roomId, 'disposing...')
    }
}
