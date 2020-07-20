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
import { enemyMovement } from './enemyMovement';
import { rectsIntersect } from './collisions';

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
  let speed = 8;
  const player = createPlayerFrom(resources.player.texture);
  moveToPos(player, { x: app.view.width / 2, y: app.view.height - 32 });

  const enemy = createPlayerFrom(resources.player.texture);
  moveToPos(enemy, { x: app.view.width / 2, y: 32 });

  keyboard.init(app, player);
  enemyMovement.init(app, enemy);
  bullets.initOn(appContainer, app, player, enemy);

  app.stage.addChild(player);
  app.stage.addChild(enemy);
});
