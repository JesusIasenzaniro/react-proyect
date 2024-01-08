import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface BnpStoreSate {
    accessToken: string | null;
    setAccessToken: (t: string | null) => void;
    azureToken: string | null;
    setAzureToken: (t: string | null) => void;
    bnpUserRol: string | null;
    setBnpUserRol: (t: string | null) => void;
    dqrUserRol: string | null;
    setDqrUserRol: (t: string | null) => void;
}

export const useStore = create<BnpStoreSate>()(
    devtools(
        persist(
            (set) => ({
                accessToken: null,
                setAccessToken: (t) => set(() => ({ accessToken: t })),
                azureToken: null,
                setAzureToken: (t) => set(() => ({ azureToken: t })),
                bnpUserRol: null,
                setBnpUserRol: (t) => set(() => ({ bnpUserRol: t })),
                dqrUserRol: null,
                setDqrUserRol: (t) => set(() => ({ dqrUserRol: t })),
            }),
            {
                name: 'storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
