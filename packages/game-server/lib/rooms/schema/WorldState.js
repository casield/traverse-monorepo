"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldState = exports.Player = exports.V2 = void 0;
const schema_1 = require("@colyseus/schema");
class V2 extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.lat = 0;
        this.lng = 0;
    }
}
__decorate([
    schema_1.type('float64')
], V2.prototype, "lat", void 0);
__decorate([
    schema_1.type('float64')
], V2.prototype, "lng", void 0);
exports.V2 = V2;
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.position = new V2();
        this.name = '';
    }
}
__decorate([
    schema_1.type(V2)
], Player.prototype, "position", void 0);
__decorate([
    schema_1.type('string')
], Player.prototype, "name", void 0);
exports.Player = Player;
class WorldState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
    }
}
__decorate([
    schema_1.type({ map: Player })
], WorldState.prototype, "players", void 0);
exports.WorldState = WorldState;
