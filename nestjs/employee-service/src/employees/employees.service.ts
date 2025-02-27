import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
    public greeting(): string {
        const message:string = 'Hello World! form Employee Service';
        return message;
    }
}
