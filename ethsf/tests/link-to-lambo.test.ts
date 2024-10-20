import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { LinkCreated } from "../generated/schema"
import { LinkCreated as LinkCreatedEvent } from "../generated/LinkToLambo/LinkToLambo"
import { handleLinkCreated } from "../src/link-to-lambo"
import { createLinkCreatedEvent } from "./link-to-lambo-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let hashedPassword = Bytes.fromI32(1234567890)
    let tokenAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenAmount = BigInt.fromI32(234)
    let newLinkCreatedEvent = createLinkCreatedEvent(
      creator,
      hashedPassword,
      tokenAddress,
      tokenAmount
    )
    handleLinkCreated(newLinkCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LinkCreated created and stored", () => {
    assert.entityCount("LinkCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LinkCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LinkCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "hashedPassword",
      "1234567890"
    )
    assert.fieldEquals(
      "LinkCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LinkCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenAmount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
