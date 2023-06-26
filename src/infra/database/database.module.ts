import { NotificationsRepository } from '@application/repositories/notificationRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositores/prismaNotificationsRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
