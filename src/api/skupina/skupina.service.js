import sk from './skupina.model';
import SP from '../skupina_prava/sk_prava.model';
import User from '../uzivatel/uzivatel.model';

 function addSP(nazev,user){
     sk.findOne({where: {Nazev: nazev}}).then(foundSK => {
         SP.build({
             UzivatelID: user.UzivatelID,
             SkupinaID: foundSK.SkupinaID,
             ID_Prava: 1
         }).save()
     })
 }
/**
 * Vytvoreni skupiny a pridani zaznamu prav do tabulkzy
 * 
 */
function create(req,res){
    sk.findOne({where: {Nazev: req.body.nazev}}).then(async foundSK => {
        if(foundSK){
            return res.json({mssg: 'Group already exists',id: foundSK.SkupinaID})
        }
        else{
           await sk.build({
                Nazev: req.body.nazev
            }).save()
            addSP(req.body.nazev,req.user);

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