import { Test, TestingModule } from '@nestjs/testing';
import { Contract, ethers } from 'ethers';
import { NftsRepository } from './nfts.repository';
import { NftsService } from './nfts.service';

describe('NftsService', () => {
  let service: NftsService;
  let fakeNftsRepo: Partial<NftsRepository>;
  interface Token {
    collection: string;
    tokenId: string;
  }

  beforeEach(async () => {
    // Create a fake copy of the users service
    fakeNftsRepo = {
      GetContract: (network: string, rw: boolean) =>
        Promise.resolve({
          isAuthenticated: (token: Token) => Promise.resolve(false),
        } as unknown as Contract),
    };

    const module = await Test.createTestingModule({
      providers: [
        NftsService,
        {
          provide: NftsRepository,
          useValue: fakeNftsRepo,
        },
      ],
    }).compile();

    service = module.get(NftsService);
  });

  it('should always return true', async () => {
    const result = await service.getNftStatus('', '');
    expect(result).toEqual(true);
  });
});
