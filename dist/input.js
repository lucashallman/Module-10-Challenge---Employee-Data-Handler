import inquirer from 'inquirer';
import colors from 'colors';
import pg from 'pg';
import { pool, fetchTableData } from './connection.js';
const { Pool } = pg;
async function updateEmp(emp_id) {
    const result = pool.query('SELECT * FROM employees WHERE id = $1', [emp_id], (err => console.log(err)));
    const roles = await pool.query('SELECT title FROM roles');
    console.table(result);
    inquirer
        .prompt([
        {
            type: 'list',
            message: 'What would you like to update?',
            choices: ['Name', 'Role'],
            name: 'updateSelect'
        }
    ])
        .then(res => {
        if (res.updateSelect === 'Name') {
            //Get new name info and update existing info
            inquirer
                .prompt([{
                    type: 'input',
                    message: 'Enter Full Name',
                    name: 'name'
                }])
                .then(res => {
                pool.query('UPDATE employees SET name = $1 WHERE id = $2', [res.name, emp_id], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        console.log(colors.green('Success!'));
                        console.table(result.rows);
                    }
                    ;
                });
            });
        }
        else {
            //Update role where id = selected employee
            inquirer
                .prompt([{
                    type: 'list',
                    message: 'Select New Role.',
                    choices: roles.rows,
                    name: 'newRole'
                }])
                .then(res => {
                pool.query('UPDATE employees SET role = $1 WHERE id = $2', [res.newRole, emp_id], (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        console.log(colors.green('Success!'));
                        console.table(result.rows);
                    }
                    ;
                });
            });
        }
    });
    const newResult = pool.query('SELECT * FROM employees WHERE id = $1', [emp_id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log(colors.green('Success!'));
            console.table(result.rows);
        }
        ;
    });
    console.log(colors.green('Information Updated.'));
    console.table(newResult);
}
async function insertData(table) {
    if (table === 'employees') {
        const departments = await pool.query('SELECT * FROM departments');
        const roles = await pool.query('SELECT * FROM roles');
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
                choices: departments.rows
            },
            {
                type: 'list',
                message: 'Select Employee Role',
                name: 'role',
                choices: roles.rows
            }
        ])
            .then(result => {
            pool.query('INSERT INTO employees (name, dept_id) VALUES ($1, $2)', [result.name, result.department.id]);
        });
    }
    else if (table === 'departments') {
    }
}
function menuHandler(response) {
    if (response.action === 'View Departments') {
        fetchTableData('departments');
        //display the result on console
    }
    else if (response.action === 'View Roles') {
        //function to render roles table in pg
        fetchTableData('roles');
    }
    else if (response.action === 'View Employees') {
        //function to render employees table in pg
        fetchTableData('employees');
    }
    else if (response.action === 'Update Employee Information') {
        //function to update employee information inside pg table
        inquirer
            .prompt([
            {
                type: 'input',
                message: 'Enter Employee ID Number.',
                name: 'emp_id'
            }
        ])
            .then(res => { updateEmp(res.emp_id); });
    }
    else if (response.action === 'Add Employee') {
        //function to add entry to employee pg table
    }
    else if (response.action === 'Add Role') {
        //function to add entry to role pg table
    }
    else if (response.action === 'Add Department') {
        //function to add entry to department table
    }
}
export default menuHandler;
