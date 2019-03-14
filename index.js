$(document).ready(function($) {

    let canvas = new fabric.Canvas('c', {
        backgroundColor: ''
    });


    // -----changing canvas background color-----
    document.getElementById('canvas-background').onchange = function(){
        $(canvas).prop('backgroundColor', this.value);
        canvas.renderAll();
    }


    // -----cards manipulation-----
    $( "a.open" ).click( function() {
        let elem = $('.right-container')
        elem.find('div.content-container').removeClass('active'); 
        elem.find('div.content-container.' + $(this).attr('id')).addClass('active');    
    });



    
 

    let colorValue = document.getElementById('text-color').value;

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

    //-----add new IText button-----

    $( ".add-text" ).click(function() {
        let txtArea= new fabric.IText('your text here', {
            left: 100, 
            top: 100,
            fill: '#123456',
            fontWeight: 'normal'
        });

        canvas.add(txtArea);
   

    });

   
   

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

    $( '.bold2' ).click(function() {
        canvas.getActiveObject().setSelectionStyles({fontWeight: 'bold'});
        canvas.renderAll();

    });

    // function addHandler(id, fn, eventName) {
    //     document.getElementById(id)[eventName || 'onclick'] = function() {
    //       var el = this;
    //       if (obj = canvas.getActiveObject()) {
    //         fn.call(el, obj);
    //         canvas.renderAll();
    //       }
    //     };
    //   }
    

    //-----add new image-----
    
    //----select image----

    

        $('.add-image-container').html('<input type="file" accept=".png,.jpeg,.jpg,.gif" name="file" id="file" class="inputfile" data-multiple-caption="{count} files selected" multiple /><label for="file">Choose a file</label><span></span><br><img src="" alt="Image preview..." class="preview"><br><button class="clearField">Clear field</button>');
        $('.add-image').css('display', 'block');

        var input = document.querySelector('input[type="file"]');

        var inputs = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
        labelVal = label.innerHTML,
        labelDescription = label.nextElementSibling;

	input.addEventListener( 'change', function( e )
	{
		var fileName = '';
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
                // preview.css('display', 'block');
                preview.src = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }

            $( ".clearField" ).click(function() {
                preview.src ="";   
                input.value="";
                fileName.innerHTML="";
            });
        });       
   

    //-----add selected image-----

    $( ".add-image" ).click(function() {

        var preview = document.querySelector('img');

        let oImg= new fabric.Image.fromURL(preview.src, function(oImg) {
            canvas.add(oImg);
        });

    });


    

    //-----delete selected item-----

    // ----with button-----

    $( ".delete" ).click(function() {
        canvas.remove(canvas.getActiveObject());
    });

    // ----with delete key-----

    $( "html" ).keydown(function(e) {
        if(e.keyCode  == 46) {
            canvas.remove(canvas.getActiveObject());
        }
    });
    
});


