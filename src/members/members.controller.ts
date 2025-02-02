import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Request } from 'express';


interface MemberRequest extends Request{
  payload: {
    user_id: number;
  }
}

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}


  @Post()
  create(
     @Body() CreateMemberDto: CreateMemberDto, @Req() request:MemberRequest) {
      CreateMemberDto.user_id = request.payload.user_id;
    return this.membersService.create(CreateMemberDto);
  }
  

  @Get()
  findAll( @Req() request:MemberRequest,user_id:number) {
    return this.membersService.findAll(request.payload.user_id);
  }

  @Get(':id')
  findOne( @Req() request:MemberRequest,@Param('id') id: string) {
    return this.membersService.findOne(+id,request.payload.user_id);
  }

  @Patch(':id')
  update( @Req() request:MemberRequest,@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto,request.payload.user_id);
  }

  @Delete(':id')
  remove( @Req() request:MemberRequest,@Param('id') id: string) {
    return this.membersService.remove(+id,request.payload.user_id);
  }
}
