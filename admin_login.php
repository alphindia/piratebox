<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width">
		<link rel="stylesheet" href="css/style.css"> 
		<title>CorsairesBoxes</title>
	</head>
	<body>

		<script src="js/jquery.min.js"></script>
		<!-- <script src="js/tinynav.min.js"></script> -->
		<script src="js/tinynav.js"></script>

		<header>
			<div>
				<h1>CorsairesBoxes</h1>
				<h2>La boite, à piraates !</h2>
			</div>

			<nav><ul id='nav'><li><a href='index.html'>Accueil</a></li> <li><a href='deposer.html'>Déposer un fichier</a></li> <li><a href='consulter.html'>Consulter les fichiers</a></li> <li><a href='admin_login.php'>Administrer</a></li> </ul></nav>
		</header>

		<section><article class="centered">

	<?php 
		if(isset($_GET['badwolf']))
		{
			echo "<p>Vous devez avoir la clé pour entrer. Piraate !</p>" ;
		}
	?>

	<form action="admin.php" method="post">

		<label for="password">Mot de passe : </label>
		<input name="password" id="password" type="password">
		
		<input type="submit" value="Connection">
	</form>
</article>		</section>

	</body>
</html>