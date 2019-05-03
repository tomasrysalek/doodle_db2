import sk from './skupina.model';

function add(req,res){
    const skupina = sk.findOne({where: {Nazev: req.body.nazev}}).then(skupina => {
        if(skupina){
            return res.json({mssg: 'Group already exists'})
        }
        else{
            const newSkupina = sk.build({
                Nazev: req.body.nazev
            }).save()
        }
    })
}

export default {add};