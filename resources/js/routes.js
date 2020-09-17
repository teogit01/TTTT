import React from 'react'
import FormAdd from './components/DiemDanh/FormAdd'
import NotFound from './components/NotFound'

const routes = [
	{
		path : 'class/add',
		exact : true,
		main : () => <NotFound />
	},
	{
		path : '',
		exact : true,
		main : () => <NotFound />
	}
]

export default routes