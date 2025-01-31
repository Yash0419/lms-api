import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaClient) {}
  
 async create(createBookDto: CreateBookDto) {
  await this.checkTfISBNExists(createBookDto.isbn);
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    return this.getBook(id);
  }

 async update(id: number, updateBookDto: UpdateBookDto) {
  const user = await this.getBook(id);

  if (updateBookDto.isbn) {
    await this.checkTfISBNExists(updateBookDto.isbn, id);
  }
  return this.prisma.book.update({ where:{ id },data: updateBookDto});
  }

 async remove(id: number) {
  await this.getBook(id);
  return this.prisma.book.delete({ where: { id }});
  }

   private async checkTfISBNExists(isbn:number,id?:number){
    const doesISBNExist = await this.prisma.book.findFirst({
      where: { isbn},
    });
    if (doesISBNExist) {
      if (id && doesISBNExist.id!== id){
        throw new BadRequestException(`Book with ${isbn} already exists`);
      }
      else if (!id) {
        throw new BadRequestException(`Book with ${isbn} already exists`);
      }
    }
   }
   private async getBook(id: number){
    const book = await this.prisma.book.findFirst({ where: { id }});

    if (!book) {
      throw new BadRequestException(`Book not found`);
    }
    return book;
   }

}
