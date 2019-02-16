var Client = require('../../models/client');

module.exports = routes => {

    routes.get('/', (req, res) => {
        res.send('Ok');
    });

    routes.post('/clients', (req, res) => {
        let client = new Client();

        client.name = req.body.name;
        client.rg = req.body.rg;
        client.cpf = req.body.cpf;
        client.dateBorn = new Date();
        client.phone = req.body.phone;
        client.email = req.body.email;     
        
        client.save((error) => {
            if(error)
                res.send('Something went really wrong! ' + error);

            res.send('Client has been created!')
        })
    });

    routes.get('/clients', (req, res) => {
        Client.find({}, (error, clients) => {
            if(error) {
                res.send('Something went really wrong!');
                next();
            }
            res.send(clients);
        });
    });

    routes.get('/clients/:clientId', (req, res) => {
        Client.findById(req.params.clientId)
            .then(doc => {
                if(!doc) return res.status(404).end();
                return res.status(200).send(doc);
            })
            .catch(error => next(error));
    });


}