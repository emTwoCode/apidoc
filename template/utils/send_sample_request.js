function sendSampleRequest(type, apiName) {
	// create JSON dictionary of parameters
	var dict = {};
	$(".sample-param-" + apiName).each(function(i, element) {
		var key = element.id;
		var value = element.value;
		dict[key] = value;
	});

	// grab user-inputted URL
	var url = $("#sample-url-" + apiName)[0].value;

	// send AJAX request, catch success or error callback
	$.ajax({
		url: "/api" + url,
		dataType: "json",
		data: dict,
		type: type.toUpperCase(),
		success: displaySuccess,
		error: displayError
	});

	function displaySuccess(data) {
		$("#sample-response-" + apiName).show();
		$("#sample-response-json-" + apiName).html(JSON.stringify(data, null, 4));
		refreshScrollSpy();
	};

	function displayError(jqXHR, textStatus, errorThrown) {
		$("#sample-response-" + apiName).show();
		$("#sample-response-json-" + apiName).html(jqXHR.status + " Error: " + errorThrown);
		refreshScrollSpy();
	};
};

function clearSampleRequest(apiName) {
	// hide sample response
	$("#sample-response-json-" + apiName).html("");
	$("#sample-response-" + apiName).hide();

	// reset value of parameters
	$(".sample-param-" + apiName).each(function(i, element) {
		element.value = "";
	});

	// retore default URL
	var sampleURLelement = $("#sample-url-" + apiName)[0];
	sampleURLelement.value = sampleURLelement.defaultValue;

	refreshScrollSpy();
};

function refreshScrollSpy() {
  	$('[data-spy="scroll"]').each(function () {
  		$(this).scrollspy('refresh');
	}); 
};