import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { AddToQueueDto } from './dto/add-to-queue.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('queue')
@UseGuards(JwtAuthGuard)
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add')
  addToQueue(@Body() addToQueueDto: AddToQueueDto) {
    return this.queueService.addToQueue(addToQueueDto);
  }

  @Post('add-walk-in')
  addWalkInToQueue(@Body() patientData: any) {
    return this.queueService.addWalkInToQueue(patientData);
  }

  @Get()
  getCurrentQueue() {
    return this.queueService.getCurrentQueue();
  }

  @Get('all')
  getAllQueue() {
    return this.queueService.getAllQueue();
  }

  @Patch(':id/start')
  startTreatment(@Param('id') id: string) {
    return this.queueService.startTreatment(id);
  }

  @Patch(':id/complete')
  completePatient(@Param('id') id: string) {
    return this.queueService.completePatient(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queueService.remove(id);
  }
}
