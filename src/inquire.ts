import pg from 'pg';
import { pool } from './connection.js';

const actionCL = ['View Departments', 'View Roles', 'View Employees', 'Update Employee Information', 'Add Employee', 'Add Role', 'Add Department']