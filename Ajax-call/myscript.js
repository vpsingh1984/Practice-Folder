

// $("button").click(function(){

// 	$.ajax({
// 		url: "http://norvig.com/big.txt",
// 		success: function(result){
// 			var res = result;
// 			$("#one").html(res.base);
// 		}
// 	});

// });


$('button').click(function(event) {
   event.preventDefault();
 
   $.ajax({
   		url: 'http://norvig.com/big.txt',
		success: function(data) {
			$('#demo').html(data);
		},
		error: function() {
		 	$('#demo').text('An error occurred');
		}
   });
});