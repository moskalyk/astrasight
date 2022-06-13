const app = require('express')()
app.get('/points', req, res, () => {
	res.send(200)
}).listen(3031)