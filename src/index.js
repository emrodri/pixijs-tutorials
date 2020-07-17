import {
  handleDoneLoading,
  handleLoadingError,
  handleProgress,
  preloadResources,
} from './loader';
import { keyboard, keyboardInit } from './keyboard';
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
import { assets } from './assets';
import { bullets } from './bullets';
import { createPlayerFrom } from './player';

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

app.stage.width = window.innerWidth;
app.stage.height = window.innerHeight;
const appContainer = document.getElementById('gameContainer');
appContainer.appendChild(app.view);

// Preloader
preloadResources(assets, app).load(() => {
  // On loaded items
  const { resources } = app.loader;
  keyboard.init();
  const player = createPlayerFrom(resources.player.texture);
  bullets.initOn(appContainer, app, player);
  moveToCenter(player, app);
  app.stage.addChild(player);
  app.ticker.add(() => keyboard.moveSprite(player));
  app.ticker.add((delta) => bullets.updateBullets());
});
