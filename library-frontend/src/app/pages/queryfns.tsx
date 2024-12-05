import axios from 'axios';

export async function searchInventory(searchTerm: string, table: string) {
    const reponse = await axios.get(`http://localhost:3000/database/inventory/search`, {params: {searchTerm, table}});
    return reponse.data;
} 

export async function checkoutItem(itemid: number, memid: number, empid: number) {
    const response = await axios.post(`http://localhost:3000/database/checkout`, {itemid, memid, empid});
    return response.data;
}

export async function returnItem(itemid: number) {
    const response = await axios.post(`http://localhost:3000/database/return`, {itemid});
    return response.data;
}

export async function addBook(isbn: number) {
    const response = await axios.post(`http://localhost:3000/database/books/add`, {isbn});
    return response.data;
}

export async function addcdvid(title: string, year: string, genre: string, artist: string, runtime: string, table: string) {
    const mediaData = {title, year, genre, artist, runtime};
    const response = await axios.post(`http://localhost:3000/database/media/add`, {table, mediaData});
    return response.data;
}

export async function deleteItem(itemID:number, table: string) {
    console.log(itemID, table);
    const response = await axios.post(`http://localhost:3000/database/media/delete`, {itemID, table});
    return response.data;
}

export async function getAllDevices() {
    const reponse = await axios.get(`http://localhost:3000/database/devices`);
    return reponse.data;
} 

export async function updateDeviceStatus(device_id: number, status: string) {
    console.log(device_id, status);
    const response = await axios.post(`http://localhost:3000/database/devices/status`, {device_id, status});
    console.log(response.data);
    return response.data;
}

export async function addDevice(deviceName: string, deviceType: string, location: string, purchaseDate:string, lastServiceDate:string) {
    const deviceData = {device_name:deviceName, device_type:deviceType, location, purchase_date:purchaseDate, last_service_date:lastServiceDate};
    const response = await axios.post(`http://localhost:3000/database/devices/add`, {deviceData});
    return response.data;
}

export async function deleteDevice(device_id: number) {
    const response = await axios.get(`http://localhost:3000/database/devices/delete/${device_id}`);
    return response.data;
}

export async function addMember(Fname: string, Lname: string, MI: string, email: string, Phone: string, street: string, town: string, zip: string) {
    const memberData = {Fname, Lname, MI, email, Phone, street, town, zip};
    const response = await axios.post(`http://localhost:3000/database/members/add`, {memberData});
    return response.data;
}

export async function deleteMember(memid: number) {
    const response = await axios.get(`http://localhost:3000/database/members/delete/${memid}`);
    return response.data;
}

export async function addEmployee( Fname: string, Lname: string, Phone: string, street: string, town: string, zip: string,salary: number) {
    const employeeData = {Fname, Lname, Phone, street, town, zip, salary};
    const response = await axios.post(`http://localhost:3000/database/employees/add`, {employeeData});
    return response.data;
}

export async function deleteEmployee(employee_id: number) {
    const response = await axios.get(`http://localhost:3000/database/employees/delete/${employee_id}`);
    return response.data;
}

export async function getAllMembers() {
    const reponse = await axios.get(`http://localhost:3000/database/members`);
    return reponse.data;
}

export async function getAllEmployees() {
    const reponse = await axios.get(`http://localhost:3000/database/employees`);
    return reponse.data;
}