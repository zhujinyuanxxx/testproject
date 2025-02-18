import { create } from 'zustand'

interface ScreenElementState {
    url: string
    changeUrl: (newVideoUrl: string) => void
    width: number
    changeWidth: (newWidth:number) => void
    height: number
    changeHeight: (newHeight:number) => void
}

const ScreenElementStore = create<ScreenElementState>()((set) => ({
    url: 'origin',
    changeUrl: (newVideoUrl) => set((state) => ({ url: newVideoUrl })),
    width: 0,
    changeWidth: (newWidth:number) => set(state => ({ width: newWidth })),
    height: 0,
    changeHeight: (newHeight:number) => set(state => ({ height: newHeight })),
}))

export default  ScreenElementStore;