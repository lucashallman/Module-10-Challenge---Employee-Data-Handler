import pg from 'pg';
const { Pool } = pg;
import inquirer from 'inquirer';
import menuHandler from './input.js';
import { connectToDb } from './connection.js';
function start() {
    inquirer
        .prompt([
        {
            type: 'list',
            message: 'Select an Action.',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Update Employee Information', 'Add Employee', 'Add Role', 'Add Department'],
            name: 'action'
        }
    ])
        .then((response) => menuHandler(response));
}
export default start;
connectToDb;
start;
