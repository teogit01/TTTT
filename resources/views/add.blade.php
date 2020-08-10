<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<form action="{{route('add')}}" method="post">
		@csrf
		<input type="text" name="code">
		<br>
		<br>
		<input type="text" name="name">
		<button type="submit">submit</button>
	</form>	

	<br/>
	
	<table border="1">
		<tr>
			<th>id</th>
			<th>code</th>
			<th>name</th>
			<th></th>
		</tr>
	@foreach($data as $d)
		<tr>
			<td>{{$d['id']}}</td>
			<td>{{$d['code']}}</td>
			<td>{{$d['name']}}</td>
			<td><a href="{{route('del',$d['id'])}}">delete</a></td>
		</tr>	
	@endforeach
	</table>

</body>
</html>
