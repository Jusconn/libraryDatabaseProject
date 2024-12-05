import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(private dataSource: DataSource) {}

    //perform basic sql query
    async query(query: string): Promise<any> {
        try {
            return await this.dataSource.query(query);
        }
        catch (error) {
            throw new Error('Error querying the database: ' + error);
        }
    }

    //search for mediaitems in the database
    async searchInventory(searchTerm: string, table: string): Promise<any> {
        console.log(searchTerm);
        
            try {
                let itemIds = await this.dataSource.query(`SELECT item_id FROM MediaItems WHERE title LIKE '%${searchTerm}%' OR genre LIKE '%${searchTerm}%'`);
                if (itemIds.length === 0) {
                    return [];
                }
                 const response = await this.dataSource.query(`SELECT MediaItems.*, ${table}.* FROM MediaItems INNER JOIN ${table} ON MediaItems.item_id = ${table}.item_id WHERE MediaItems.item_id IN (${itemIds.map(item => item.item_id).join(',')})`);
                response.forEach(item => {
                    item.mediaType = table;
                });
                 return response;
            }
            catch (error) {
                throw new Error('Error querying the database: ' + error);
            }

    }

    async getMoreItemInfo(itemID: number): Promise<any> {
        try {
            let response = await this.dataSource.query(`SELECT * FROM   WHERE item_id = ${itemID}`);
            if (response.length === 0) {
                throw new Error('No item found with that ID');
            }
            return response;
        }
        catch (error) {
            throw new Error('Error querying the database: ' + error);
        }
    }

    //add book to the database via transaction
    async addBookTransaction(bookData): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const publishYear = bookData.publishedDate.split('-')[0];
            const genre = bookData.categories ? bookData.categories[0] : 'Unknown';
            await queryRunner.query(`INSERT INTO MediaItems (title, publish_year, genre) VALUES ('${bookData.title}', ${publishYear}, '${genre}')`);

            const itemID = await queryRunner.query(`SELECT item_id FROM MediaItems WHERE title = '${bookData.title}' AND publish_year = ${publishYear} AND genre = '${genre}'`);
            const authorfname = bookData.authors[0].split(' ')[0];
            const authorlname = bookData.authors[0].split(' ')[1];
            await queryRunner.query(`INSERT INTO Books (item_id, author_Fname, author_Lname, isbn) VALUES (${itemID[0].item_id},'${authorfname}', '${authorlname}', '${bookData.industryIdentifiers[0].identifier}')`);
            await queryRunner.commitTransaction();
            return 1;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error('Error querying the database: ' + error);
        }
        finally {
            await queryRunner.release();
        }
    }

    //delete item from the database via transaction
    async deleteItemTransaction(itemID: number,table: string): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            const IDs = await queryRunner.query(`SELECT item_id FROM MediaItems WHERE item_id = ${itemID}`);
            if (IDs.length === 0) {
                return 0;
            }
            if(table === 'Books') {
            await queryRunner.query(`DELETE FROM Books WHERE item_id = ${itemID}`);
            } else if(table === 'CDs') {
            await queryRunner.query(`DELETE FROM CDs WHERE item_id = ${itemID}`);
            }
            else if(table === 'Videos') {
            await queryRunner.query(`DELETE FROM Videos WHERE item_id = ${itemID}`);
            }
            await queryRunner.query(`DELETE FROM MediaItems WHERE item_id = ${itemID}`);
            await queryRunner.commitTransaction();
            return 1;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return 0;
        }
        finally {
            await queryRunner.release();
        }
    }

    //retrieve book data from google books api
    async isbnData(isbn: number): Promise<any> {
        let bookURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
        let response = await fetch(bookURL);
        let data = await response.json();
        if (data.totalItems === 0) {
            throw new Error('No book found with that ISBN');
        }
        else data = data.items[0].volumeInfo;
        return data;
    }

    //checkout book from the library via transaction
    async checkoutItemTransaction(itemID: number, userID: number, empID: number): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            await queryRunner.query(`INSERT INTO Borrows (lib_ID, item_id,checkout_emp_id,date_checkout) VALUES (${userID}, ${itemID}, ${empID},CURDATE())`,);
            await queryRunner.query(`UPDATE MediaItems SET is_available = FALSE WHERE item_id = ${itemID}`);
            await queryRunner.commitTransaction();
            return 1;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return 0;
        }
        finally {
            await queryRunner.release();
        }
    }

    //return book to the library via transaction
    async returnItemTransaction(itemID: number): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            await queryRunner.query(`DELETE FROM Borrows WHERE item_id = ${itemID}`);
            await queryRunner.query(`UPDATE MediaItems SET is_available = TRUE WHERE item_id = ${itemID}`);
            await queryRunner.commitTransaction();
            return 1;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return 0;
        }
        finally {
            await queryRunner.release();
        }
    }

    async addMediaTransaction(table: string, mediaData:any): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.startTransaction();
        try {
            await queryRunner.query(`INSERT INTO MediaItems (title, publish_year, genre) VALUES ('${mediaData.title}', ${mediaData.year}, '${mediaData.genre}')`);

            const itemID = await queryRunner.query(`SELECT item_id FROM MediaItems WHERE title = '${mediaData.title}' AND publish_year = ${mediaData.year} AND genre = '${mediaData.genre}'`);
            if(table === 'CDs') {
                await queryRunner.query(`INSERT INTO CDs (item_id, artist, duration_minutes) VALUES (${itemID[0].item_id},'${mediaData.artist}', '${mediaData.runtime}')`);
            }
            else if(table === 'Videos') {
                await queryRunner.query(`INSERT INTO Videos (item_id, director, duration_minutes) VALUES (${itemID[0].item_id},'${mediaData.artist}', '${mediaData.runtime}')`);
            }
            await queryRunner.commitTransaction();
            return 1;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return 0;
        }
        finally {
            await queryRunner.release();
        }
    }

    async getAllDevices(): Promise<any> {
        try {
            let response = await this.dataSource.query(`SELECT * FROM Devices`);
            return response;
        }
        catch (error) {
            throw new Error('Error querying the database: ' + error);
        }
    }

    async updateDeviceStatus(deviceID: number, status: string): Promise<any> {
        try {
            await this.dataSource.query(`UPDATE Devices SET status = '${status}' WHERE device_id = ${deviceID}`);
            return 1;
        }
        catch (error) {
            return 0;
        }
    }

    async addDevice(deviceData: { device_name: string, device_type: string, location: string, purchase_date: string, last_service_date: string }): Promise<any> {
        console.log(deviceData.device_name);
        try {
            await this.dataSource.query(`INSERT INTO Devices (device_name, device_type, location, purchase_date, last_service_date) VALUES ('${deviceData.device_name}', '${deviceData.device_type}', '${deviceData.location}', '${deviceData.purchase_date}', '${deviceData.last_service_date}')`);
            return 1;
        }
        catch (error) {
            throw new Error('Error querying the database: ' + error);
        }
    }

    
    async deleteDevice(deviceID: number): Promise<any> {
        try {
            await this.dataSource.query(`DELETE FROM Devices WHERE device_id = ${deviceID}`);
            return 1;
        }
        catch (error) {
            return 0;
        }
    }

