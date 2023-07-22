import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserModel } from './user.model';
import { ObjectionModule } from '@willsoto/nestjs-objection';

@Module({
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [ObjectionModule.forFeature([UserModel])],
})
export class UsersModule {}
