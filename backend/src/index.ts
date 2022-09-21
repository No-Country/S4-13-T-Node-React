import express from 'express'

const app = express()
app.use(express.json())

const PORT = 8080

app.get('/', (req, res) => {
	res.json({ message: 'Running server successfully' })
})

app.listen(PORT, () => {
	console.log('Server running on ' + PORT)
})
