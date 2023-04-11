import ElectronStore from 'electron-store'

export const defaultState: Record<string, any> = {
	user: null,
	clipboard: []
}

export type Key = keyof typeof defaultState

export const store = new ElectronStore({
	defaults: defaultState
})
