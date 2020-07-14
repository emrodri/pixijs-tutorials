import { Application } from '@pixi/app';
//Needs ticker to start application
import { TickerPlugin } from '@pixi/ticker';

Application.registerPlugin(TickerPlugin);
// App with width and height of the page
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight, 
  backgroundColor: 0xAAAAAA
}); 
document.body.appendChild(app.view);