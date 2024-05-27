import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'api/auth/auth.module';
import { CheckListModule } from 'api/checkList/checkList.module';
import { CheckList } from 'api/checkList/entities/checkList.entity';
import { User } from 'api/user/entities/user.entity';
import { UserModule } from 'api/user/user.module';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/graphql.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule.forRoot(),
    UserModule,
    CheckListModule,
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [User, CheckList],
      logging: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
