import Udalost from './udalost.model';
import Adresa from '../adresa/adresa.model';

function add(req,res){
    const adresa = Adresa.build({
        PSC:req.body.psc,
        Nazev: req.body.nazev
    })
    const udalost = Udalost.build({
        Nazev: req.body.nazev,
        Popis: req.body.popis,
        Datum: req.body.datum,
        UzivatelID: req.user.UzivatelID,
        PSC: adresa.PSC
    })
    adresa.save();
    udalost.save();
}

function getAll(req,res){
    Udalost.findAll({where:{UzivatelID: req.user.UzivatelID}}).then(found =>{
        return res.json([{Udalosti: found}]);
    })
}

export default {add,getAll};