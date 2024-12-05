import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
    constructor(private databaseService: DatabaseService) {}

    @Get('inventory/search')
    async searchInventory(@Query('searchTerm') searchTerm: string, @Query('table') table: string) {
        return await this.databaseService.searchInventory(searchTerm, table);
    }

     @Post('books/add')
    async addBook(@Body() body) {
        const bookData = await this.databaseService.isbnData(body.isbn);
        return await this.databaseService.addBookTransaction(bookData);
    }

    @Post('media/add')
    async addMedia(@Body() body) {
        return await this.databaseService.addMediaTransaction(body.table, body.mediaData);
    }

    @Post('media/delete')
    async deleteBook(@Body() body) {
        return await this.databaseService.deleteItemTransaction(body.itemID, body.table);
    }

    @Post('/checkout')
    async checkoutBook(@Body() body) {
        return await this.databaseService.checkoutItemTransaction(body.itemid, body.memid,body.empid);
    }

    @Post('/return')
    async returnBook(@Body() body) {
        return await this.databaseService.returnItemTransaction(body.itemid);
    }

    @Get('devices')
    async getDevices() {
        return await this.databaseService.getAllDevices();
    }

    @Post('devices/status')
    async updateDeviceStatus(@Body() body) {
        return await this.databaseService.updateDeviceStatus(body.device_id, body.status);
    }

    @Post('devices/add')
    async addDevice(@Body() body) {
        return await this.databaseService.addDevice(body.deviceData);
    }

    @Get('devices/delete/:device_id')
    async getDevice(@Param('device_id') device_id: number) {
        return await this.databaseService.deleteDevice(device_id);
    }

    @Post('members/add')
    async addMember(@Body() body) {
        return await this.databaseService.addMember(body.memberData);
    }

    @Get('members/delete/:member_id')
    async deleteMember(@Param('member_id') member_id: number) {
        return await this.databaseService.deleteMember(member_id);
    }

    @Get('employees/delete/:employee_id')
    async deleteEmployee(@Param('employee_id') employee_id: number) {
        return await this.databaseService.deleteEmployee(employee_id);
    }

    @Post('employees/add')
    async addEmployee(@Body() body) {
        return await this.databaseService.addEmployee(body.employeeData);
    }

    @Get('members')
    async getMembers() {
        return await this.databaseService.getAllMembers();
    }

    @Get('employees')
    async getEmployees() {
        return await this.databaseService.getAllEmployees();
    }
    
}


