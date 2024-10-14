import { RootStoreState } from '~/store/root.state'

export const state = () => new RootStoreState()
export { actions } from '~/store/root.actions'
export { mutations } from '~/store/root.mutations'
export { getters } from '~/store/root.getters'
