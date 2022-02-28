import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { AuthNftDto } from './dtos/auth-nft.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { NFT } from './nfts.repository';

@ApiTags('NFT')
@Controller('nfts')
export class NftsController {
  constructor(public nftsService: NftsService) {}

  @Get()
  @ApiOperation({
    summary:
      'Return a pre-defined list of NFTs (for demostration purpose only) ',
  })
  @ApiResponse({
    status: 200,
    type: NFT,
    description: 'Return a pre-defined list of NFTs',
  })
  listNfts() {
    return this.nftsService.listNfts();
  }

  @Get('/:contract')
  @ApiOperation({
    summary: 'Query authenticity status for a single NFT ',
  })
  @ApiResponse({
    status: 200,
    type: Boolean,
    description: 'Return NFTs on-chain authenticity',
  })
  @ApiResponse({
    status: 500,
    description: 'Blockchain operation/connection failure',
  })
  @ApiProduces('text/plain')
  getNftStatus(@Param('contract') contract: string, @Query('id') id: string) {
    return this.nftsService.getNftStatus(contract, id);
  }

  @Post()
  @ApiOperation({
    summary: 'Authenticate a single NFT',
  })
  @ApiResponse({
    status: 201,
    description: 'The NFT has been successfully authenticated.',
  })
  @ApiResponse({
    status: 500,
    description: 'Blockchain operation/connection failure',
  })
  @ApiProduces('text/plain')
  authNft(@Body() body: AuthNftDto) {
    return this.nftsService.authNft(body.collection, body.id);
  }

  @Delete()
  @ApiOperation({
    summary: 'Revoke authenticity of a single NFT',
  })
  @ApiResponse({
    status: 200,
    description: 'The NFTs authenticity has been successfully revoked.',
  })
  @ApiResponse({
    status: 500,
    description: 'Blockchain operation/connection failure',
  })
  @ApiProduces('text/plain')
  revokeNft(@Body() body: AuthNftDto) {
    return this.nftsService.revokeNft(body.collection, body.id);
  }
}
