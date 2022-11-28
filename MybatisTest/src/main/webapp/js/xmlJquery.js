/**
 * 
 */

$.ajax({
	url:'./cd_catalog.xml',
	success: function(doc){
		//table, thead, tbody => show의 하위요소.
		$('#show').append(
				$('<thead id="title" />'), 
				$('<tbody id="list"/>')
		);

		$(doc).find('CATALOG>CD').each(function(idx, item){
			console.log($(item).children());
			let tr = $('<tr/>').append(
				$('<td/>').text($(item).children().eq(0).html()),
				$('<td/>').text($(item).children().eq(1).html()),
				$('<td/>').text($(item).children().eq(2).html()),
				$('<td/>').text($(item).children().eq(3).html()),
				$('<td/>').text($(item).children().eq(4).html()),
				$('<td/>').text($(item).children().eq(5).html())
			);
			$('#list').append(tr);
		});
		let titles = $(doc).find('CATALOG>CD').eq(0).children();
		for(let title of titles){
			console.log(title.nodeName);
		}
	},
	error: function(error){
		console.log(error);
	}
})