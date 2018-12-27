import { Get, Controller } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ConfigService } from './config';

@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @ApiOperation({ title: 'Welcome' })
  @Get()
  root(): string {
    return `<h3>Welcome to Game API</h3>
            <br/>Checkout <a href="docs">API Docs</a>
            <br/><code>Version: ${this.config.getVersion()}</code>`;
  }
}
