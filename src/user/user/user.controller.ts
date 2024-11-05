import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Inject,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
// import { Response } from 'express';

@Controller('/api/users')
export class UserController {
  // constructor(
  //   private userService: UserService,
  //   private connection: Connection,
  //   private mailService: MailService,
  //   private userRepository: UserRepository,
  //   @Inject('EmailService') private emailService: MailService,
  // ) {}

  // Kode : Property-based Injection
  @Inject()
  private userService: UserService;
  @Inject()
  private connection: Connection;
  @Inject()
  private mailService: MailService;
  @Inject()
  private userRepository: UserRepository;
  @Inject('EmailService')
  private emailService: MailService;

  @Get('/connection')
  async getConnection(): Promise<string> {
    // return this.service.sayHello(name);
    this.userRepository.save();
    this.mailService.send();
    this.emailService.send();
    return this.connection.getName();
  }

  // belajar provider kode ini
  @Get('/hello')
  async sayHello(@Query('name') name: string): Promise<string> {
    // return this.service.sayHello(name);
    return this.userService.sayHello(name);
  }

  @Post()
  post(): string {
    return 'Post';
  }

  @Get('/sample')
  get(): string {
    return 'Helo Raka';
  }

  //   @Get('/:id')
  //   getById(@Param('id') id: string): string {
  //     return `Ge aast ${id}`;
  //   }
  // @Get('/hello')
  // async sayHello(
  //   @Query('firstName') firstName: string,
  //   @Query('lastName') lastName: string,
  // ): Promise<string> {
  //   return `Helo ${firstName || 'Guest'} ${lastName || 'Star'}`;
  // }

  //   TIDAK DISARANKAN MENGGUNAKAN INI
  //     @Get('/:id')
  //     getById(@Req() request: Request): string {
  //       return `Get ${request.params.id}`;
  //     }
  // ini menggunakan express response, harus ada import { Response } from 'express';
  //   @Get('/sample-response')
  //   sampleResponse(@Res() response: Response) {
  //     response.status(200).send({
  //       message: 'Success',
  //     });
  //   }
  //

  @Get('sample-response-nest')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponseNest(): Record<string, string> {
    return {
      data: 'Halo Raka',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response-nest',
      statusCode: 301,
    };
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success Set Cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', {
      title: 'raka Fajar',
      name: name,
    });
  }
}
