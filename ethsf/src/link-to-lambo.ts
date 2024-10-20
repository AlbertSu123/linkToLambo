import {
  LinkCreated as LinkCreatedEvent,
  LinkRedeemed as LinkRedeemedEvent
} from "../generated/LinkToLambo/LinkToLambo"
import { LinkCreated, LinkRedeemed } from "../generated/schema"

export function handleLinkCreated(event: LinkCreatedEvent): void {
  let entity = new LinkCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.hashedPassword = event.params.hashedPassword
  entity.tokenAddress = event.params.tokenAddress
  entity.tokenAmount = event.params.tokenAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLinkRedeemed(event: LinkRedeemedEvent): void {
  let entity = new LinkRedeemed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.redeemer = event.params.redeemer
  entity.hashedPassword = event.params.hashedPassword
  entity.password = event.params.password
  entity.tokenAddress = event.params.tokenAddress
  entity.tokenAmount = event.params.tokenAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
