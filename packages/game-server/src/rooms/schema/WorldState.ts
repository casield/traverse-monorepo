import { Schema, Context, type, MapSchema } from '@colyseus/schema'

export class V2 extends Schema {
    @type('float32') lat: number = 0
    @type('float32') lng: number = 0
}

export class Player extends Schema {
    @type(V2) position: V2 = new V2()
    @type('string') name: string = ''
}

export class WorldState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>()
}
