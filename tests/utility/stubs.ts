import {pascalCase} from "scule";

export function stub(
    tag: string,
    opts ? : {
        [key: string]: any
    },
    template ? : string,
): ComponentPublicInstance < any > {
    const contents = template || `Stubbed ${tag}`;
    return {
        name: pascalCase(tag),
        template: `<div class="${tag}-stub">${contents}</div>`,
        ...(opts || {}),
    };
}

export const sharedStubs = {
    vDialog: stub(
        'v-dialog', {
            props: ['modelValue'],
        },
        '<slot />',
    ),
    // vBtn: stub('v-btn', {}, '<slot />',)
}
