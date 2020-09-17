<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
	
	<link rel="stylesheet" type="text/css" href="{{mix('/css/app.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('/css/diemdanh.css')}}">


	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</head>
<body>
	<div class="wraper" style="margin-top: -10px;">
		<header class="Header">
			<div id='header'></div>
 		</header>	
	<br>

	<div class="content">
		<div id='diemdanh'></div>
		
	</div>

	
	<br>
 		<footer class="Footer">
 			<div id='footer'></div>
 		</footer>

	</div>

	<!--boostrap-->
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
	<!--End boostrap-->

	<script src="{{mix('/js/app.js')}}"></script>
</body>
</html>