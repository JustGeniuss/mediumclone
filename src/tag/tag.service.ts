import { Injectable } from "@nestjs/common";

@Injectable()
export class TagService {
    findAll(): String[] {
        return ['dragons', 'coffee', "weather"]
    }
}