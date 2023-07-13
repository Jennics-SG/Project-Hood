/** Name:   Project-Hood.engine.ts
 *  Desc:   Game engine for project hood
 *  Author: Jimy Houlbrook
 *  Date:   13/07/2023
 */

import * as PIXI from 'pixi.js';
import { Player } from './player';

export class Engine {
    // worldLevel is a container of items that move with the world
    private worldLevel: PIXI.Container;

    // playerLevel is a container of items that move with the player
    private playerLevel: PIXI.Container;

    // uiLevel is a container of items that are static on the screen
    private uiLevel: PIXI.Container;

    constructor(app: PIXI.Application){
        this.worldLevel = new PIXI.Container();
        this.playerLevel = new PIXI.Container();
        this.uiLevel = new PIXI.Container();

        this.worldLevel.zIndex = 0;
        this.playerLevel.zIndex = 1;
        this.uiLevel.zIndex = 3;

        app.stage.addChild(this.worldLevel);
        app.stage.addChild(this.playerLevel);
        app.stage.addChild(this.uiLevel);
    }

    // Add node too worldLevel container
    public addToWorld = (node: PIXI.Sprite | PIXI.Container): void =>{
        this.worldLevel.addChild(node);
    }

    // Add node to playerLevel conatiner
    public addToPlayerLevel = (node: PIXI.Sprite | PIXI.Container): void => {
        this.playerLevel.addChild(node);
    }

    // Add node to uiLevel contianer
    public addToUI = (node: PIXI.Sprite | PIXI.Container): void => {
        this.uiLevel.addChild(node);
    }

    // Move the player character around the deadzone or move the world container around the player
    public movePlayer = (player: Player, dir: String): void => {
        const speed: number = player.stats.speed;
        
        switch(dir){
            case "up":
                player.y -= speed;
                break;
            case "down":
                player.y += speed;
                break;
            case "left":
                player.x -= speed;
                break;
            case "right":
                player.x += speed;
                break;
            default:
                console.error(`ERR: dir is unkown \nDir: ${dir}`);
                break
        }
    } 
}