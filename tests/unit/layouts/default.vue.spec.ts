/* eslint-disable @typescript-eslint/no-explicit-any */
import {createNuxtTestWrapper} from '../setup/create-wrapper'
import DefaultLayout from '@/layouts/default.vue'
import {UpdateHeaderCtaOptions} from '@/models/view/UpdateHeaderCtaOptions'
import {eventAppBarOptions, defaultAppBarOptions, type AppBarOptions} from '@/models/view/AppBarOptions'
import {describe, it, expect, vi} from 'vitest'
import {config} from '@vue/test-utils'

import {
    SHOW_HEADER_FOR_PAGE,
    SHOW_HEADER,
    UPDATE_HEADER_CTA,
    UPDATE_APP_BAR_OPTIONS
} from '~/core/constants/message-bus.constants'
import {
    OMNITURE_SET_DEV_SCRIPT,
    OMNITURE_VARS_SCRIPT
} from '@/core/constants/script-paths'
import {createHead} from "@unhead/vue";
import path from "path";
import {getActiveHead} from "unhead";


const stubbedComponents = ['nuxt', 'router-link']


describe('default', () => {
    describe('beforeMount', () => {
        it(`listens to ${UPDATE_HEADER_CTA} events`, async () => {
            const text = 'yomommas text'
            const href = 'yomommas href'
            const expectedCtaOptions = new UpdateHeaderCtaOptions(text, href)

            const wrapper = createNuxtTestWrapper(DefaultLayout, {

                stubs: stubbedComponents
            })

            // Act
            wrapper.vm.$bus.$emit(UPDATE_HEADER_CTA, expectedCtaOptions)

            // Assert
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.$data.headerButtonOptions).toEqual(expectedCtaOptions)
        })
        it(`listens to ${SHOW_HEADER_FOR_PAGE} events`, async () => {
            const expectedShowHeader = true

            const wrapper = createNuxtTestWrapper(DefaultLayout, {

                stubs: stubbedComponents
            })

            // Act
            wrapper.vm.$bus.$emit(SHOW_HEADER_FOR_PAGE, expectedShowHeader)

            // Assert
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.$data.toggleHeader).toEqual(expectedShowHeader)
            expect(wrapper.vm.$data.showHeaderForPage).toEqual(expectedShowHeader)
        })
        it(`listens to ${SHOW_HEADER} events`, async () => {
            const expectedToggleHeader = true

            const wrapper = createNuxtTestWrapper(DefaultLayout, {
                stubs: stubbedComponents
            })

            // Act
            wrapper.vm.$bus.$emit(SHOW_HEADER, expectedToggleHeader)

            // Assert
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.$data.toggleHeader).toEqual(expectedToggleHeader)
        })
        it(`listens to ${UPDATE_APP_BAR_OPTIONS} events`, async () => {
            const expectedOptions = eventAppBarOptions

            const wrapper = createNuxtTestWrapper(DefaultLayout, {
                stubs: stubbedComponents
            })

            // Act
            wrapper.vm.$bus.$emit(UPDATE_APP_BAR_OPTIONS, expectedOptions)

            // Assert
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.$data.appBarOptions).toEqual(expectedOptions)
        })
    })
    describe('beforeUnmount', () => {
        it(`removes the toggleHeader, showHeaderForPage, updateAppBarOptions listener`, async () => {
            const mockOnToggleHeader = vi.fn()
            const mockOnShowHeaderForPage = vi.fn()
            const mockUpdateHeaderCta = vi.fn()
            const mockUpdateAppBarOptions = vi.fn()

            const wrapper = createNuxtTestWrapper(DefaultLayout, {
                methods: {
                    onToggleHeader: mockOnToggleHeader,
                    onShowHeaderForPage: mockOnShowHeaderForPage,
                    onUpdateHeaderCta: mockUpdateHeaderCta,
                    updateAppBarOptions: mockUpdateAppBarOptions
                },
                stubs: stubbedComponents
            })
            wrapper.unmount();

            // Act
            wrapper.vm.$bus.$emit(SHOW_HEADER)
            wrapper.vm.$bus.$emit(SHOW_HEADER_FOR_PAGE)
            wrapper.vm.$bus.$emit(UPDATE_HEADER_CTA)
            wrapper.vm.$bus.$emit(UPDATE_APP_BAR_OPTIONS)

            // Assert
            await wrapper.vm.$nextTick()
            expect(mockOnToggleHeader).not.toHaveBeenCalled()
            expect(mockOnShowHeaderForPage).not.toHaveBeenCalled()
            expect(mockUpdateHeaderCta).not.toHaveBeenCalled()
            expect(mockUpdateAppBarOptions).not.toHaveBeenCalled()
        })
    })
    describe('computed', () => {
        describe('appContentStyle', () => {
            describe('showHeaderForPage = false', () => {
                const expectedResult = {'padding-top': 0}
                it('returns style with no top padding', () => {
                    const wrapper = createNuxtTestWrapper(DefaultLayout, {
                        data() {
                            return {showHeaderForPage: false}
                        },
                        stubs: stubbedComponents
                    }) as any

                    // Act
                    const actualResult = wrapper.vm.appContentStyle

                    // Assert
                    expect(actualResult).toEqual(expectedResult)
                })
            })
            describe('showHeaderForPage = true', () => {
                const expectedResult = {}
                it('returns no style', () => {
                    const wrapper = createNuxtTestWrapper(DefaultLayout, {
                        data(vm) {
                            return {showHeaderForPage: true}
                        },
                        stubs: stubbedComponents,
                    }) as any

                    // Act
                    const actualResult = wrapper.vm.appContentStyle

                    // Assert
                    expect(actualResult).toEqual(expectedResult)
                })
            })
        })
    })
    describe('methods', () => {
        describe('toggleDrawer', () => {
            describe('showDrawer = true', () => {
                it('showDrawer set to false', () => {
                    const wrapper = createNuxtTestWrapper(DefaultLayout, {
                        data() {
                            return {showDrawer: true}
                        },
                        stubs: stubbedComponents
                    }) as any

                    // Act
                    wrapper.vm.toggleDrawer()

                    // Assert
                    expect(wrapper.vm.showDrawer).toBeFalsy()
                })
            })
            describe('showDrawer = false', () => {
                it('showDrawer set to true', () => {
                    const wrapper = createNuxtTestWrapper(DefaultLayout, {
                        data() {
                            return {
                                showDrawer: false
                            }
                        },
                        stubs: stubbedComponents
                    }) as any

                    // Act
                    wrapper.vm.toggleDrawer()

                    // Assert
                    expect(wrapper.vm.showDrawer).toBeTruthy()
                })
            })
        })
    })
    describe('head', () => {
        it(`adds the canonical tag for the page`, async () => {
            const path = '/some-path'
            const baseUrl = 'https://www.devint.medscapelive.com'
            const expectedLinks = [{rel: 'canonical', href: baseUrl + path}]

            const self = {
              $route: {path},
              $config: {
                    public: {
                        WEB_BASE_URL: baseUrl
                    }
                }
            }

            const mockHead = createHead({})
            mockHead.push({
                link: expectedLinks,
            })

            const wrapper = createNuxtTestWrapper(DefaultLayout, {
                $config: self.$config,
                $route: self.$route,
                head: mockHead
            })

            const head = getActiveHead();

            // Assert
            expect(await head!.resolveTags()).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        tag: 'link',
                        props: { rel: 'canonical', href: baseUrl + path }
                    })
                ])
            )
        })
        describe('scripts', () => {
            describe('dev environment', () => {
                it(`adds the trust arc script and the omniture scripts, include set dev environment`, async () => {
                    const omnitureScript = '/some-path'
                    const expectedScripts = [
                        {src: OMNITURE_VARS_SCRIPT},
                        {src: OMNITURE_SET_DEV_SCRIPT},
                        {src: omnitureScript, async: true}
                    ]
                    const self = {
                        $config: {
                            OMNITURE_SCRIPT: omnitureScript,
                            MEDSCAPE_ENV: 'dev'
                        }
                    }

                    const mockHead = createHead()

                    mockHead.push({
                        script: expectedScripts,
                    })

                    const wrapper = createNuxtTestWrapper(DefaultLayout, {
                        $config: self.$config,
                        head: mockHead
                    })

                    const head = getActiveHead();

                    const resolvedTags = await head!.resolveTags()
                    expectedScripts.forEach(script => {
                        expect(resolvedTags).toContainEqual(
                            expect.objectContaining({
                                tag: 'script',
                                props: expect.objectContaining(script)
                            })
                        )
                    })
                })
            })
            describe('production environment', () => {
                it(`adds the trust arc script and the omniture scripts, without set dev environment`, async () => {
                    const omnitureScript = 'path/to/omniture'
                    const expectedScripts = [
                        {src: OMNITURE_VARS_SCRIPT},
                        {},
                        {src: omnitureScript, async: true}
                    ]
                    const self = {
                        $config: {
                            OMNITURE_SCRIPT: omnitureScript,
                            MEDSCAPE_ENV: 'production'
                        }
                    }

                    const mockHead = createHead()

                    mockHead.push({
                        script: expectedScripts,
                    })

                    const wrapper = createNuxtTestWrapper(DefaultLayout, {
                        $config: self.$config,
                        head: mockHead
                    })

                    const head = getActiveHead();

                    const resolvedTags = await head!.resolveTags()

                    expectedScripts.forEach(script => {
                        expect(resolvedTags).toContainEqual(
                            expect.objectContaining({
                                tag: 'script',
                                props: expect.objectContaining(script)
                            })
                        )
                    })
                    // const omnitureScript = 'path/to/omniture'
                    // const expectedScripts = [
                    //     {src: OMNITURE_VARS_SCRIPT},
                    //     {src: ''},
                    //     {src: omnitureScript, async: true}
                    // ]
                    // const self = {
                    //     $config: {
                    //         OMNITURE_SCRIPT: omnitureScript,
                    //         MEDSCAPE_ENV: 'dev'
                    //     }
                    // }
                    //
                    // const mockHead = createHead()
                    //
                    // mockHead.push({
                    //     script: expectedScripts,
                    // })
                    //
                    // const wrapper = createNuxtTestWrapper(DefaultLayout, {
                    //     $config: self.$config,
                    //     head: mockHead
                    // })
                    //
                    // // Assert
                    // const head = getActiveHead();
                    //
                    // const resolvedTags = await head!.resolveTags()
                    //
                    // expectedScripts.forEach(script => {
                    //     expect(resolvedTags).toContainEqual(
                    //         expect.objectContaining({
                    //             tag: 'script',
                    //             props: expect.objectContaining(script)
                    //         })
                    //     )
                    // })
                })
            })
        })
    })
})
