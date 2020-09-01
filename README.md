Redux:

**Board** - contains board (matrix 6x17 squares):

every square (cell):
=== null 
or ===  {mainCell, width, height},

where _mainCell_ === [x,y] - coordinates of the
main square (lowest x and y),

_width_ - width of the item in squares,
_height_ - height of the item in squares


**Dragged Item** - contains info about currently dragged 
item and hovered squares:

_mainCell_, _width_, _height_ - info about currently dragged item
from **Board** reducer.

_xUp_, _xDown_, _yUp_, _yDown_ - numbers, how many squares 
of item exist in relation to the square over which the 
item is being dragged

_hoveredSquare_ === [x,y] - single square hovered the 
mouse over

_allHoveredSquares_ - [[x,y],...] - array of all hovered
squares (depend on item size)

_canDrop_ - boolean, indicate can we drop an item


**Alert** - array of alerts to display

_alert_ === {msg, alertType, id}


