import inquirer from 'inquirer';
import colors from 'colors';
import start from './main.js';
import pg from 'pg';
import { pool, connectToDb, fetchTableData } from './connection.js'
import { QueryResult } from 'pg';
const { Pool } = pg;

async function updateEmp(emp_id: string) {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1'[parseInt(emp_id)]);
    console.table(result);
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to update?',
                choices: ['Name', 'Role'],
                name: 'a'
            }
        ])
        .then(res => {
            if (res.a === 'Name') {
                //Get new name info and update existing info
                inquirer
                    .prompt([{
                        type: 'input',
                        message: 'Enter Full Name',
                        name: 'name'
                    }])
                    .then(res => {
                        pool.query('UPDATE employees SET name = $1 WHERE id = $2'[res.name, emp_id])
                    })
            } else {
                //Update role where id = selected employee
                const roles = pool.query('SELECT * FROM roles')
                inquirer
                    .prompt([{
                        type: 'list',
                        message: 'Select New Role.',
                        choices: roles
                    }])
            }
        })
    const newResult = pool.query('SELECT * FROM employees WHERE id = $1'[parseInt(emp_id)]);
    console.log(colors.green('Information Updated.'));
    console.table(newResult);
}

async function insertData(table: string) {
    if (table === 'employees') {
        const departments = (await pool.query('SELECT * FROM departments')).rows;
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Enter Employee Full Name',
                    name: 'name'
                },
                {
                    type: 'list',
                    message: 'Select Employee Department',
                    name: 'department',
                    choices: departments
                },
            ])
    }
}

function menuHandler(response) {
    if (response.action === 'View Departments') {
        console.table(fetchTableData('departments'));
        //display the result on console
    } else if (response.action === 'View Roles') {
        //function to render roles table in pg
        console.table(fetchTableData('roles'));
    } else if (response.action === 'View Employees') {
        //function to render employees table in pg
        console.table(fetchTableData('employees'));
    } else if (response.action === 'Update Employee Information') {
        //function to update employee information inside pg table
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Enter Employee ID Number.',
                    name: 'emp_id'
                }
            ])
            .then(res => {updateEmp(res.emp_id)})
    } else if (response.action === 'Add Employee') {
        //function to add entry to employee pg table
    } else if (response.action === 'Add Role') {
        //function to add entry to role pg table
    } else if (response.action === 'Add Department') {
        //function to add entry to department table
    }
}

export default menuHandler;