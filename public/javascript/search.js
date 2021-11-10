$(document).ready(function() {
	// Game Search 
	$("#gameSearch").on("click", function(event) {
		event.preventDefault();

		searchGames({ gameType: $("#searchTerm").val().trim() });
	});

	// Advance Search button click event 
	$("#searchGameAdv").on("click", function (event) {
		event.preventDefault();

		// Variables for user input parameters
		const genreType = $("#genreType option:selected");
		
		// Collect user inputs
		var searchParam = {
			game_genre: genreType.is(":checked", function () {
				genreType.prop("checked", true);
			}),
		};

		if (genreType) {
			searchParam.genreType = genreType;
		}
		
		searchGames(searchParam);
	});
});

// Search Games in the database
function searchGames(searchParam) {
	const url = "/api/search/" + $.param(searchParam);
	console.log("URL:", url);
	search(searchParam).then(function (data) {
		console.log("Game search completed successfully");
		window.location.href = url;
	}).catch(function(error) {
		console.log("Game search failed", error);
	});
}

// AJAX http request for game search
function search(searchParam) {
	return $.ajax({
		url: searchParam,
		type: "GET",
	});
}