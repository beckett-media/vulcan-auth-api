import { Test, TestingModule } from '@nestjs/testing';
import { NftsController } from './nfts.controller';
import { NftsRepository } from './nfts.repository';
import { NftsService } from './nfts.service';

describe('NftsController', () => {
  let controller: NftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftsController],
      providers: [NftsService, NftsRepository],
    }).compile();

    controller = module.get<NftsController>(NftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
