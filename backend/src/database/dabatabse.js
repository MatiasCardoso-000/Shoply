import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('CyberCrew', 'postgres','root', {
    host: 'localhost',
    dialect: 'postgres'
})