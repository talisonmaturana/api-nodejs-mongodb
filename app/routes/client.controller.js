var Client = require('../../models/client');
const mongoose = require('mongoose');

module.exports = routes => {

    routes.get('/', (req, res) => {
        res.send('Ok');
    });

    routes.post('/clients', (req, res) => {
        const client = new Client ({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            rg: req.body.rg,
            cpf: req.body.cpf,
            dateBor: req.body.dateBorn,
            phone: req.body.phone,
            email: req.body.email   
        });

        client.save()
            .then(result => {
                console.log('Client has been saved.');
                console.log(result);
                res.status(201).json({
                    message: 'Handling POST requests to /clients',
                    createdClient: result
                });
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error });
            });  
    });

    routes.get('/clients', (req, res) => {
        Client.find()
            .exec()
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            })
            .catch(error => {
                console.log(error);
                res.sattus(500).json({ error });
            });
    });

    routes.get('/clients/:clientId', (req, res) => {
        Client.findById(req.params.clientId)
            .exec()
            .then(doc => {
                console.log("From database ", doc);
                if(doc)
                    res.status(200).json(doc);
                else
                    res.status(404).json({ message: 'No valid entry found for provided ID.' });
            })
            .catch(error => {
                console.log(err);
                res.status(500).send({ error });
            });
    });

    routes.put('/clients/:clientId', (req, res) => {
        const id = req.params.clientId;
        Client.update({ _id: id }, { 
            $set: {
                name: req.body.name,
                rg: req.body.rg,
                cpf: req.body.cpf,
                dateBor: req.body.dateBorn,
                phone: req.body.phone,
                email: req.body.email
            } 
         }, { multi: true })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error });
            });
    });

    routes.delete('/clients/:clientId', (req, res) => {
        const id = req.params.clientId;
        Client.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error }); 
            });
    });
}