import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RecipeModule } from './recipes/recipes.module';
import { AWSModule } from './aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    RecipeModule,
    PrismaModule,
    AWSModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
