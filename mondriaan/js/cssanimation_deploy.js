(function(window, document, undefined) {
  
  /****************************************************************************/
  /*                                                                          */
  /****************************************************************************/
 
  var utilities = {
   OBJECT_NAME: 'utilities',
 
   //****************************************************************************
   //
   //****************************************************************************
 
   removeChildrenContainer: function(container) { 
    'use strict';
 
    var a, entries;
 
    entries = container.childNodes.length;
 
    for (a = 0; a < entries; a += 1) {
     while (container.lastChild.hasChildNodes()) {
      this.removeChildrenContainer(container.lastChild);
     }
     container.removeChild(container.lastChild);
    }
   }
 
  }; 
 
 
 
  //****************************************************************************
  //                                                                           
  //****************************************************************************
 
  CSSAnimation.CONTENT_BORDER = 20;
 
  //***************************************************************************
  //    
  //***************************************************************************
 
  function CSSAnimation(
                        container
                       ) {
   'use strict';
  
   this.container = document.getElementById(container);
   this.width = $(this.container).width();
   this.height = $(this.container).height();
   this.containerAnim = document.createElement('div');
   this.containerAnim.id = 'css-anim-container';
   this.containerAnim.style.position = 'absolute';
   this.data = null;
   this.container.appendChild(this.containerAnim);
   this.lookupIcons = [];
   this.idTimeout = null;
   this.cssPrefix = '';
   this.cssProperties = {
                         animationName: 'animationName',
                         animationDuration: 'animationDuration',
                         animationIterationCount: 'animationIterationCount',
                         animationTimingFunction: 'animationTimingFunction',
                         animationDelay: 'animationDelay',
                         animationFillMode: 'animationFillMode'
                        };
   this.lookup = [
                  { x: 272, y: 165, color:        0, width: 14, height: 105, surface: 48},
                  { x: 286, y: 200, color:        0, width:  7, height: 119, surface: 36},
                  { x: 300, y: 319, color:   197494, width: 14, height:  56, surface: 27},
                  { x: 272, y: 326, color: 14078923, width: 28, height:  28, surface: 25},
                  { x: 398, y: 214, color:   197494, width:  7, height:  63, surface: 20},
                  { x: 314, y: 326, color: 16443474, width: 35, height:  14, surface: 18},
                  { x: 321, y:  74, color: 14078923, width: 56, height:   7, surface: 18},
                  { x: 370, y: 256, color: 16443474, width: 14, height:  35, surface: 18},
                  { x: 251, y: 179, color:        0, width: 14, height:  35, surface: 18},
                  { x: 321, y: 116, color: 14078923, width: 49, height:   7, surface: 16},
                  { x: 279, y: 144, color:        0, width: 21, height:  21, surface: 16},
                  { x: 181, y: 235, color: 14078923, width: 49, height:   7, surface: 16},
                  { x: 405, y: 116, color:   197494, width:  7, height:  49, surface: 16},
                  { x: 265, y: 193, color:        0, width:  7, height:  49, surface: 16},
                  { x: 111, y: 179, color: 14078923, width: 49, height:   7, surface: 16},
                  { x: 258, y: 130, color:        0, width: 28, height:  14, surface: 15},
                  { x: 356, y: 242, color: 16443474, width: 14, height:  28, surface: 15},
                  { x: 181, y: 193, color: 14078923, width: 14, height:  28, surface: 15},
                  { x: 244, y: 102, color:        0, width:  7, height:  42, surface: 14},
                  { x: 258, y:  67, color:   197494, width:  7, height:  42, surface: 14},
                  { x: 279, y: 270, color:        0, width:  7, height:  35, surface: 12},
                  { x: 111, y: 193, color: 14078923, width: 35, height:   7, surface: 12},
                  { x: 300, y:  39, color: 16443474, width: 21, height:  14, surface: 12},
                  { x: 230, y:  60, color: 14078923, width: 21, height:  14, surface: 12},
                  { x: 426, y: 158, color: 14078923, width:  7, height:  35, surface: 12},
                  { x: 475, y: 186, color: 14078923, width: 14, height:  21, surface: 12},
                  { x: 146, y: 172, color: 14078923, width: 35, height:   7, surface: 12},
                  { x: 384, y: 200, color: 16443474, width:  7, height:  35, surface: 12},
                  { x: 391, y: 186, color: 16443474, width: 14, height:  21, surface: 12},
                  { x: 384, y: 242, color: 16443474, width: 14, height:  21, surface: 12},
                  { x: 356, y: 298, color: 16443474, width: 21, height:  14, surface: 12},
                  { x: 356, y: 179, color: 14078923, width: 14, height:  21, surface: 12},
                  { x: 237, y: 319, color:   197494, width: 35, height:   7, surface: 12},
                  { x: 307, y: 263, color: 16443474, width: 21, height:  14, surface: 12},
                  { x: 377, y: 221, color: 16443474, width:  7, height:  28, surface: 10},
                  { x: 181, y: 109, color: 14078923, width:  7, height:  28, surface: 10},
                  { x: 160, y: 242, color: 14078923, width: 28, height:   7, surface: 10},
                  { x: 195, y: 256, color: 14078923, width:  7, height:  28, surface: 10},
                  { x: 335, y: 291, color: 12126216, width:  7, height:  28, surface: 10},
                  { x: 286, y: 165, color:        0, width:  7, height:  28, surface: 10},
                  { x: 342, y: 228, color: 16443474, width:  7, height:  28, surface: 10},
                  { x: 314, y: 151, color: 14078923, width:  7, height:  28, surface: 10},
                  { x: 349, y: 277, color: 12126216, width:  7, height:  28, surface: 10},
                  { x: 293, y: 179, color: 16443474, width:  7, height:  28, surface: 10},
                  { x: 244, y: 158, color:   197494, width:  7, height:  28, surface: 10},
                  { x: 223, y: 305, color: 14078923, width: 28, height:   7, surface: 10},
                  { x: 195, y: 221, color: 14078923, width: 28, height:   7, surface: 10},
                  { x: 174, y: 123, color: 14078923, width:  7, height:  28, surface: 10},
                  { x: 293, y: 256, color:   197494, width:  7, height:  28, surface: 10},
                  { x: 300, y:  32, color: 12126216, width: 28, height:   7, surface: 10},
                  { x: 139, y: 200, color: 14078923, width:  7, height:  28, surface: 10},
                  { x: 223, y: 200, color: 16443474, width: 28, height:   7, surface: 10},
                  { x: 209, y: 109, color: 14078923, width: 28, height:   7, surface: 10},
                  { x: 265, y:  81, color: 14078923, width: 14, height:  14, surface: 9},
                  { x: 132, y: 158, color: 14078923, width: 14, height:  14, surface: 9},
                  { x: 349, y: 144, color:        0, width: 14, height:  14, surface: 9},
                  { x: 272, y: 109, color: 16443474, width: 14, height:  14, surface: 9},
                  { x: 384, y: 165, color: 14078923, width: 14, height:  14, surface: 9},
                  { x: 286, y:  53, color: 16443474, width: 14, height:  14, surface: 9},
                  { x: 384, y:  95, color: 14078923, width: 14, height:  14, surface: 9},
                  { x: 342, y: 312, color: 16443474, width: 14, height:  14, surface: 9},
                  { x: 258, y: 333, color:   197494, width: 14, height:  14, surface: 9},
                  { x: 412, y: 130, color:   197494, width: 14, height:  14, surface: 9},
                  { x: 279, y: 354, color:   197494, width: 14, height:  14, surface: 9},
                  { x: 265, y:  60, color:   197494, width: 14, height:  14, surface: 9},
                  { x: 321, y: 277, color: 16443474, width: 14, height:  14, surface: 9},
                  { x: 195, y: 186, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 349, y: 123, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 258, y: 221, color:        0, width:  7, height:  21, surface: 8},
                  { x: 132, y: 186, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 314, y: 214, color: 16443474, width:  7, height:  21, surface: 8},
                  { x: 244, y:  46, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 279, y:  74, color: 16443474, width:  7, height:  21, surface: 8},
                  { x: 321, y: 256, color: 16443474, width: 21, height:   7, surface: 8},
                  { x: 314, y: 354, color: 12126216, width:  7, height:  21, surface: 8},
                  { x: 398, y: 116, color: 12126216, width:  7, height:  21, surface: 8},
                  { x: 286, y: 123, color: 16443474, width: 21, height:   7, surface: 8},
                  { x: 300, y: 186, color: 14078923, width:  7, height:  21, surface: 8},
                  { x: 258, y: 123, color:   197494, width: 21, height:   7, surface: 8},
                  { x: 160, y: 137, color: 14078923, width:  7, height:  21, surface: 8},
                  { x: 328, y: 179, color: 12126216, width: 21, height:   7, surface: 8},
                  { x: 342, y:  46, color: 14078923, width:  7, height:  21, surface: 8},
                  { x: 293, y: 312, color:   197494, width: 21, height:   7, surface: 8},
                  { x: 300, y: 137, color:   197494, width:  7, height:  21, surface: 8},
                  { x: 216, y: 123, color: 14078923, width:  7, height:  21, surface: 8},
                  { x: 265, y:  95, color:   197494, width:  7, height:  21, surface: 8},
                  { x: 356, y: 158, color:   197494, width:  7, height:  21, surface: 8},
                  { x: 300, y: 291, color:        0, width:  7, height:  21, surface: 8},
                  { x: 293, y: 235, color:        0, width:  7, height:  21, surface: 8},
                  { x: 440, y: 221, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 405, y: 263, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 181, y: 179, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 216, y: 242, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 356, y: 291, color: 12126216, width: 21, height:   7, surface: 8},
                  { x: 251, y: 256, color: 14078923, width:  7, height:  21, surface: 8},
                  { x: 300, y: 263, color: 12126216, width:  7, height:  21, surface: 8},
                  { x: 398, y: 179, color: 16443474, width: 21, height:   7, surface: 8},
                  { x: 272, y: 305, color:        0, width:  7, height:  21, surface: 8},
                  { x: 391, y: 130, color: 14078923, width:  7, height:  21, surface: 8},
                  { x: 237, y: 116, color: 16443474, width:  7, height:  21, surface: 8},
                  { x: 384, y: 151, color: 12126216, width: 21, height:   7, surface: 8},
                  { x: 237, y: 249, color: 16443474, width: 21, height:   7, surface: 8},
                  { x: 335, y: 158, color: 12126216, width: 21, height:   7, surface: 8},
                  { x: 265, y:  32, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 321, y: 242, color: 16443474, width: 21, height:   7, surface: 8},
                  { x: 251, y: 109, color:        0, width:  7, height:  21, surface: 8},
                  { x: 384, y: 158, color: 16443474, width: 21, height:   7, surface: 8},
                  { x: 279, y: 305, color:   197494, width:  7, height:  21, surface: 8},
                  { x: 447, y: 165, color: 14078923, width: 21, height:   7, surface: 8},
                  { x: 328, y: 340, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 398, y: 277, color:        0, width:  7, height:  14, surface: 6},
                  { x: 335, y: 144, color:   197494, width:  7, height:  14, surface: 6},
                  { x: 307, y: 242, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 335, y: 214, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 286, y: 319, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 447, y: 179, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 272, y:  95, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 251, y: 214, color:   197494, width:  7, height:  14, surface: 6},
                  { x: 335, y: 137, color:        0, width: 14, height:   7, surface: 6},
                  { x: 307, y: 305, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 286, y: 130, color:   197494, width:  7, height:  14, surface: 6},
                  { x: 293, y:  95, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 384, y: 179, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 293, y: 207, color:        0, width:  7, height:  14, surface: 6},
                  { x: 237, y: 228, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 307, y: 298, color:        0, width: 14, height:   7, surface: 6},
                  { x: 258, y: 242, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 468, y: 172, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 370, y: 158, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 321, y: 305, color: 12126216, width: 14, height:   7, surface: 6},
                  { x: 314, y: 179, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 237, y:  88, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 230, y: 291, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 244, y: 242, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 433, y: 228, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 370, y: 137, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 321, y: 291, color: 12126216, width: 14, height:   7, surface: 6},
                  { x: 258, y: 172, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 202, y: 144, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 363, y: 270, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 188, y: 151, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 216, y:  88, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 286, y:  39, color: 12126216, width: 14, height:   7, surface: 6},
                  { x: 118, y: 200, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 321, y: 144, color: 12126216, width: 14, height:   7, surface: 6},
                  { x: 405, y: 221, color:        0, width:  7, height:  14, surface: 6},
                  { x: 328, y: 319, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 223, y:  88, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 307, y: 256, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 405, y: 270, color:   197494, width:  7, height:  14, surface: 6},
                  { x: 216, y: 179, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 237, y: 144, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 440, y: 165, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 202, y: 102, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 300, y: 242, color:   197494, width:  7, height:  14, surface: 6},
                  { x: 321, y: 137, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 202, y: 158, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 405, y: 242, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 146, y: 144, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 321, y: 298, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 237, y: 284, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 349, y: 214, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 349, y: 172, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 237, y: 186, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 426, y: 200, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 335, y: 165, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 265, y: 270, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 244, y: 144, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 216, y: 214, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 300, y:  74, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 286, y:  95, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 391, y: 214, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 174, y: 186, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 412, y: 144, color:        0, width: 14, height:   7, surface: 6},
                  { x: 321, y: 123, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 391, y: 228, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 335, y: 130, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 223, y: 186, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 111, y: 186, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 216, y:  74, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 209, y: 151, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 244, y: 151, color:        0, width: 14, height:   7, surface: 6},
                  { x: 363, y: 158, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 174, y: 249, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 293, y: 221, color:   197494, width:  7, height:  14, surface: 6},
                  { x: 314, y: 312, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 433, y: 137, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 342, y: 298, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 426, y: 151, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 188, y: 109, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 314, y: 340, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 251, y: 165, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 307, y:  25, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 265, y: 249, color:        0, width:  7, height:  14, surface: 6},
                  { x: 307, y: 291, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 272, y: 144, color:        0, width:  7, height:  14, surface: 6},
                  { x: 335, y: 200, color: 12126216, width: 14, height:   7, surface: 6},
                  { x: 307, y: 235, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 244, y: 312, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 405, y: 207, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 293, y: 361, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 244, y:  88, color:   197494, width:  7, height:  14, surface: 6},
                  { x: 321, y: 151, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 174, y: 158, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 195, y:  95, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 202, y: 130, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 440, y: 144, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 223, y: 151, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 216, y: 298, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 356, y:  60, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 363, y: 207, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 272, y: 277, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 342, y: 193, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 244, y: 228, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 321, y: 130, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 293, y: 284, color:        0, width:  7, height:  14, surface: 6},
                  { x: 132, y: 207, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 265, y: 158, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 391, y: 263, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 237, y: 214, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 321, y:  53, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 300, y: 102, color: 16443474, width:  7, height:  14, surface: 6},
                  { x: 279, y:  60, color: 12126216, width:  7, height:  14, surface: 6},
                  { x: 272, y:  53, color:   197494, width: 14, height:   7, surface: 6},
                  { x: 412, y: 235, color: 14078923, width: 14, height:   7, surface: 6},
                  { x: 209, y: 172, color: 16443474, width: 14, height:   7, surface: 6},
                  { x: 440, y: 235, color: 14078923, width:  7, height:  14, surface: 6},
                  { x: 405, y: 256, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 461, y: 186, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 265, y: 263, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 356, y: 270, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 265, y: 151, color:        0, surface: 1, width: 7, height: 7},
                  { x: 307, y: 186, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 433, y: 186, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 321, y: 228, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 223, y: 102, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 370, y: 172, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 307, y: 277, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 265, y:  53, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 377, y: 186, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 230, y: 221, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 258, y:  60, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 328, y: 200, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 426, y: 242, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 251, y: 158, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 307, y:  95, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 251, y:  95, color:        0, surface: 1, width: 7, height: 7},
                  { x: 419, y: 123, color:        0, surface: 1, width: 7, height: 7},
                  { x: 265, y: 179, color:        0, surface: 1, width: 7, height: 7},
                  { x: 307, y: 221, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 370, y: 214, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 314, y: 284, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 426, y: 137, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 181, y: 221, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 356, y: 284, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 454, y: 158, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 321, y: 221, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 265, y:  74, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 300, y: 214, color:        0, surface: 1, width: 7, height: 7},
                  { x: 307, y: 214, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 195, y: 214, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 160, y: 179, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 356, y: 228, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 251, y: 137, color:        0, surface: 1, width: 7, height: 7},
                  { x: 335, y:  46, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 419, y: 200, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 419, y: 221, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 419, y: 256, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 384, y: 137, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 251, y:  60, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 237, y: 172, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 244, y: 193, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 321, y: 165, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 342, y: 144, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 314, y: 207, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 230, y: 158, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 258, y: 158, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 363, y: 221, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 244, y: 186, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 314, y: 249, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 349, y: 165, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 363, y: 172, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 293, y: 109, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 265, y: 326, color:        0, surface: 1, width: 7, height: 7},
                  { x: 377, y: 151, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 160, y: 186, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 279, y:  95, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 370, y: 186, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 293, y:  46, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 209, y: 165, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 349, y: 130, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 244, y: 207, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 405, y: 165, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 286, y: 368, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 237, y: 298, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 363, y: 312, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 349, y: 207, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 272, y:  74, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 251, y: 277, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 391, y: 277, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 230, y: 186, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 412, y: 123, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 209, y: 193, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 328, y: 235, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 251, y: 172, color:        0, surface: 1, width: 7, height: 7},
                  { x: 286, y: 193, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 223, y: 228, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 293, y: 172, color:        0, surface: 1, width: 7, height: 7},
                  { x: 230, y: 312, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 349, y: 256, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 293, y: 165, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 300, y: 207, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 405, y: 235, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 307, y: 179, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 426, y: 130, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 265, y: 312, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 321, y:  67, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 356, y: 326, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 230, y: 116, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 370, y: 130, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 356, y: 312, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 286, y:  81, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 307, y:  81, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 244, y:  81, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 335, y: 235, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 384, y: 298, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 412, y: 158, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 279, y: 123, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 377, y: 172, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 356, y: 235, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 321, y:  25, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 342, y: 151, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 419, y: 186, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 188, y: 123, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 356, y: 137, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 286, y:  46, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 356, y: 130, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 258, y: 249, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 223, y: 116, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 321, y: 312, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 258, y: 256, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 321, y:  39, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 265, y: 165, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 258, y: 151, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 188, y: 242, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 349, y:  53, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 307, y: 165, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 384, y: 284, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 251, y: 326, color:        0, surface: 1, width: 7, height: 7},
                  { x: 272, y: 298, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 237, y: 165, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 209, y: 228, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 300, y: 172, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 230, y: 214, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 209, y:  88, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 419, y: 151, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 258, y: 305, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 293, y:  32, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 321, y: 347, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 265, y: 116, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 412, y: 214, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 167, y: 137, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 314, y: 200, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 300, y: 130, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 223, y: 130, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 342, y: 214, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 237, y: 270, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 370, y: 123, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 272, y: 354, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 356, y: 214, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 181, y: 263, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 272, y: 291, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 300, y: 221, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 363, y: 144, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 293, y: 305, color:        0, surface: 1, width: 7, height: 7},
                  { x: 265, y: 291, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 349, y: 228, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 293, y: 298, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 335, y:  67, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 293, y: 116, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 412, y: 116, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 209, y: 291, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 230, y: 137, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 300, y: 179, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 188, y: 165, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 384, y: 235, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 188, y: 137, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 202, y: 193, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 370, y: 235, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 328, y: 158, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 258, y: 109, color:        0, surface: 1, width: 7, height: 7},
                  { x: 237, y: 263, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 356, y: 221, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 335, y: 277, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 412, y: 151, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 447, y: 151, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 300, y: 256, color:        0, surface: 1, width: 7, height: 7},
                  { x: 293, y: 354, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 384, y: 277, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 279, y: 102, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 349, y: 305, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 307, y: 207, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 167, y: 165, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 265, y: 298, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 195, y: 165, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 377, y: 249, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 363, y: 284, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 412, y: 186, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 181, y: 151, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 321, y: 319, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 314, y: 137, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 356, y: 277, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 412, y: 172, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 328, y: 172, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 384, y: 291, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 398, y: 109, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 328, y:  32, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 328, y: 221, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 328, y: 312, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 216, y: 102, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 363, y: 151, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 370, y: 312, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 230, y: 249, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 342, y: 291, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 188, y: 270, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 188, y: 186, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 251, y: 284, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 405, y: 214, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 307, y: 137, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 258, y: 277, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 398, y: 165, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 237, y:  74, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 300, y: 235, color:        0, surface: 1, width: 7, height: 7},
                  { x: 202, y: 116, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 181, y: 172, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 384, y: 270, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 202, y: 228, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 300, y: 158, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 293, y:  88, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 202, y: 284, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 216, y: 193, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 251, y:  88, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 258, y: 116, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 363, y:  67, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 202, y: 256, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 209, y:  95, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 146, y: 158, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 454, y: 228, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 286, y:  67, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 412, y: 228, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 251, y: 291, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 349, y: 249, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 335, y: 249, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 265, y: 186, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 349, y: 200, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 405, y: 109, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 300, y:  88, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 230, y: 102, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 377, y: 144, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 293, y: 130, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 363, y: 235, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 419, y: 214, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 300, y: 228, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 307, y:  67, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 426, y: 144, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 412, y: 221, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 272, y: 270, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 314, y:  60, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 251, y: 333, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 279, y:  46, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 321, y: 207, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 258, y: 312, color:        0, surface: 1, width: 7, height: 7},
                  { x: 335, y: 193, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 370, y: 179, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 202, y: 200, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 433, y: 158, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 209, y: 158, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 272, y:  46, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 412, y: 165, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 342, y: 207, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 370, y: 151, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 265, y: 144, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 195, y: 207, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 363, y: 228, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 286, y: 116, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 426, y: 221, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 419, y: 158, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 419, y: 172, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 167, y: 179, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 265, y: 305, color:        0, surface: 1, width: 7, height: 7},
                  { x: 251, y: 102, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 314, y: 242, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 216, y: 116, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 202, y: 263, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 258, y: 326, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 216, y: 144, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 300, y: 284, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 251, y:  74, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 321, y: 158, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 216, y: 158, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 328, y:  60, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 293, y: 137, color:        0, surface: 1, width: 7, height: 7},
                  { x: 384, y:  88, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 258, y: 214, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 265, y: 347, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 251, y:  81, color:        0, surface: 1, width: 7, height: 7},
                  { x: 440, y: 186, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 321, y: 249, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 258, y: 144, color:        0, surface: 1, width: 7, height: 7},
                  { x: 251, y: 130, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 370, y: 193, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 244, y: 221, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 307, y: 228, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 342, y: 284, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 391, y: 284, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 307, y: 284, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 349, y: 137, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 223, y: 144, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 349, y: 235, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 405, y: 172, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 475, y: 179, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 202, y: 179, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 279, y:  25, color: 14078923, surface: 1, width: 7, height: 7},
                  { x: 391, y: 207, color: 16443474, surface: 1, width: 7, height: 7},
                  { x: 321, y: 235, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 244, y: 326, color:   197494, surface: 1, width: 7, height: 7},
                  { x: 237, y: 312, color: 12126216, surface: 1, width: 7, height: 7},
                  { x: 195, y: 123, color: 14078923, surface: 1, width: 7, height: 7}
                 ];
   this.init();
  }
 
   
  //****************************************************************************
  //                                                                           
  //****************************************************************************
 
  CSSAnimation.prototype = {
      
   //***************************************************************************
   //                                                                           
   //***************************************************************************
 
   init: function() {
    'use strict';
 
    var self;
 
    self = this;
 
    if (this.featureTesting()) {
     this.initStyleSheet();
     this.processIcon();
     this.startAnimation();
    } else {
     alert("some features not supported...");
    }
   },
 
 
   //***************************************************************************
   //                                                                           
   //***************************************************************************
 
   processIcon: function() {
    'use strict';
 
    var a, x, y, xMin, yMin, xMax, yMax, entries, obj, lookup, prop, 
        surface, factor, border, size, offsetX, offsetY;
 
    //**************************************************************************
    // 
    //**************************************************************************
 
    this.lookupIcons = {};
    this.lookupIcons.lookup = this.lookup;
    obj = this.lookupIcons;
    lookup = obj.lookup;
 
    //**************************************************************************
    // i
    //**************************************************************************
    
    entries = lookup.length;
    for (a = 0; a < entries; a += 1) {
 
     x = lookup[a].x;
     y = lookup[a].y;
 
     if (a === 0 || x < xMin ) { xMin = x;}
     if (a === 0 || y < yMin ) { yMin = y;}
     if (a === 0 || x > xMax ) { xMax = x;}
     if (a === 0 || y > yMax ) { yMax = y;}
   
     if (lookup[a].hasOwnProperty('width' ) && lookup[a].hasOwnProperty('height' )) {
 
      x += lookup[a].width ;
      y += lookup[a].height;
 
      if (x < xMin ) { xMin = x;}
      if (y < yMin ) { yMin = y;}
      if (x > xMax ) { xMax = x;}
      if (y > yMax ) { yMax = y;}
     }
    }
 
    factor = Math.min(
                      parseInt( (this.width  - (CSSAnimation.CONTENT_BORDER<<1)) / (xMax - xMin), 10),
                      parseInt( (this.height - (CSSAnimation.CONTENT_BORDER<<1)) / (yMax - yMin), 10)
                     );
 
    border  = 1; 
    size    = factor - border;
    offsetX = CSSAnimation.CONTENT_BORDER + parseInt(  ((this.width  - (CSSAnimation.CONTENT_BORDER<<1)) - ((xMax-xMin) * (size + border)) )/2.0, 10 );
    offsetY = CSSAnimation.CONTENT_BORDER + parseInt(  ((this.height - (CSSAnimation.CONTENT_BORDER<<1)) - ((yMax-yMin) * (size + border)) )/2.0, 10 );
 
    for (a = 0; a < entries; a += 1) {
     lookup[a].x      = offsetX + ( (lookup[a].x - xMin) * (size + border) );
     lookup[a].y      = offsetY + ( (lookup[a].y - yMin) * (size + border) );
     lookup[a].width  = ((lookup[a].hasOwnProperty('width' ) ? lookup[a].width  : 1) * (size + border)) - border; 
     lookup[a].height = ((lookup[a].hasOwnProperty('height') ? lookup[a].height : 1) * (size + border)) - border; 
   
     surface = lookup[a].width * lookup[a].height;
  
     if(a === 0 || surface < obj.minSurface) { obj.minSurface = surface; }
     if(a === 0 || surface > obj.maxSurface) { obj.maxSurface = surface; }
    }
   },
 
 
   //***************************************************************************
   //                                                                           
   //***************************************************************************
 
   featureTesting: function() {
    'use strict';
 
    var a, entries, flagFeatureTesting, elm, txt, prop, lookupPrefixes, self;
 
    flagFeatureTesting = false;
    self = this;
    lookupPrefixes = ['Webkit', 'ms', 'Moz', 'O', 'Khtml'];
    elm = document.createElement('div'); 
 
    //**************************************************************************
    //                                                              
    //**************************************************************************
 
    if( typeof elm.style.AnimationName !== 'undefined'  ) { 
     flagFeatureTesting  = true;
    } else {
     entries = lookupPrefixes.length;
     for( a = 0; a < entries; a += 1 ) {
      txt = lookupPrefixes[a] + 'AnimationName';
      if( typeof (elm.style[ txt ]) !== 'undefined' ) {
       flagFeatureTesting  = true;
       this.cssPrefix = lookupPrefixes[a];
       break;
     }}
    }
  
    //**************************************************************************
    // check featuredetection                                                                          
    //**************************************************************************
 
    if (flagFeatureTesting) {
 
     if (this.cssPrefix !== '') {
      for (prop in this.cssProperties) {
       if (this.cssProperties.hasOwnProperty(prop)) {
        txt = this.cssPrefix + prop.substr(0, 1).toUpperCase() + prop.substr(1, prop.length - 1);
        this.cssProperties [ prop ] = txt;
        if( typeof (elm.style[ txt ]) === 'undefined' ) {
         // alert('property not supported... ' + txt );
         flagFeatureTesting = false;
         break;
        }
     }}}
    }
 
    return flagFeatureTesting;
   },
 
 
   //***************************************************************************
   //                                                                           
   //***************************************************************************
 
   startAnimation: function() {
    'use strict';
 
    var a, x, y, self, lambda, minSurface, surfaceFactor, width, height, colorValue, 
        entries, index, div, obj, style, divWrapper, properties, lookupContent,
        animName, duration, timeout, fragment,
        animDuration, animIterationCount, animTimingFunction, animDelay,
        animFillMode;
 
    self = this;
 
    //**************************************************************************
    //                                                                     
    //**************************************************************************
 
    if (this.idTimeout) {
     clearTimeout(this.idTimeout);
    }
 
    //**************************************************************************
    //                                                                     
    //**************************************************************************
 
    properties = this.cssProperties;
 
    animName           = properties.animationName;
    animDuration       = properties.animationDuration;
    animIterationCount = properties.animationIterationCount;
    animTimingFunction = properties.animationTimingFunction;
    animDelay          = properties.animationDelay;
    animFillMode       = properties.animationFillMode;
 
    //**************************************************************************
    //                                                                     
    //**************************************************************************
 
    style = this.containerAnim.style;
 
    style.top = "100%";
 
    style[animName]           = 'animateContainerBottom';
    style[animDuration]       = 400 + 'ms';
    style[animIterationCount] = '1';
    style[animTimingFunction] = 'cubic-bezier(0,.62,.34,1);';
    style[animDelay ]         = '50ms';
    style[animFillMode]       = 'forwards';
 
    //**************************************************************************
    //                                                                     
    //**************************************************************************
 
    self = this;
    lookupContent = this.lookupIcons.lookup;
    entries = lookupContent.length;
    fragment = document.createDocumentFragment();
    minSurface = this.lookupIcons.minSurface;
    surfaceFactor = 1.0 / ( this.lookupIcons.maxSurface - minSurface);
    timeout = 0;
 
    for (a = 0; a < entries; a += 1) {
 
     obj         = lookupContent[a];
     x           = obj.x;
     y           = obj.y;
     width       = obj.width;
     height      = obj.height;
     colorValue  = obj.color;
 
     //*************************************************************************
     //                                                                   
     //*************************************************************************
 
     divWrapper =  document.createElement('div');
 
     style          = divWrapper.style;
     style.position = 'absolute';
     style.display  = 'block';
     style.width    = width + 'px';
     style.height   = height + 'px';
     style.left     = x + 'px';
     style.top      = y + 'px';
 
     //*************************************************************************
     //                                                                   
     //*************************************************************************
 
     div = document.createElement('div');
 
     style = div.style;
     style.position = 'relative';
     style.display  = 'block'; 
 
     index                 = parseInt( Math.random() * 3.99, 10);
     style[animName]       = index===0 ? 'animatedown' : index===1 ? 'animateup' : index===2 ? 'animateleft' : 'animateright';
     style.backgroundColor = 'rgb(' + ((colorValue>>16)&255) + ',' + ((colorValue>>8)&255) + ',' + (colorValue&255) + ')';
     lambda                = ((width * height) - minSurface ) * surfaceFactor;
     duration              = parseInt(  250 + (lambda * 250) , 10);
 
     style[animDuration]       = duration + 'ms';
     style[animIterationCount] = '1';
     style[animTimingFunction] = 'cubic-bezier(0,.62,.34,1);';
     style[animDelay ]         = parseInt( timeout , 10) + 'ms';
     style[animFillMode]       = 'forwards';
 
     timeout += 10 + parseInt( duration * 0.05, 10);
 
     divWrapper.appendChild(div);
     fragment.appendChild(divWrapper);
    }
 
    this.containerAnim.appendChild(fragment);
 
    //**************************************************************************
    //                                                                     
    //**************************************************************************
 
    this.idTimeout = setTimeout( function() {
     var style;
 
     style = self.containerAnim.style;
 
     style[animName]           = 'animateContainerTop';
     style[animDuration]       = 400 + 'ms';
     style[animIterationCount] = '1';
     style[animTimingFunction] = 'cubic-bezier(0,.62,.34,1);';
     style[animDelay ]         =  '0ms';
     style[animFillMode]       = 'forwards';
  
     self.idTimeout = setTimeout( function() {
 
      utilities.removeChildrenContainer(self.containerAnim);
 
     self.startAnimation(); }, 400); 
    }, timeout + 1200); 
   },
 
 
   //***************************************************************************
   //                                                                           
   //***************************************************************************
 
   initStyleSheet: function() {
    'use strict';
 
    var a, entries, styleSheet, txt, rules, prefix;
 
    prefix = this.cssPrefix;
 
    rules = [
             '@-' + prefix.toLowerCase() + '-keyframes animatedown { 0% { width: 100%; top: 0%; height: 0%} 100% { width: 100%; top: 0%; height: 100%} }',
             '@-' + prefix.toLowerCase() + '-keyframes animateup { 0% { width: 100%; top: 100%; height: 0%} 100% { width: 100%; top: 0%; height: 100%} }', 
             '@-' + prefix.toLowerCase() + '-keyframes animateright { 0% { left: 100%; width: 0%; height:100%} 100% { left: 0%; width: 100%; height:100%} }', 
             '@-' + prefix.toLowerCase() + '-keyframes animateleft { 0% { left: 0%; width: 0%; height:100%} 100% { left: 0%; width: 100%; height:100%} }',
             '@-' + prefix.toLowerCase() + '-keyframes animateremove { 0% { top: 0%; height: 100%} 100% { top: 0%; height: 0%} }',
             '@-' + prefix.toLowerCase() + '-keyframes animateContainerBottom { 0% { top: ' + this.height + 'px } 100% { top: 0px } }',
             '@-' + prefix.toLowerCase() + '-keyframes animateContainerTop { 0% { top: 0px } 100% { top: ' + -this.height + 'px; } }'
            ];
 
    if ( document.styleSheets && document.styleSheets.length ) {
     entries = rules.length;
 
     for (a = 0; a < entries; a += 1) {
      document.styleSheets[0].insertRule( rules[a], 0 );
     }
    } else {
 
     styleSheet = document.createElement( 'style' );
     styleSheet.setAttribute('type', 'text/css');
 
     txt = '';
 
     entries = rules.length;
 
     for (a = 0; a < entries; a += 1) {
      txt += rules[a] + '\n';
     }
 
     styleSheet.innerHTML = txt;
 
     document.getElementsByTagName('head')[0].appendChild(styleSheet);
    }
   }
 
 
  };
  
 
 
 
   initCSSAnimation = function(containerID) { 
    var cssAnimation = new CSSAnimation(containerID);
   };
    
   return {
           initCSSAnimation : initCSSAnimation
          };
 
 
 


})(this, document);

