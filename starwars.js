var LINES_PER_FRAME = 14;
var DELAY_NORMAL = 67;
var DELAY_FAST = 17;
var DELAY_VERYFAST = 1;

var g_currentFrame = 0;
var g_updateDelay = DELAY_NORMAL;
var g_frameStep = 1; //advance one frame per tick
var g_timerHandle = null;

function validateFrame(frameNumber) {
  return frameNumber > 0 && frameNumber < Math.floor(film.length/LINES_PER_FRAME);
}

function displayFrame(frameNumber) {
  if(validateFrame(frameNumber) != true) return;

  var screen = document.getElementById('screen');

  while(screen.firstChild)
    screen.removeChild(screen.firstChild);

  for(var line = 1; line < 14; line++) {
    var lineText = film[ (g_currentFrame * LINES_PER_FRAME) + line];
    if(!lineText || lineText.length < 1) lineText = ' ';

    var div = document.createElement('div');
    div.style.whiteSpace = 'pre';
    div.appendChild( document.createTextNode( lineText ) );

    screen.appendChild( div );
  }
}

function updateDisplay()
{
    if(g_timerHandle)
        clearTimeout(g_timerHandle);

    displayFrame(g_currentFrame);

    if( g_frameStep != 0 )
    {
        //read the first line of the current frame as it is a number containing how many times this frame should be displayed
        var nextFrameDelay = film[ g_currentFrame * LINES_PER_FRAME ] * g_updateDelay;

        var nextFrame = g_currentFrame + g_frameStep;

        if(validateFrame(nextFrame) == true)
            g_currentFrame = nextFrame;

        g_timerHandle = setTimeout( updateDisplay, nextFrameDelay );
    }
}

function Start()
{
    g_currentFrame = 0;
    Play();
}

function VeryFastRewind()
{
    g_frameStep = -1;
    g_updateDelay = DELAY_VERYFAST;
    updateDisplay();
}

function Rewind()
{
    g_frameStep = -1;
    g_updateDelay = DELAY_FAST;
    updateDisplay();
}

function FrameBack()
{
    g_frameStep = 0;

    var nextFrame = g_currentFrame - 1;
    if(validateFrame(nextFrame) == true)
        g_currentFrame = nextFrame;

    updateDisplay();
}

function Stop()
{
    g_frameStep = 0;
    updateDisplay();
}

function FrameAdvance()
{
    g_frameStep = 0;

    var nextFrame = g_currentFrame + 1;
    if(validateFrame(nextFrame) == true)
        g_currentFrame = nextFrame;

    updateDisplay();
}

function Play()
{
    g_frameStep = 1;
    g_updateDelay = DELAY_NORMAL;
    updateDisplay();
}

function FastForward()
{
    g_frameStep = 1;
    g_updateDelay = DELAY_FAST;
    updateDisplay();
}

function VeryFastForward()
{
    g_frameStep = 1;
    g_updateDelay = DELAY_VERYFAST;
    updateDisplay();
}

function End()
{
    g_frameStep = 0;
    g_currentFrame = Math.floor( film.length / LINES_PER_FRAME ) - 1;
    updateDisplay();
}