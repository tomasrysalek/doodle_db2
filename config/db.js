import Sequelize from 'sequelize';

const connect =new Sequelize('C1ehp7mXWV', 'C1ehp7mXWV', '8cVwGWKcFm', {
	host: 'remotemysql.com',
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