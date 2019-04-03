import Sequelize from 'sequelize';
import db from './dbConfig.json';

const connect =new Sequelize(`${db.user}`, `${db.user}`, `${db.psswd}`, {
	host: `${db.host}`,
	dialect: 'mysql',
	operatorsAliases: false,
	port: 3306,
  
	pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
	},
  });

export default connect;