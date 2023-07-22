import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsRepository } from './applications.repository';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ApplicationModel } from './application.model';

@Module({
  imports: [ObjectionModule.forFeature([ApplicationModel])],
  providers: [ApplicationsService, ApplicationsRepository],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
