/** Name:   Project-Hood.character.ts
 *  Desc:   Logic and variables for Characters within the game, works as primitive for player
 *  Author: Jimy Houlbrook
 *  Date:   13/07/2023
 */

import { Sprite, Texture } from 'pixi.js';
import Hood from '.';

type Stats = {
    readonly type: string
    health: number,
    speed: number
}

export class Character extends Sprite{
    public readonly stats: Stats;
    public readonly hood: Hood

    constructor(type: string, health: number, texture: Texture, x: number = 0, y: number = 0, w: number, h: number, hood: Hood){
        super(texture);

        this.hood = hood;

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.stats = {
            type: type,
            health: health,
            speed: 0
        }

        // Display stats when mouseover
        this.eventMode = "static";
        this.onmousedown = (): void => {
            console.table(this.stats)
        }
    }

    // Change the characters health stat
    public changeHealth = (x: number): void => {
        this.stats.health += x;
    }

    // Set character speed
    public setSpeed = (x: number): void => {
        this.stats.speed = x;
    }

    // Runs every tick
    public delta = (): void => {

    }
}