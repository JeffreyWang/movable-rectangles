(function (root, undefined) {

        var document = root.document;

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

            this.curMouseCoordinateX = 0;
            this.curMouseCoordinateY = 0;


            var that = this;

            setInterval(function(){
                            if(that.reDrawFlag){
                                var rectangles = that.rectangles,
                                    canvas = that.canvas,
                                    context = that.context;
                                context.clearRect(0, 0, canvas.width, canvas.height);

                                for(var i=0; i<that.rectangles.length; i++){
                                    rectangles[i].draw(context);
                                }
                            }
            },30);

            canvas.addEventListener('mousedown', function(e){

                var mouseCoordinate = that.getMouseOffsetInCanvas(e);
                var length = that.rectangles.length,
                    rectangles = that.rectangles;

                for(var i = length-1; i>=0; i--){
                    if(mouseCoordinate.x <= rectangles[i].anchorX + rectangles[i].x && mouseCoordinate.y <= rectangles[i].anchorY + rectangles[i].y ){
                        that.selectedRectangle = rectangles[i];
                        
                        that.curMouseCoordinateX = mouseCoordinate.x;
                        that.curMouseCoordinateY = mouseCoordinate.y;

                        that.draggingFlag = true;
                        return;
                    }
                }

                if(that.selectedRectangle){
                    that.selectedRectangle = null;
                    that.reDrawFlag = false;
                }

            },true);

            canvas.addEventListener('mousemove', function(e){
                if(that.draggingFlag){
                    var mouseCoordinates = that.getMouseOffsetInCanvas(e);
                    that.selectedRectangle.anchorX = that.selectedRectangle.anchorX + mouseCoordinates.x - that.curMouseCoordinateX;
                    that.selectedRectangle.anchorY = that.selectedRectangle.anchorY + mouseCoordinates.y - that.curMouseCoordinateY;
                    that.curMouseCoordinateX = mouseCoordinates.x;
                    that.curMouseCoordinateY = mouseCoordinates.y; 
                    that.reDrawFlag = true;
                }
            }, true);

            canvas.addEventListener('mouseup', function(e){
                that.reDrawFlag = false;
                that.draggingFlag = false;
            }, true);

        }

        CanvasState.prototype.addRectangle = function(rectangle){
            this.rectangles.push(rectangle);
        }

        // the helper function: help to get the given element's document coordinates
        function getElementOffset(elem){
                var box = elem.getBoundingClientRect(),
                    body = document.body,
                    docElem = document.documentElement;

                    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                        clientTop = docElem.clientTop || body.clientTop || 0,
                        clientLeft = docElem.clientLeft || body.clientLeft || 0;
                    
                    var top  = box.top +  scrollTop - clientTop,
                        left = box.left + scrollLeft - clientLeft;

                return { top: Math.round(top), left: Math.round(left)};

        }

        CanvasState.prototype.getMouseOffsetInCanvas = function(e){

            var canvasOffset = getElementOffset(this.canvas);

            var x = e.pageX - canvasOffset.left,
                y = e.pageY - canvasOffset.top;

            return {x:x, y:y};
        }

        ;(function init(){
            var canvas = document.getElementById('canvas'),
                cxt = canvas.getContext('2d');
            cxt.fillStyle = 'blue';
            var rectangle = new Rectangle(0,0,100,50);
            rectangle.draw(cxt);
            var canvasState = new CanvasState(canvas);
            canvasState.addRectangle(rectangle);
        })();

})(this);
