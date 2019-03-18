$(document).ready(function($) {

    let canvas = new fabric.Canvas('c', {
        backgroundColor: '',
        backgroundImage: ''
    });

    // -----cards manipulation-----
    $( "a.open" ).click( function() {
        let buttons = $('.buttons-container')
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

    // -----changing color of a selected object-----

    let colorInput = document.getElementById('object-color');

    colorInput.addEventListener( 'change', function() {
        let obj = canvas.getActiveObject();
        $(obj).prop('fill', this.value);
        $(obj).prop('stroke', this.value);
        obj.dirty = true;    
        canvas.requestRenderAll(); 
    });
   
    // document.getElementById('object-color').onchange = function(){

    //     let obj = canvas.getActiveObject();
    //     $(obj).prop('fill', this.value);       
    //     canvas.renderAll();
    // }


    // -----changing canvas background color-----

    document.getElementById('canvas-background').onchange = function(){
        $(canvas).prop('backgroundColor', this.value);
        canvas.renderAll();
    }

    //     $( "#canvas-background-image" ).click(function() {
    //         // let newImage = url('/contact-background.jpg');
    //         let imageUrl = "./contact-background.jpg";
    //         canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
    //             // Optionally add an opacity lvl to the image
    //             backgroundImageOpacity: 0.5,
    //             // should the image be resized to fit the container?
    //             // backgroundImageStretch: true
    //             scaleX: canvas.width / img.width,
    //             scaleY: canvas.height / img.height
    //         });
    // });

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
            fontWeight: 'normal'
        });

        canvas.add(txtArea);
   

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
                changeStyle(obj, 'fontStyle', '');
                canvas.renderAll();
            }
         }
    });

    $( '.italic' ).click(function() {
        let obj = canvas.getActiveObject();
        if (obj) {
            changeStyle(obj, 'fontStyle', 'italic');
            canvas.renderAll();
        }
    });

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
        if (obj) {
            changeStyle(obj, 'fill', this.value);
            canvas.renderAll();
        }
           
        obj.dirty = true;    
        canvas.requestRenderAll();
    });


      


    // --------------------------------IMAGE--------------------------------
    
    //----select image----

    

    // $('.add-image-container').html('<input type="file" accept=".png,.jpeg,.jpg,.gif" name="file" id="file" class="inputfile" data-multiple-caption="{count} files selected" multiple /><label for="file">Choose a file</label><span></span><br><img src="" alt="Image preview..." class="preview"><br>');
    // $('.add-image').css('display', 'block');

    // let input = document.querySelector('input[type="file"]');

    // let inputs = document.querySelectorAll( '.inputfile' );

    // Array.prototype.forEach.call( inputs, function( input ) {
    //     let label	 = input.nextElementSibling,
    //     labelVal = label.innerHTML,
    //     labelDescription = label.nextElementSibling;

    //     input.addEventListener( 'change', function( e ) {
    //         let fileName = '';
    //         if( this.files && this.files.length > 1 ){
    //             fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    //         }
                
    //         else {
    //             fileName = e.target.value.split( '\\' ).pop();
    //         }
                

    //         if( fileName ) {
    //             labelDescription.innerHTML = fileName;
    //         }
                
    //         else {
    //             label.innerHTML = labelVal;
    //         }
                
    //     });
    // });

    // input.addEventListener('change', function(event){

    //     var preview = document.querySelector('img');
    //     var file = document.querySelector('input[type=file]').files[0];
    //     var reader = new FileReader();
    //     var fileName = document.querySelector('.add-image-container span');

    //     reader.addEventListener("load", function () {
    //         preview.src = reader.result;
    //     }, false);

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }

    //     $( ".add-image" ).click(function() {         
    //         let oImg= new fabric.Image.fromURL(preview.src, function(oImg) {
    //             canvas.add(oImg);
    //         });
    
    //         preview.src ="";   
    //         input.value="";
    //         fileName.innerHTML="";
    
    //     });   
    // });   
    
    document.getElementById('file').addEventListener("change", function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(f) {
           var data = f.target.result;
           fabric.Image.fromURL(data, function(img) {
              var oImg = img.set({
                 left: 0,
                 top: 0,
                 angle: 0,
                 
              }).scale(.7);
              canvas.add(oImg).renderAll();
              //var a = canvas.setActiveObject(oImg);
              var dataURL = canvas.toDataURL({
                 format: 'png',
                 quality: 1
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


