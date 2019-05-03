import Udalost from './udalost.model';

function add(req,res){
    const udalost = Udalost.build({
        Nazev: req.body.nazev,
        Popis: req.body.popis,
        Datum: req.body.datum,
        UzivatelID: req.user.UzivatelID
    }).save()
}

export default {add};