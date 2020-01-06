const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'e7f8fcd8b4ac440db94eaf6fd29ce102'
});

const handleApiCall = (req, res) => {
	app
	.models.predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where({id})
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json('unable to get entries'))
};

module.exports = {
	handleImage,
	handleApiCall
}