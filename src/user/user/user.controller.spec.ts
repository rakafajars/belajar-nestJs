import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      // imports: [],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('shoule can say hello', async () => {
    const response = await controller.sayHello('Raka');
    expect(response).toBe('hello Raka');
  });

  // it('should can say hello', async () => {
  //   const response = await controller.sayHello('Raka', 'Fajar');
  //   expect(response).toBe('Helo Raka Fajar');
  // });

  it('should can get view', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Raka', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Raka',
      title: 'raka Fajar',
    });
  });
});
