import sk from './skupina.model';
import SP from '../skupina_prava/sk_prava.model';
import User from '../uzivatel/uzivatel.model';
import Udalost from '../udalost/udalost.model'
 function addSP(nazev,user,admin){
     sk.findOne({where: {Nazev: nazev}}).then(foundSK => {
         if(admin){
         SP.build({
             UzivatelID: user.UzivatelID,
             SkupinaID: foundSK.SkupinaID,
             ID_Prava: 1
         }).save()
        }
        else{
            SP.build({
                UzivatelID: user.UzivatelID,
                SkupinaID: foundSK.SkupinaID,
                ID_Prava: 2
            }).save() 
        }
     })
 }
/**
 * Vytvoreni skupiny a pridani zaznamu prav do tabulky
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
            addSP(req.body.nazev,req.user,true);

        }
    })
}
/**
 * Pridat uzivatele do skupin
 */
function adduser(req,res){
    const user = User.findOne({where:{Email:req.body.email}}).then(foundUser => {
        if(foundUser){
            addSP(req.body.skupina,foundUser,false);
        }else{
            res.json({mssg:'user does not exist'});
        }
    })
}

function getAll(req,res){
    const skID= [];
    const skPrava = [];
    SP.findAll({where:{UzivatelID: req.user.UzivatelID}, raw:true}).then(foundSP =>{
        for(var i = 0; i < foundSP.length; i++){
            skPrava.push(foundSP[i].ID_Prava)
            skID.push(foundSP[i].SkupinaID)
        }
        sk.findAll({where:{SkupinaID: skID }, raw:true}).then(foundSK=>{
            for(var i = 0; i < foundSK.length; i++){
                foundSK[i].prava = foundSP[i].ID_Prava
            }
            console.log(foundSK)
            return res.json({skupiny:foundSK})
        })
    })
}

function getUdalosti(req,res){
    sk.findOne({where:{Nazev:req.body.skupina}}).then(foundSK =>{
        Udalost.findAll({where: {SkupinaID: foundSK.SkupinaID}, raw:true}).then(foundUdalosti =>{
            return res.json({udalost: foundUdalosti})
        })
    })
}

function deleteSk(req,res){
    sk.findOne({where:{Nazev:req.body.skupina}}).then(found => {
        Udalost.destroy({
            where: {SkupinaID: found.SkupinaID}
        });
        SP.destroy({
            where:{SkupinaID: found.SkupinaID}
        })
        return found.destroy();
    })
}

export default {create,adduser,getAll,getUdalosti,deleteSk};