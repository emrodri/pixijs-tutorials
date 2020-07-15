import { keyboard, keyboardInit, moveSprite } from './keyboard';
import { moveToCenter, moveToPointer, moveToPos } from './helpers';

// And just for convenience let's register Loader plugin in order to use it right from Application instance like app.loader.add(..) etc.
import { AppLoaderPlugin } from '@pixi/loaders';
// Import Application class that is the main part of our PIXI project
import { Application } from '@pixi/app';
import { BatchRenderer } from '@pixi/core'; // BatchRenderer is the "plugin" for drawing sprites
import { InteractionManager } from '@pixi/interaction';
// In order that PIXI could render things we need to register appropriate plugins
import { Renderer } from '@pixi/core'; // Renderer is the class that is going to register plugins
import { TickerPlugin } from '@pixi/ticker'; // TickerPlugin is the plugin for running an update loop (it's for the application class)
import { createPlayer } from './player';

Renderer.registerPlugin('batch', BatchRenderer);
Renderer.registerPlugin('interaction', InteractionManager);

Application.registerPlugin(TickerPlugin);

Application.registerPlugin(AppLoaderPlugin);

// App with width and height of the page
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x061639,
});
 
app.stage.interactive = true;
document.body.appendChild(app.view);

keyboard.init();

const player = createPlayer();
moveToCenter(player, app);

app.stage.addChild(player);


app.ticker.add(() => moveSprite(player));


app.stage.on('pointermove', (pointerMoveEvent) =>
  moveToPointer(player, pointerMoveEvent)
);
