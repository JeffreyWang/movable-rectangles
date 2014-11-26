(function (root, undefined) {

    var document = root.document,
        /*canvas = document.getElementById('canvas'),
        cxt = canvas.getContext('2d'),
        cxt.fillStyle = 'red';*/

        function Rectangle(anchorX, anchorY, x, y){
            this.anchorX = anchorX || 0;
            this.anchorY = anchorY || 0;
            this.x = x || 1;
            this.y = y || 1;
        }

        Rectangle.prototype.draw = function(cxt){
            cxt.fillRect(this.anchorX, this.anchorY, this.x, this.y);
        }



        function CanvasState(canvas){
            this.canvas = canvas;
            this.context = canvas.getContext('2d');
            this.rectangles = [];
            this.reDrawFlag = false;
            this.draggingFlag = false;

            this.selectedRectangle = null;

            this.dragOffsetX = 0;
            this.dragOffsetY = 0;

            setInterval();

            var that = this;

            canvas.addEventListener('mousedown', function(e){

                var mouseCoordinate = that.getMouseOffsetInCanvas(e);
                var length = that.rectangles.length;

                for(var i = length-1; i>=0; i--){
                    if(mouseCoordinate.x <= rectangles[i].anchorX + rectangles[i].x && mouseCoordinate.y <= rectangles[i].anchorY + rectangles[i].y ){
                        that.selectedRectangle = rectangles[i];
                        //this is the mouse's coordinate, it's not the actual offset, when the mouse, use the real offset to update these values;
                        dragOffsetX = mouseCoordinate.x;
                        dragOffsetY = mouseCoordinate.y;
                    }
                }

                if(that.selectedRectangle){
                    that.draggingFlag = true;
                }
            });

            canvas.addEventListener('mousemove', function(e){
                if(that.draggingFlag){
                    var mouseCoordinates = that.getMouseOffsetInCanvas(e);
                    that.dragOffsetX = mouseCoordinates.x - that.dragOffsetX;
                    that.dragOffsetY = mouseCoordinates.y - that.dragOffsetY;
                    that.reDrawFlag = true;
                }
            });

            canvas.addEventListener('mouseup', function(){
                that.reDrawFlag = false;
                that.draggingFlag = false;
            });

        }

        CanvasState.prototype.addRectangle = function(rectangle){
            this.rectangles.push(rectangle);
        }

        CanvasState.prototype.draw = function(){
            if(this.reDrawFlag){
                var rectangles = this.rectangles,
                    context = this.context;

                    context.clearRect(0, 0, this.);
            }
        }

        // the helper function: help to get the given element's document coordinates
        function getElementOffset(elem){
                var box = elem.getBoundingClientRect(),
                    body = document.body,
                    docElem = document.documentElement;

                    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                        clientTop = docElem.clientTop || body.clientTop || 0,
                        clientLeft = docElem.clientLeft || body.clientLeft || 0,
                    
                    var top  = box.top +  scrollTop - clientTop,
                        left = box.left + scrollLeft - clientLeft;

                return { top: Math.round(top), left: Math.round(left)};

        }

        CanvasState.prototype.getMouseOffsetInCanvas = function(e){

            var canvasOffset = getElementOffset(this.canvas);

            var x = e.pageX - canvas.left;
                y = e.pageY - canvas.top;

            return {x:x, y:y};
        }

})(this);
