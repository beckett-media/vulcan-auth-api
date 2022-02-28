import { ethers } from 'ethers';
import { ApiProperty } from '@nestjs/swagger';
import { serviceConfig } from './nfts.service.config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class NftsRepository {
  async GetContract(network: string, rw: boolean) {
    const authABI = serviceConfig.authABI;
    const chain = serviceConfig.chainConfig['mumbai'];
    const provider = new ethers.providers.JsonRpcProvider(chain['url']);
    if (rw) {
      const wallet = new ethers.Wallet(chain['privateKey'], provider);
      var balance = await provider.getBalance(wallet.address);
      if (balance <= ethers.utils.parseEther('0.01')) {
        throw new InternalServerErrorException('Low balance');
      }
      return new ethers.Contract(chain['authContractAddress'], authABI, wallet);
    } else {
      return new ethers.Contract(
        chain['authContractAddress'],
        authABI,
        provider,
      );
    }
  }
}

export class NFT {
  @ApiProperty()
  contract: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  collection: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  minter: string;

  @ApiProperty()
  metadata_url: string;

  @ApiProperty()
  image_url: string;
}
