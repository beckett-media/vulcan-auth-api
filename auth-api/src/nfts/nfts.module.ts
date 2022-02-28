import { Module } from '@nestjs/common';
import { providers } from 'ethers';
import { NftsController } from './nfts.controller';
import { NftsService } from './nfts.service';
import { NftsRepository } from './nfts.repository';

@Module({
  controllers: [NftsController],
  providers: [NftsService, NftsRepository],
})
export class NftsModule {}
