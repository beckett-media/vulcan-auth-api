import { ethers } from 'ethers';
import { NftsRepository } from './nfts.repository';
import { serviceConfig } from './nfts.service.config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class NftsService {
  constructor(public NftsRepo: NftsRepository) {}

  async getNftStatus(contract: string, id: string) {
    const token = {
      collection: contract,
      tokenId: id,
    };
    try {
      const authContract = await this.NftsRepo.GetContract('mumbai', false);
      return authContract.isAuthenticated(token);
    } catch (error) {
      throw new InternalServerErrorException(error.toString());
    }
  }

  listNfts() {
    return serviceConfig.nfts;
  }

  async authNft(contract: string, id: number) {
    const token = {
      collection: contract,
      tokenId: id,
    };
    try {
      const authContract = await this.NftsRepo.GetContract('mumbai', true);
      var auth_tx = await authContract.authenticateERC721Tokens([token]);
      var result = await auth_tx.wait();
    } catch (error) {
      throw new InternalServerErrorException(error.toString());
    }
  }

  async revokeNft(contract: string, id: number) {
    const token = {
      collection: contract,
      tokenId: id,
    };
    try {
      const authContract = await this.NftsRepo.GetContract('mumbai', true);
      var revoke_tx = await authContract.revokeAuthentication([token]);
      var result = await revoke_tx.wait();
    } catch (error) {
      throw new InternalServerErrorException(error.toString());
    }
  }
}
