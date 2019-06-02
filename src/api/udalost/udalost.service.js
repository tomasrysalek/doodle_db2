import Udalost from './udalost.model';
import Skupina from '../skupina/skupina.model'
function add(req,res){
    Skupina.findOne({where: {Nazev:req.body.skupina}}).then(foundSK => {
        if(!foundSK){
                if(req.body.psc){
                    const udalost = Udalost.build({
                        Nazev: req.body.nazev,
                        Popis: req.body.popis,
                        Datum: req.body.datum,
                        UzivatelID: req.user.UzivatelID,
                        PSC:req.body.psc,
                        Adresa:req.body.adresa
                    }).save()
            }else{
                const udalost = Udalost.build({
                    Nazev: req.body.nazev,
                    Popis: req.body.popis,
                    Datum: req.body.datum,
                    UzivatelID: req.user.UzivatelID,
                }).save()
            }
        }else{
            if(req.body.psc){
                const udalost = Udalost.build({
                    Nazev: req.body.nazev,
                    Popis: req.body.popis,
                    Datum: req.body.datum,
                    UzivatelID: req.user.UzivatelID,
                    PSC:req.body.psc,
                    Adresa:req.body.adresa
                }).save()
        }else{
            const udalost = Udalost.build({
                Nazev: req.body.nazev,
                Popis: req.body.popis,
                Datum: req.body.datum,
                UzivatelID: req.user.UzivatelID,
            }).save()
        }
        }
    })

}

function getAll(req,res){
    Udalost.findAll({where:{UzivatelID: req.user.UzivatelID},raw:true}).then(found =>{
        return res.json({Udalosti: found});
    })
}

export default {add,getAll};