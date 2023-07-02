import { assert } from "@open-wc/testing"
import { meta, metaCleanup } from "../test_helpers"

import { Current, config } from "../../"

describe("Current.js", () => {
  afterEach(() => {
    metaCleanup()
    config.prefix = "current"
  })

  context("undefined", () => {
    it("should return nothing for tags that dont exist", () => {
      assert.deepEqual(Current.something, {})
      assert.deepEqual(Current.something.else, undefined)
      assert.deepEqual(Current.something.other, undefined)

      assert.deepEqual(Current.another, {})
      assert.deepEqual(Current.another.thing, undefined)
      assert.deepEqual(Current.another.one, undefined)
    })

    it("should not return anything for irrelevant meta tags", async () => {
      await meta(`
        <meta name="name" content="Name"/>
        <meta name="some-name" content="Some Name"/>
        <meta name="name-some" content="Name Some"/>
      `)

      assert.deepEqual(Current.name, {})
    })
  })

  context("string", () => {
    it("should get meta tag with no content attribute", async () => {
      await meta(`<meta name="current-name" />`)

      assert.equal(Current.name, "")
    })

    it("should get meta tag with no content attribute value", async () => {
      await meta(`<meta name="current-name" content />`)

      assert.equal(Current.name, "")
    })

    it("should get empty string", async () => {
      await meta(`<meta name="current-name" content="" />`)

      assert.equal(Current.name, "")
    })

    it("should get string", async () => {
      await meta(`<meta name="current-name" content="Current Name" />`)

      assert.equal(Current.name, "Current Name")
    })

    it("should only respect first value", async () => {
      await meta(`<meta name="current-name" content="Current Name One" />`)
      await meta(`<meta name="current-name" content="Current Name Two" />`)

      assert.equal(Current.name, "Current Name One")
    })

    it("should camelize long names", async () => {
      await meta(`<meta name="current-user-first-name" content="Current First Name" />`)
      await meta(`<meta name="current-user-last-name" content="Current Last Name" />`)
      await meta(
        `<meta name="current-user-some-really-long-dasherized-name" content="Current Some Really Long Dasherized Name" />`
      )

      assert.equal(Current.user.firstName, "Current First Name")
      assert.equal(Current.user.lastName, "Current Last Name")
      assert.equal(Current.user.someReallyLongDasherizedName, "Current Some Really Long Dasherized Name")
    })

    it("should handle camelized names", async () => {
      await meta(`<meta name="current-author-firstName" content="Current First Name" />`)
      await meta(`<meta name="current-author-lastName" content="Current Last Name" />`)
      await meta(
        `<meta name="current-author-someReallyLongDasherizedName" content="Current Some Really Long Dasherized Name" />`
      )

      assert.equal(Current.author.firstName, "Current First Name")
      assert.equal(Current.author.lastName, "Current Last Name")
      assert.equal(Current.author.someReallyLongDasherizedName, "Current Some Really Long Dasherized Name")
    })
  })

  context("object", () => {
    it("should construct object", async () => {
      await meta(`
        <meta name="current-user-id" content="Current ID"/>
        <meta name="current-user-name" content="Current Name"/>
        <meta name="current-user-email" content="Current Email"/>
      `)

      assert.equal(Current.user.id, "Current ID")
      assert.equal(Current.user.name, "Current Name")
      assert.equal(Current.user.email, "Current Email")
    })

    it("should construct object and only respect first value", async () => {
      await meta(`
        <meta name="current-user-id" content="Current ID One"/>
        <meta name="current-user-id" content="Current ID Two" />
        <meta name="current-user-name" content="Current Name One" />
        <meta name="current-user-name" content="Current Name Two" />
        <meta name="current-user-email" content="Current Email One" />
        <meta name="current-user-email" content="Current Email Two" />
      `)

      assert.equal(Current.user.id, "Current ID One")
      assert.equal(Current.user.name, "Current Name One")
      assert.equal(Current.user.email, "Current Email One")
    })

    it("should ignore irrelevant tags", async () => {
      await meta(`
        <meta name="current-user-id" content="Current ID"/>
        <meta name="current-user-name" content="Current Name"/>
        <meta name="current-user-email" content="Current Email"/>
        <meta name="current-post-id" content="Post ID"/>
        <meta name="current-page-id" content="Page ID"/>
      `)

      assert.equal(Current.user.id, "Current ID")
      assert.equal(Current.user.name, "Current Name")
      assert.equal(Current.user.email, "Current Email")
    })
  })

  context("with custom prefix", () => {
    it("should handle custom prefix", async () => {
      await meta(`<meta name="current-environment" content="development">`)
      await meta(`<meta name="config-environment" content="production">`)

      assert.equal(Current.environment, "development")
      config.prefix = "config"
      assert.equal(Current.environment, "production")
    })
  })
})
