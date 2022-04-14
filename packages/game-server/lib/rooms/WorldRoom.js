"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldRoom = void 0;
const colyseus_1 = require("colyseus");
const WorldState_1 = require("./schema/WorldState");
class WorldRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new WorldState_1.WorldState());
        this.onMessage('changePos', (client, message) => {
            console.log(message);
            this.state.players.get(client.sessionId).position.lat = message.lat;
            this.state.players.get(client.sessionId).position.lng = message.lng;
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, 'joined!');
        this.state.players.set(client.sessionId, new WorldState_1.Player());
    }
    onLeave(client, consented) {
        console.log(client.sessionId, 'left!');
    }
    onDispose() {
        console.log('room', this.roomId, 'disposing...');
    }
}
exports.WorldRoom = WorldRoom;
