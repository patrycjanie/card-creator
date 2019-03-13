$(document).ready(function($) {

    let canvas = new fabric.Canvas('c');

    //add new square button

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

    //add new IText button

    $( ".add-text" ).click(function() {
        let txtArea= new fabric.IText('your text here', {
            left: 100, 
            top: 100,
            fill: '#ab53fc',
            fontWeight: 'normal'
        });

        canvas.add(txtArea);

      

    });

   

    document.getElementById('text-color').onchange=function(){
        
      alert(this.value);
    }

    //text manipulation

    $( ".bold" ).click(function() {
        let man = canvas.getActiveObject();
        let manText = man.getSelectedText();
        let manSel = man.getSelectionStyles();
        // $(man).prop("fontWeight", "bold");
        // console.log(man.fontWeight);
        console.log(manSel.fontWeight);
        canvas.renderAll();
    });

    function addHandler(id, fn, eventName) {
        document.getElementById(id)[eventName || 'onclick'] = function() {
          var el = this;
          if (obj = canvas.getActiveObject()) {
            fn.call(el, obj);
            canvas.renderAll();
          }
        };
      }
    

    //add new image 
    
    //image preview

    $( ".image" ).click(function() {

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
    });

    //add image

    $( ".add-image" ).click(function() {

        var preview = document.querySelector('img');

        let oImg= new fabric.Image.fromURL(preview.src, function(oImg) {
        canvas.add(oImg);
        });

    });


    

    //delete selected item

    $( ".delete" ).click(function() {
        canvas.remove(canvas.getActiveObject());
    });
});


