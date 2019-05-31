import Chat from './chat.model'
import { runInNewContext } from 'vm';

async function getAll(skupina,res) {
    var mesUs = []
    await Chat.findAll({where: {Skupina: skupina},raw:true}).then(allMessage => {
        mesUs = allMessage;
    })
    return mesUs
}

function save(message,user,skupina) {
    Chat.build({
        Message: message,
        Uzivatel: user,
        Skupina: skupina
    }).save()
}

export default {getAll,
    save}