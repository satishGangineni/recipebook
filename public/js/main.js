$(document).ready(()=>{
    
    // $('.delete-recipe33').on('click',(btn)=>{
    //     console.log(btn);
    //     var btn = $('.delete-recipe');
    //     alert('btn '+ btn.data('rid'));
    //     const id = $(this).data('rid');
    //     console.log($(this).data)
    //     alert(id);
     
    // });
});


var removeRecipe = function (id){
    //alert(id);

    const url = '/delete/' + id;
    
            if(confirm('Delete Recipe?')){
                $.ajax({
                        url:url,
                        type:'DELETE',
                        success: (result)=>{
                           //alert('success');
                            window.location.href = '/';
                        },
                        error: (err)=>{
                            console.log(err);
                        }
                })
            }

}

//edit Recipe
var editRecipe = function (id,name,ingrs,directions){
    //alert(id);
    //alert(id);
    //alert(name);
    //alert(ingrs);
    //alert(directions);
    //const url = '/edit/' + id;
    $('#id-form-name').val(name);
    $('#id-form-ingredients').val(ingrs);
    $('#id-form-directions').val(directions);
    $('#id-form-id').val(id);
        
}