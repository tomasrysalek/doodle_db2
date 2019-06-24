import Udalost from './udalost.model';
import Skupina from '../skupina/skupina.model'
import user from '../uzivatel/uzivatel.model'
const incomingForm = require('formidable').IncomingForm;
const CONFIG = require('../../../config/cal_setting');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);  

function allUdalosti (req,res){
    Udalost.findAll({where:{UzivatelID: req.user.UzivatelID},raw:true}).then(found =>{
        return found;
    })
}


function add(req,res){
    Skupina.findOne({where: {Nazev:req.body.skupina}}).then(foundSK => {
        console.log(req.file)
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

function expotToGoogle(req,res){
    user.findOne({where:{Email: req.body.Email}}).then(foundUser =>{
        Udalost.findAll({where:{UzivatelID:foundUser.UzivatelID },raw:true}).then(found =>{
            found.forEach(udalost =>{
                const params = {
                    'start': {'dateTime':new Date(udalost.Datum)},
                    'end': { 'dateTime': new Date(udalost.Datum) },
                    'location': `${udalost.Adresa}`,
                    'summary': `${udalost.Nazev}`,
                    'status': 'confirmed',
                    'description': `${udalost.Popis}`,
                    'colorId': 1
                }
                cal.Events.insert(req.body.Email,params).
                then(resp => {
                    return res.status(200).json({mssg: Hotovo})
                })
                .catch(err => {
                    return res.status(409)
                });        
            })
        })
    
    })


}

export default {add,getAll,expotToGoogle};