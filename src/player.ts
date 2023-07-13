/** Name:   Project-Hood.player.ts
 *  Desc:   All logic and controlls for Player Character
 *  Author: Jimy Houlbrook
 *  Date:   13/07/2023
 */

import { Character } from "./character";
import Hood from ".";

import { Texture } from "pixi.js";

type Keys = {
    [key: string]: boolean,
}

export class Player extends Character{
    private keys : Keys;

    constructor(type: string, health: number, texture: Texture, x: number = 0, y: number = 0, w: number, h: number, hood: Hood){
        super(type, health, texture, x, y, w, h, hood);

        // Movement logic
        this.keys = {
            "KeyW": false,
            "KeyA": false,
            "KeyS": false,
            "KeyD": false,
        }

        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keypress", this.onKeyUp)
    }

    private onKeyDown = (e: KeyboardEvent): void => {
        console.log(e.code);
        this.keys[e.code] = true;
        console.table(this.keys);
    }

    private onKeyUp = (e: KeyboardEvent): void => {
        this.keys[e.code] = false;
    }

    // Runs every tick
    public delta = (): void => {

        // Moves the character
        if(this.keys["KeyA"]) this.hood.engine.movePlayer(this, "left");
        if(this.keys["KeyD"]) this.hood.engine.movePlayer(this, "right");
        if(this.keys["KeyW"]) this.hood.engine.movePlayer(this, "up");
        if(this.keys["KeyS"]) this.hood.engine.movePlayer(this, "down");
    }
}