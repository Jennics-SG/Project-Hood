/** Name:   Project Hood Inndex.ts file
 *  Desc:   Main faile of project hood
 *  Author: Jimy Houlbrook
 *  Date:   12/07/2023
 */

import {Assets, Application, Sprite} from 'pixi.js';

import { Character } from './character';
import { Player } from './player';
import { Engine } from './engine';

export default class Hood {
    private app : Application;
    public engine: Engine;

    constructor(){
        this.app = new Application<HTMLCanvasElement>({
            resolution: Math.max(window.devicePixelRatio, 2),
            backgroundColor: 0x2f9da3,
            hello: true,
            view: <HTMLCanvasElement>document.getElementById('game')
        });

        this.engine = new Engine(this.app);

        this.init();
    }

    // Credit for this function:
    // https://github.com/pixijs/open-games/blob/main/bubbo-bubbo/src/main.ts
    resize(){
        // Exit func if app renderer styles are undefined
        // This is here bcs typescript was being STOOPID
        // and thought the renderer styles would be empty
        if(this.app.renderer.view.style === undefined)
            return;

        // Window Size
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        // Min application size
        const minW = 428;
        const minH = 925;

        // Calculate renderer and canvas sizes
        const scaleX = winW < minW ? minW / winW : 1;
        const scaleY = winH < minH ? minH / winH : 1;
        const scale = scaleX > scaleY ? scaleX : scaleX
        const w = winW * scale;
        const h = winH * scale;

        // Update canvas style dimensions
        this.app.renderer.view.style.width = `${winW}px`;
        this.app.renderer.view.style.height = `${winH}px`;

        // See PIXI-Open-Games/bubbo-bubbo/src/main.ts for mobile resize

        // Update renderer dims
        this.app.renderer.resize(w, h);
    }

    async init(){
        // Listener for resize
        window.addEventListener('resize', this.resize);

        // Call resize
        this.resize();

        // TEMP : Load background
        // Will be replaced when more assets need loading
        Assets.addBundle('files', [
            {
            name: "background",
            srcs: "../Assets/testbg.png"
            },
            {
                name: "missing_texture",
                "srcs": "../Assets/missing_texture.png"
            }
        ]);
        await Assets.loadBundle('files');

        const bg : Sprite = Sprite.from(Assets.get('background'))
        bg.width = this.app.view.width;
        bg.height = this.app.view.height;
        this.engine.addToWorld(bg);

        const char : Character = new Character("test", 0, Assets.get('missing_texture'), 0, 0, 75, 150, this);
        this.engine.addToWorld(char)

        const player : Player = new Player("play", 0, Assets.get("missing_texture"), 300, 300, 75, 100, this);
        this.engine.addToPlayerLevel(player);

        this.app.ticker.add(player.delta);
    }
}

window.addEventListener('DOMContentLoaded', () => new Hood);