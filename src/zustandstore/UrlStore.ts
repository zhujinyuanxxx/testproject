import { create } from 'zustand'

interface VideoUrlState {
    url: string
    changeUrl: (newVideoUrl: string) => void
}

const useVideoUrlStore = create<VideoUrlState>()((set) => ({
    url: 'origin',
    changeUrl: (newVideoUrl) => set((state) => ({ url: newVideoUrl })),
}))

export default  useVideoUrlStore;