# Test Assessment - Picsart

![Task](test-task.pdf)

## Some notes

I decided to use vanilla JS for the canvas, though in real life I would
probably use a library like 'konva' or 'fabric.js' for this kind of tasks.

I used React.Context as a state management solution, in real app that might
be replaced with Redux, MobX, DI Container, and similar logic-containing approaches

I used two canvases: one for the image and one for the picker. Probably,
it could be done with one canvas, but I thought it would be easier to separate
the two, at least for this task.

Initially I used `.getImageData` method to get the pixel data of the image,
but it seems to be too slow in Firefox, so I switched to a custom function

`mousemove` events could probably be further optimized by throttling,
but it seems like modern browsers automatically throttle it to refresh rate

I added some SAFE_ZONE around the image, so it's easier to pick the color at
the edges of the image. It's a bit of a hack, and it should be made more
elegant in a real app, but it works for this task.

`modules` folder: I usually split the code into modules, for these task it's three
modules: `picker`, `hooks`, `utils`. It is an intentional over-engineering
to show how it could look inside a bigger project.

It works pretty well in WebKit browsers, but it's a bit slow in Firefox with
larger canvases. I haven't tested it in Safari as I don't have a Mac in my disposal.
Basic research showed that it might be optimized further with the usage of Offscreen
Canvas, Web Workers and/or Web Assembly. But probably it's out of the scope
of this task as it shows decent performance with 4000x4000 canvas.

I wrote some tests for two functions, not a full coverage, just to show

No mobile version as the task doesn't imply it.
