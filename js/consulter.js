$(function() {

	var toogleInfos = function()
	{
		var $that = $(this) ;
		var $parent = $that.parent();

		var $detailed = $("#detailed");
		
		var $details = $parent.children("div");
		if($details.attr("id") != "detailed")
		{
			$details.attr("id","detailed").toggle();
		}

		$detailed.removeAttr("id").hide();
	}

	var toogleView = function()
	{
		var $that = $(this) ;
		var $parent = $that.parent();
		var nom = $that.text();

		//Si la categorie n'a pas été chargée ou pas rafrachie depuis plus d'une heure, on la rafraichis
		if(categories[nom] == undefined ||  new Date().getTime() - categories[nom] > 3600000) 
		{
			$.ajax({
				type: "GET",
				url: "bibliotheque/" + nom + ".xml?t=" + new Date().getTime(),
				dataType: "xml",
				error: function(){ alert("Erreur, la catégorie " + nom + " ne peut être affichée"); },
				success: function(xml) {
			 		
			 		$parent.find("dt").remove();
					categories[nom] = new Date().getTime();

					var $fichiers = $("<ul>");
					$parent.append(
						$("<dt>").append(
							$fichiers
						).attr("id", "open")
					);

					$(xml).find("f").each(function(index){

						var $description,
							$infos = $("<ul>").append(
							$("<li>").text("Type : " + $(this).attr("t")),
							$("<li>").text("Taille : " + $(this).attr("s") + " octets"),
							$("<li>").text("Date de dépot : " + $(this).attr("d"))
						);

						if($(this).attr("c") != "")
						{
							$description = $("<p>").append(
								$("<span>").addClass("title").html("Description: <br/>"),
								$(this).attr("c")
							)

							$infos.addClass("not_alone");

						}

						

						$fichiers.append(
							$("<li>").append(
								$("<h4>").text(
									$(this).attr("n")
								).click(toogleInfos),

								$("<div>").append(
									$infos,
									$description,
									$("<div>").addClass("centered").append(
										$("<a>").attr("href", "bibliotheque/fichiers/" + $(this).attr("n")).attr("target", "_blank").addClass("button").text("Télécharger " + $(this).attr("n"))
									)
								).hide()
							)
						);

					});

				}
			});	
		}

		var $open = $("#open");
		
		var $dt = $parent.find("dt");
		if($dt.attr("id") != "open")
		{
			$dt.attr("id","open").toggle();
		}

		$open.removeAttr("id").hide();		

		//Après avoir replié les catégories on repli les fichiers dont on avait le détail
		$("#detailed").removeAttr("id").hide();

	}

	var categories = {};

	var container = $("<ul>");
	$("article#file_list").append(container);

	$.ajax({

	    type: "GET",
		url: "bibliotheque/categories.xml",
		dataType: "xml",
		success: function(xml) {
	 
			$(xml).find("categorie").each(function(index){

				var nom = $(this).text() ;
				$(container).append($("<dl>").append($("<dd>").append($("<h4>").text(nom)).click(toogleView)));

			});

		}
	});

});