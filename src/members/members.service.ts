import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private readonly prisma:PrismaClient){}
  async create(createMemberDto: CreateMemberDto) {
    return this.prisma.member.create({data: createMemberDto});
  }

  async findAll(user_id:number) {
    return this.prisma.member.findMany({
      where: {user_id}
    });
  }

  async findOne(id: number,user_id:number) {
    return this.getMember(id, user_id);
    
  }

  async update(id: number, updateMemberDto: UpdateMemberDto,user_id) {
    await this.getMember(id,user_id);
    return this.prisma.member.update({
     where:{id,user_id},
     data:updateMemberDto 
     } 
    )
  }

 async remove(id: number,user_id: number) {
  await this.getMember(id,user_id);
    return this.prisma.member.delete({where:{id,user_id}});
  }

  private async getMember(id:number, user_id: number){
    const member=await this.prisma.member.findFirst({where:{id,user_id}});
  
    if (!member){
      throw new NotFoundException('Member Not Found')
    }
    return member;
  }
}