async addMember(memberData: { Fname: string, Lname: string, MI: string, email: string, Phone: string, street: string, town: string, zip: string }): Promise<any> {
    try {
        const result = await this.dataSource.query('SELECT MAX(lib_ID) as maxLibID FROM Members');
        const lib_ID = result[0].maxLibID + 1;
        await this.dataSource.query(`INSERT INTO Members (lib_ID, Fname, Lname, MI, Phone, email, street, town, zip) VALUES (${lib_ID}, '${memberData.Fname}', '${memberData.Lname}', '${memberData.MI}', '${memberData.Phone}', '${memberData.email}', '${memberData.street}', '${memberData.town}', '${memberData.zip}')`);
        return 1;
    }
    catch (error) {
        return 0;
    }
}

async deleteMember(lib_ID: number): Promise<any> {
    try {
        await this.dataSource.query(`DELETE FROM Members WHERE lib_ID = ${lib_ID}`);
        return 1;
    }
    catch (error) {
        return 0;
    }
}

async deleteEmployee(emp_ID: number): Promise<any> {
    try {
        await this.dataSource.query(`DELETE FROM Employees WHERE emp_id = ${emp_ID}`);
        return 1;
    }
    catch (error) {
        return 0;
    }
}

async addEmployee(employeeData: { Fname: string, Lname: string, Phone: string, street: string, town: string, zip: string,salary: number }): Promise<any> {
    try {
        await this.dataSource.query(`INSERT INTO Employees (Fname, Lname, phone, street, town, zip,salary) VALUES ( '${employeeData.Fname}', '${employeeData.Lname}', '${employeeData.Phone}', '${employeeData.street}', '${employeeData.town}', '${employeeData.zip}',${employeeData.salary})`);
        return 1;
    }
    catch (error) {
        return 0;
    }
}

async getAllMembers(): Promise<any> {
    try {
        let response = await this.dataSource.query(`SELECT * FROM Members`);
        return response;
    }
    catch (error) {
        throw new Error('Error querying the database: ' + error);
    }
}

async getAllEmployees(): Promise<any> {
    try {
        let response = await this.dataSource.query(`SELECT * FROM Employees`);
        return response;
    }
    catch (error) {
        throw new Error('Error querying the database: ' + error);
    }
}
}