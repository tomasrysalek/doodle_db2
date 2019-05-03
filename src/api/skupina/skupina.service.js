import sk from './skupina.model';
import SP from '../skupina_prava/sk_prava.model';
import User from '../uzivatel/uzivatel.model';
/**
 * Vytvoreni skupiny a pridani zaznamu prav do tabulkz
 * !!Dodelat pro jakoukoliv skupinu!!
 */
function create(req,res){
    const skupina = sk.findOne({where: {Nazev: req.body.nazev}}).then(skupina => {
        if(skupina){
            return res.json({mssg: 'Group already exists'})
        }
        else{
            const newSkupina = sk.build({
                Nazev: req.body.nazev
            })
            const newSP = SP.build({
                ID_Prava: 1,
                SkupinaID: 4,
                UzivatelID: req.user.UzivatelID,
            })
            newSkupina.save();
            newSP.save();
        }
    })
}
/**
 * Pridat uzivatele do skupiny
 * !!Dodelat pro jakoukoliv skupinu!!
 */
function adduser(req,res){
    const user = User.findOne({where:{Email:req.body.email}}).then(foundUser => {
        if(foundUser){
            const newSP = SP.build({
                ID_Prava: 2,
                SkupinaID: 4,
                UzivatelID: foundUser.UzivatelID,
            }).save()
        }else{
            res.json({mssg:'user does not exist'});
        }
    })
}

export default {create,adduser};