import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { LinkCreated, LinkRedeemed } from "../generated/LinkToLambo/LinkToLambo"

export function createLinkCreatedEvent(
  creator: Address,
  hashedPassword: Bytes,
  tokenAddress: Address,
  tokenAmount: BigInt
): LinkCreated {
  let linkCreatedEvent = changetype<LinkCreated>(newMockEvent())

  linkCreatedEvent.parameters = new Array()

  linkCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  linkCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "hashedPassword",
      ethereum.Value.fromFixedBytes(hashedPassword)
    )
  )
  linkCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  linkCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAmount",
      ethereum.Value.fromUnsignedBigInt(tokenAmount)
    )
  )

  return linkCreatedEvent
}

export function createLinkRedeemedEvent(
  redeemer: Address,
  hashedPassword: Bytes,
  password: string,
  tokenAddress: Address,
  tokenAmount: BigInt
): LinkRedeemed {
  let linkRedeemedEvent = changetype<LinkRedeemed>(newMockEvent())

  linkRedeemedEvent.parameters = new Array()

  linkRedeemedEvent.parameters.push(
    new ethereum.EventParam("redeemer", ethereum.Value.fromAddress(redeemer))
  )
  linkRedeemedEvent.parameters.push(
    new ethereum.EventParam(
      "hashedPassword",
      ethereum.Value.fromFixedBytes(hashedPassword)
    )
  )
  linkRedeemedEvent.parameters.push(
    new ethereum.EventParam("password", ethereum.Value.fromString(password))
  )
  linkRedeemedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  linkRedeemedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAmount",
      ethereum.Value.fromUnsignedBigInt(tokenAmount)
    )
  )

  return linkRedeemedEvent
}
