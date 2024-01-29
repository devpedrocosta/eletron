import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    cpf: string;
    @ApiProperty()
    password: string;
}
