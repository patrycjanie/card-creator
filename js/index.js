$(document).ready(function($) {

    let canvas = new fabric.Canvas('c', {
        backgroundColor: '#fff',
        backgroundImage: ''
    });


    // --------------------------------CUSTOM RECTANGULAR--------------------------------
    let rectC4 = new fabric.Rect({ 
        left: 450, 
        top: -150,
        angle: 45, 
        fill: '#1E88E5', 
        width: 50,
        height: 600,
        hasControls: false,
        lockMovementX: true, 
        lockMovementY: true
    });

    canvas.add(rectC4);

    let rectC1 = new fabric.Rect({ 
        left: -100, 
        top: 0,
        angle: 45, 
        fill: '#E3F2FD', 
        width: 500,
        height: 500,
        hasControls: false,
        lockMovementX: true, 
        lockMovementY: true
    });

    canvas.add(rectC1);

    let rectC2 = new fabric.Rect({ 
        left: 100, 
        top: 180,
        angle: 225, 
        fill: '#1565C0', 
        width: 500,
        height: 500,
        hasControls: false,
        lockMovementX: true, 
        lockMovementY: true
    });

    canvas.add(rectC2);

    // --------------------------------CUSTOM TEXT--------------------------------
    
        let name= new fabric.IText('Jan Kowlaski\nul. Krakowska 123\n123-34 Warszawa', {
            left: 350, 
            top: 150,
            editable: false,
            fontSize: 18,
            lineHeight: 1.3,
            fontFamily: 'Arial',
            hasControls: false,
            lockMovementX: true, 
            lockMovementY: true,
            evented: false
        });

        canvas.add(name);

        let brand= new fabric.IText('BRAND NAME', {
            left: 350, 
            top: 100,
            editable: false,
            fontSize: 24,
            fontWeight: 'bold',
            fill: '#90CAF9',
            fontFamily: 'Arial',
            hasControls: false,
            lockMovementX: true, 
            lockMovementY: true,
            evented: false
        });

        canvas.add(brand);

    // -----cards manipulation-----
    $( "a.open" ).click( function() {
        let buttons = $('#container-buttons')
        buttons.find('li').removeClass('clicked');
        $(this).parent().addClass('clicked');

        let elem = $('.right-container')
        elem.find('div.content-container').removeClass('active'); 
        elem.find('div.content-container.' + $(this).attr('id')).addClass('active');    
    });

    // --------------------------------MAIN OBJECTS--------------------------------

    //-----add new square button-----

    $( ".add-square" ).click(function() {
        let objectColor =  document.getElementById('object-color').value;
        let rect = new fabric.Rect({ 
            left: 300, 
            top: 150, 
            fill: objectColor, 
            width: 70,
            height: 70
        });

        canvas.add(rect);
    });

    //-----add new circle button-----

    $( ".add-circle" ).click(function() {
        let objectColor =  document.getElementById('object-color').value;
        let rect = new fabric.Circle({ 
            left: 100, 
            top: 150, 
            fill: objectColor, 
            radius: 30
        });

        canvas.add(rect);
    });

    //-----add new triangle button-----

    $( ".add-triangle" ).click(function() {
        let objectColor =  document.getElementById('object-color').value;
        let rect = new fabric.Triangle({ 
            left: 200, 
            top: 100, 
            fill: objectColor, 
            width: 30,
            height: 20
        });

        canvas.add(rect);
    });

    //-----add new line button-----

    $( ".add-line" ).click(function() {
        let objectColor =  document.getElementById('object-color').value;
        let rect = new fabric.Line([100, 100, 300, 100], { 
            stroke: objectColor,
            strokeWidth: 1,
        });

        canvas.add(rect);
    });

    //-----bring to front-----

    $( ".bring-front" ).click(function() {
        let obj = canvas.getActiveObject();
        canvas.bringToFront(obj)

        canvas.add(rect);
    });

    //-----bring forward-----

    $( ".bring-forward" ).click(function() {
        let obj = canvas.getActiveObject();
        canvas.bringForward(obj)

        canvas.add(rect);
    });

    //-----send backwards-----

    $( ".send-backwards" ).click(function() {
        let obj = canvas.getActiveObject();
        canvas.sendBackwards(obj)

        canvas.add(rect);
    });

    //-----send to back-----

    $( ".send-back" ).click(function() {
        let obj = canvas.getActiveObject();
        canvas.sendToBack(obj)

        canvas.add(rect);
    });

    // -----changing color of a selected object-----

    let colorInput = document.getElementById('object-color');

    colorInput.addEventListener( 'change', function() {
        let obj = canvas.getActiveObject();
        $(obj).prop('fill', this.value);
        $(obj).prop('stroke', this.value);
        obj.dirty = true;    
        canvas.requestRenderAll(); 
    });

    // -----changing canvas background color-----

    document.getElementById('canvas-background').onchange = function(){
        $(canvas).prop('backgroundColor', this.value);
        canvas.renderAll();
    }

    document.getElementById('file2').addEventListener("change", function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(f) {
           var data = f.target.result;
           fabric.Image.fromURL(data, function(img) {
              // add background image
              canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                 scaleX: canvas.width / img.width,
                 scaleY: canvas.height / img.height
              });
           });
        };
        reader.readAsDataURL(file);
     });

     $( ".remove" ).click(function() {
        $(canvas).prop('backgroundImage', "");
        canvas.renderAll();
    });

    // --------------------------------TEXT--------------------------------

    //-----add new IText button-----

    $( ".add-itext" ).click(function() {
        let message = document.getElementById('new-text').value; 
        let color =  document.getElementById('text-color').value; 
        let txtArea= new fabric.IText(message, {
            left: 100, 
            top: 100,
            fill: color,
            fontWeight: 'normal',
            fontFamily: '',
            underline: false
        });

        canvas.add(txtArea);
    });

    let fontInput = $('#text-font');
    $(document.body).on('change', '#text-font', function () {
        let obj = canvas.getActiveObject();
        obj.fontFamily = fontInput.val();
        obj.dirty = true;    
        canvas.requestRenderAll(); 
    });

    //-----text manipulation-----

    //----changing style----
    
    function changeStyle(object, styleName, newStyle) {
        
        if(object.isEditing) {

            var style = { };
            style[styleName] = newStyle;
            object.setSelectionStyles(style);
        }
        
        else {
            $(object).prop(styleName, newStyle);  
        }
    }

    function addStyle(object, styleName, state) {
        
        if(object.isEditing) {

            var style = { };
            style[styleName] = state;
            object.setSelectionStyles(style);
        }
        
        else {
            $(object).prop(styleName, state); 
        }
    }

    $( '#bold' ).change(function() {
        let obj = canvas.getActiveObject();
        if ($(this).is(':checked')) {
            
            if (obj) {
                changeStyle(obj, 'fontWeight', 'bold');
                canvas.renderAll();
            }
         } else {
            if (obj) {
                changeStyle(obj, 'fontWeight', '');
                canvas.renderAll();
            }
         }
    });

    $( '#italic' ).change(function() {
        let obj = canvas.getActiveObject();
        if ($(this).is(':checked')) {
            if (obj) {
                changeStyle(obj, 'fontStyle', 'italic');
                canvas.renderAll();
            }
         } else {
            
            if (obj) {
                changeStyle(obj, 'fontStyle', 'normal');
                canvas.renderAll();
            }
         }
    }); 

    $( '#underline' ).change(function() {
        let obj = canvas.getActiveObject();
        if ($(this).is(':checked')) {
            if (obj) {
                addStyle(obj, 'underline', true);
                obj.dirty = true;    
                canvas.requestRenderAll();
            }
         } else {
            
            if (obj) {
                addStyle(obj, 'underline', false);
                obj.dirty = true;    
                canvas.requestRenderAll();
            }
         }
    }); 

    $( '#overline' ).change(function() {
        let obj = canvas.getActiveObject();
        if ($(this).is(':checked')) {
            if (obj) {
                addStyle(obj, 'overline', true);
                obj.dirty = true;    
                canvas.requestRenderAll();
            }
         } else {
            
            if (obj) {
                addStyle(obj, 'overline', false);
                obj.dirty = true;    
                canvas.requestRenderAll();
            }
         }
    }); 
    $( '#linethrough' ).change(function() {
        let obj = canvas.getActiveObject();
        if ($(this).is(':checked')) {
            if (obj) {
                addStyle(obj, 'linethrough', true);
                obj.dirty = true;    
                canvas.requestRenderAll();
            }
         } else {
            
            if (obj) {
                addStyle(obj, 'linethrough', false);
                obj.dirty = true;    
                canvas.requestRenderAll();
            }
         }
    }); 


    // for buttons instead of checkbox
    // $( '.bold' ).click(function() {
    //     let obj = canvas.getActiveObject();
    //     if(obj.isEditing) {
    //         obj.setSelectionStyles({fontWeight: 'bold'});
    //     }
        
    //     else {
    //         $(obj).prop('fontWeight', 'bold');  
    //     }
             
    //     canvas.renderAll();
    // });

    //----changing text color---- 

    $( '#text-color' ).change(function() {

        let obj = canvas.getActiveObject();
        if (this)
        if (obj) {
            changeStyle(obj, 'fill', this.value);
            canvas.renderAll();
        }
           
        obj.dirty = true;    
        canvas.requestRenderAll();
    });


      


    // --------------------------------IMAGE--------------------------------
    
    //----select image----
    
    document.getElementById('file').addEventListener("change", function(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function(f) {
            let data = f.target.result;
            $('span.link').html(file.name);


    //----add image----

            $( ".add-image" ).click(function() {
                fabric.Image.fromURL(data, function(img) {
                    let oImg = img.set({
                        left: 200,
                        top: 200,
                        angle: 0,
                        
                    }).scale(.7);
                    canvas.add(oImg).renderAll();

                    $('span.link').html("");
                    data = '';
                });
            });
        };     
        reader.readAsDataURL(file);
    });
   

   

    

    // --------------------------------DELETE--------------------------------

    function deleting() {
        canvas.remove(canvas.getActiveObject());
    }

    // ----with button-----

    $( ".delete" ).click(deleting);

    // ----with delete key-----

    $( "html" ).keydown(function(e) {
        if(e.keyCode  == 46) {
            deleting() 
        }
    });

    // --------------------------------SAVE AS IMAGE--------------------------------

    $(".save").click(function() {
        $("#c").get(0).toBlob(function(blob) {
            saveAs(blob, "myCard.jpg")
        });
    });
    
});


