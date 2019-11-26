/*
$(function(){
	var $movies = $(".container  #moviesSelected");
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?apikey=thewdb&s=guardians+of+the+galaxy',
		success:function(films) {
			films.Search.forEach(function(film, i)  {
	
				$movies.append("<div class='bg-faded p-4 my-4'><div class='row'><div class='col-lg-6'>" + (films.Search[i].Poster.indexOf("N/A") == 0 ?"<p>Image is not available</p>" :"<img class='img-fluid mb-4 mb-lg-0' src='" +   films.Search[i].Poster   + "' alt=''>" ) + "</div><div class='col-lg-6'><p id='title'>Title: " + films.Search[i].Title 
								+"</p><p id='year'>Year: "+ films.Search[i].Year
								+"</p><p id='imdbID'>imdbID: " + films.Search[i].imdbID
								+"</p><p id='Type'>Type: " + films.Search[i].Type +
								"</p></div></div></div")
					
				

			
			});		
		},
		error:function() {
			alert('error loading orders');
		}

	});
	

});*/

var $movies = $("#moviesSelected");
var $pagination  = $(".pagination") ;

function downloadData(inputValue, page) {
	var pageParam = "";
	console.log(inputValue, page);
	if (typeof page == 'number') {
		pageParam = "&page=" + page;
	} else {
		
		page = 1;
	}
	$.ajax({
		type:'GET',
		url:'http://www.omdbapi.com/?apikey=thewdb&s=' + inputValue + pageParam,
		success: function(result) {
			displayData(result);
			var counterPage = Math.ceil((result.totalResults/10));	
			displayPagination(inputValue, page, counterPage);
		}

	});
}

function displayPagination(inputValue, page, counterPages) {
	var $searchPagination = $("#searchPagination");
	$searchPagination.empty();	
	if (page < 6 ) {

		$searchPagination.append("<li class='page-item' ><a class='page-link' href='#' data-s='" + inputValue + "' data-page='" + (page==1 ? "" : (page -1))  + "'>Previous</a></li>");

		for (var i = 1; i <= 7; i++ ) {
			$searchPagination.append(displayLine(inputValue, i, page == i));	
		}

	   	$searchPagination.append("<li class='page-item'><a class='page-link'>...</a></li>");
		$searchPagination.append(displayLine(inputValue, counterPages, false));
		$searchPagination.append("<li class='page-item' ><a class='page-link' href='#' data-s='" + inputValue + "' data-page ='" + (page + 1)+ "'>Next</a></li>");
	
	} else if (page >= counterPages - 5) {

		$searchPagination.append("<li class='page-item' ><a class='page-link' href='#' data-s='"+ inputValue + "' data-page ='" + (page - 1) + "'>Previous</a></li>");
		$searchPagination.append(displayLine(inputValue, 1, false));
		$searchPagination.append("<li class='page-item'><a class='page-link'>...</a></li>");

		for (var i = counterPages - 5 ; i <= counterPages; i++) {
			$searchPagination.append (displayLine(inputValue, i, page == i));	
		}
		
		$searchPagination.append("<li class='page-item' ><a class='page-link' href='#' data-page='" + (page == counterPages ? "" : (page + 1))+ "'>Next</a></li>");
	} else {
		$searchPagination.append("<li class='page-item' ><a class='page-link' href='#' data-s='"+ inputValue + "' data-page ='" + (page - 1) + "'>Previous</a></li>");
		$searchPagination.append(displayLine(inputValue, 1, false));
		$searchPagination.append("<li class='page-item'><a class='page-link'>...</a></li>");
		for (var i = page - 2 ; i <= page + 2 ; i++) {
			$searchPagination.append (displayLine(inputValue, i, page == i));	
		}
		$searchPagination.append("<li class='page-item'><a class='page-link'>...</a></li>");
		$searchPagination.append(displayLine(inputValue, counterPages, false));
		$searchPagination.append("<li class='page-item' ><a class='page-link' href='#' data-s='"+ inputValue + "' data-page ='" + (page + 1)+ "'>Next</a></li>");

	}
}

function displayLine(inputValue, index, isActive, label) {
	return "<li class='page-item" + (isActive ? " active" : '') + "'><a class='page-link' href='#' data-s='"+ inputValue + "' data-page='" + index + "' >" + (label ? label : index )+ "</a></li>";

}
function displayData(downloadedData) {
		$movies.empty();
		downloadedData.Search.forEach(function(film)  {

			$movies.append("<div class='bg-faded p-4 my-4'><div class='row'><div class='col-lg-6'>" 
						+ (film.Poster.indexOf("N/A") == 0 ?"<img src='https://upmaa-pennmuseum.netdna-ssl.com/collections/images/image_not_available_300.jpg'>" :"<img class='img-fluid mb-4 mb-lg-0' src='" +   film.Poster   + "' alt=''>" ) 
						+ "</div><div class='col-lg-6'><p id='title'>Title: " + film.Title 
						+"</p><p id='year'>Year: "+ film.Year
						+"</p><p id='imdbID'>imdbID: " + film.imdbID
						+"</p><p id='Type'>Type: " + film.Type +
						"</p></div></div></div");
	
		});
}



$('#searchForm').on('submit', function(event) {
	event.preventDefault();
	var $inputValue = $('input.form-control').val();
	downloadData($inputValue);
});

$(document).on("click", ".page-link", function(event) {
	event.preventDefault();
	var dataPageValue = $(this).attr("data-page");

	if (dataPageValue != "" && dataPageValue != undefined) {  
	
		downloadData($(this).attr("data-s"), Number(dataPageValue));
	}
});