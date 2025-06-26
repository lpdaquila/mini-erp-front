import { ApiGetUser, ApiSignIn } from "src/models/Auth";
import { useApi } from "./api";
import { ApiGetPermissions } from "src/models/Permission";
import { ApiGetGroup, ApiGetGroups } from "src/models/Group";
import { ApiGetEmployee, ApiGetEmployees } from "src/models/Employee";
import { ApiGetTask, ApiGetTasks } from "src/models/Tasks";

// Authentication
async function signIn({ email, password }: { email: string, password: string }) {
    const response = await useApi<ApiSignIn>('auth/signin/', 'POST', { email, password }, false)
    return response;
}

async function getUser() {
    return await useApi<ApiGetUser>('auth/user/');
}

// Groups / Permissions
async function getPermissions() {
    return await useApi<ApiGetPermissions>('companies/permissions/');
}

async function getGroups() {
    return await useApi<ApiGetGroups>('companies/groups/');
}

// CRUD
async function getAGroup(id: number) {
    return await useApi<ApiGetGroup>(`companies/groups/${id}`)
}

async function addGroup({ name, permissions }: { name: string, permissions: string }) {
    return await useApi('companies/groups/', 'POST', { name, permissions });
}

async function editGroup(
    id: number, { name, permissions }: { name?: string, permissions?: string }
) {
    return await useApi(`companies/groups/${id}`, 'PUT', { name, permissions });
}

async function deleteGroup(id: number) {
    return await useApi(`companies/groups/${id}`, 'DELETE');
}

// Employees
async function getEmployees() {
    return await useApi<ApiGetEmployees>('companies/employees');
}

//CRUD
async function getAEmployee(id: number) {
    return await useApi<ApiGetEmployee>(`companies/employees/${id}`)
}

async function addEmployee(
    { name, email, password }:
        { name: string, email: string, password: string }) {
    return await useApi('companies/employees/', 'POST', { name, email, password });
}

async function editEmployee(
    id: number, { name, email, groups }:
        { name?: string, email?: string, groups?: string }) {
    return await useApi(`companies/employees/${id}`, 'PUT', { name, email, groups });
}

async function deleteEmployee(id: number) {
    return await useApi(`companies/employees/${id}`, 'DELETE')
}

//Tasks
async function getTasks() {
    return await useApi<ApiGetTasks>('companies/tasks/');
}

//CRUD
async function getATask(id: number) {
    return await useApi<ApiGetTask>(`companies/tasks/${id}`);
}

async function addTask(
    { title, description, due_date, employee_id, status_id }:
        { title: string, description?: string, due_date?: string, employee_id: number, status_id: number }
) {
    return await useApi<ApiGetTask>('companies/tasks/', 'POST', {
        title, description, due_date, employee_id, status_id
    });
}

async function editTask(
    id: number, { title, description, due_date, employee_id, status_id }:
        { title?: string, description?: string, due_date?: string, employee_id?: number, status_id?: number }
) {
    return await useApi<ApiGetTask>(`companies/tasks/${id}`, 'PUT', {
        title, description, due_date, employee_id, status_id
    });
}

async function deleteTask(id: number) {
    return await useApi(`companies/tasks/${id}`, 'DELETE');
}

export const useRequests = () => ({
    // Auth
    signIn,
    getUser,

    // Groups/Permissions
    getPermissions,
    getGroups,
    getAGroup,
    addGroup,
    editGroup,
    deleteGroup,

    // Employees
    getEmployees,
    getAEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee,

    // Tasks
    getTasks,
    getATask,
    addTask,
    editTask,
    deleteTask,
});