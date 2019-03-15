$(document).ready(function($) {

    let canvas = new fabric.Canvas('c', {
        backgroundColor: ''
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


    let colorValue = document.getElementById('text-color').value;

    // --------------------------------MAIN OBJECTS--------------------------------

    //-----add new square button-----

    $( ".add-square" ).click(function() {
        let rect = new fabric.Rect({ 
            left: 100, 
            top: 150, 
            fill: 'red', 
            width: 200,
            height: 200
        });

        canvas.add(rect);
    });

    //-----add new circle button-----

    $( ".add-circle" ).click(function() {
        let rect = new fabric.Circle({ 
            left: 100, 
            top: 150, 
            fill: 'green', 
            radius: 30
        });

        canvas.add(rect);
    });

    //-----add new triangle button-----

    $( ".add-triangle" ).click(function() {
        let rect = new fabric.Triangle({ 
            left: 200, 
            top: 100, 
            fill: 'pink', 
            width: 30,
            height: 20
        });

        canvas.add(rect);
    });

    //-----add new line button-----

    $( ".add-line" ).click(function() {
        let rect = new fabric.Line([100, 100, 300, 100], { 
            stroke: 'red',
            strokeWidth: 1,
        });

        canvas.add(rect);
    });


    let colorInput = document.getElementById('object-color');

    colorInput.addEventListener( 'change', function() {
        let obj = canvas.getActiveObject();
        $(obj).prop('fill', this.value);
        canvas.renderAll();  
    });
   
    // -----changing color of a selected object-----
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


    // let colorValue = document.getElementById('text-color').value;


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

    // $( ".add-itext" ).click(function() {
    //     let txtArea= new fabric.IText('your text here', {
    //         left: 100, 
    //         top: 100,
    //         fill: '#123456',
    //         fontWeight: 'normal'
    //     });

    //     canvas.add(txtArea);
   

    // });

   
   

    // document.getElementById('text-color').onchange=function(){
        
    //   alert(this.value);
    // }

    //-----text manipulation-----

    //----changing style of whole text area----

    $( '.bold' ).click(function() {
        let obj = canvas.getActiveObject();
        $(obj).prop('fontWeight', 'bold');       
        canvas.renderAll();
    });

    //----changing style of selected text----
  
    $( '.bold2' ).click(function() {
        canvas.getActiveObject().setSelectionStyles({fontWeight: 'bold'});
        canvas.renderAll();

    });

    $( '.text-color' ).click(function() {
        $( '#text-color' ).change(function() {
            let obj = canvas.getActiveObject();
            $(obj).prop('fill', this.value);       
            canvas.renderAll();
        });

    });

    // colorInput.addEventListener( 'change', function() {
    //     let obj = canvas.getActiveObject();
    //     $(obj).prop('fill', this.value);
    //     canvas.renderAll();  
    // });

    // function addHandler(id, fn, eventName) {
    //     document.getElementById(id)[eventName || 'onclick'] = function() {
    //       var el = this;
    //       if (obj = canvas.getActiveObject()) {
    //         fn.call(el, obj);
    //         canvas.renderAll();
    //       }
    //     };
    //   }
    


    // --------------------------------IMAGE--------------------------------
    
    //----select image----

    

    $('.add-image-container').html('<input type="file" accept=".png,.jpeg,.jpg,.gif" name="file" id="file" class="inputfile" data-multiple-caption="{count} files selected" multiple /><label for="file">Choose a file</label><span></span><br><img src="" alt="Image preview..." class="preview"><br>');
    $('.add-image').css('display', 'block');

    let input = document.querySelector('input[type="file"]');

    let inputs = document.querySelectorAll( '.inputfile' );

    Array.prototype.forEach.call( inputs, function( input ) {
        let label	 = input.nextElementSibling,
        labelVal = label.innerHTML,
        labelDescription = label.nextElementSibling;

        input.addEventListener( 'change', function( e ) {
            let fileName = '';
            if( this.files && this.files.length > 1 ){
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            }
                
            else {
                fileName = e.target.value.split( '\\' ).pop();
            }
                

            if( fileName ) {
                labelDescription.innerHTML = fileName;
            }
                
            else {
                label.innerHTML = labelVal;
            }
                
        });
    });

    input.addEventListener('change', function(event){

        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        var fileName = document.querySelector('.add-image-container span');

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }

        $( ".add-image" ).click(function() {         
            let oImg= new fabric.Image.fromURL(preview.src, function(oImg) {
                canvas.add(oImg);
            });
    
            preview.src ="";   
            input.value="";
            fileName.innerHTML="";
    
        });   
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

    
    
});


