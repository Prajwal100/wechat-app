import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { Session } from './utils/typeorm';
import { TypeormStore} from 'connect-typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const {PORT, COOKIE_SECRET}=process.env;
  const app = await NestFactory.create(AppModule);
  const sessionRepository=app.get(DataSource).getRepository(Session);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());
  app.use(session({
    secret:COOKIE_SECRET,
    saveUninitialized:false,
    resave:false,
    cookie:{
      maxAge:86400000 // expires time 1 day;
    },
    store:new TypeormStore().connect(sessionRepository)
  }))

  app.use(passport.initialize());
  app.use(passport.session());
  
  try{
    await app.listen(PORT,()=>console.log(`Server running at ${PORT}`));
  }
  catch(e){
    console.log(e);
  }
}
bootstrap();
