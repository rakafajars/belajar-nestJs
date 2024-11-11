// Import modul-modul yang diperlukan
import { NestFactory } from '@nestjs/core'; // Core framework Nest.js
import { AppModule } from './app.module'; // Root module aplikasi
import * as cookieParser from 'cookie-parser'; // Middleware untuk menangani cookies
import * as mustache from 'mustache-express'; // Template engine untuk view
import { NestExpressApplication } from '@nestjs/platform-express'; // Tipe aplikasi Express
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
// import { ValidationFilter } from './validation/validation.filter';

// Function utama untuk menjalankan aplikasi (async karena menggunakan await)
async function bootstrap() {
  // Membuat instance aplikasi Nest.js dengan tipe Express
  // Generic type <NestExpressApplication> diperlukan untuk mengakses fitur Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  // Menggunakan middleware cookie-parser dengan secret key 'RAHASIA'
  // Secret key ini digunakan untuk menandatangani cookies
  app.use(cookieParser('RAHASIA'));

  // Konfigurasi view engine (Mustache)
  // Menentukan lokasi folder views (templates)
  app.set('views', __dirname + '/../views');

  // Menentukan ekstensi file template yang akan digunakan (.html)
  app.set('view engine', 'html');

  // Mendaftarkan Mustache sebagai engine untuk file .html
  app.engine('html', mustache());

  const configService = app.get(ConfigService);

  // Menjalankan server pada port yang ditentukan
  // Menggunakan nullish coalescing operator (??) untuk default port 3000
  // Jika process.env.PORT tidak ada, akan menggunakan 3000
  await app.listen(configService.get('PORT'));
  // app.useGlobalFilters(new ValidationFilter());
}

// Memanggil function bootstrap untuk memulai aplikasi
bootstrap();
