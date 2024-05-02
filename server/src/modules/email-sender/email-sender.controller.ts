import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { Request, Response } from 'express';
import { SendEmailDto } from './email.interface';

@Controller('api/email-sender')
export class EmailSenderController {
  constructor(private readonly emailService: EmailSenderService) {}

  @Get('create-token')
  async createToken(@Req() req: Request, @Res() res: Response) {
    const { email } = req.body;
    const token = await this.emailService.generatePasswordResetToken();
    const userName = await this.emailService.findUserByEmail(email);

    return res.status(HttpStatus.OK).json({
      message: 'Token Successfully Created !',
      token: token,
      username: userName.name,
    });
  }

  @Post('reset-password')
  async resetPassword(@Body() emailDto: SendEmailDto, @Res() res: Response) {
    const userExist = await this.emailService.findUserByEmail(emailDto.to);

    if (!userExist) {
      throw new NotFoundException('Wrong Email !');
    }

    const dto: SendEmailDto = {
      from: { name: 'Steelify', address: 'info@steelify.io' },
      to: emailDto.to,
      subject: emailDto.subject,
      html: emailDto.html,
      text: emailDto.text,
    };

    const result = await this.emailService.sendEmail(dto);

    return res.status(HttpStatus.CREATED).json({
      message: 'Mail Successfully Send !',
      data: result,
    });
  }

  @Put('newPasswd')
  async resPasswd(@Req() req: Request, @Res() res: Response) {
    const { email, newPassword, confirmNewPassword } = req.body;

    const newPasswd = await this.emailService.resPasswd(
      newPassword,
      confirmNewPassword,
      email,
    );

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Password Successfully Updated !', data: newPasswd });
  }
}
