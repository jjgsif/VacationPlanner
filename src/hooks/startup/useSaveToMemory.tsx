import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const useSaveToMemory = () => {
    const [saved, setSaved] = useState(false);
    const [lastSaved, setLastSaved] = useState<{ key?: string, value?: string } | [key:string, value:string][] | undefined>();

    const saveToMemory = (key: string, value: string, addedCallback?: () => void) => (
        AsyncStorage.setItem(key, value).then(
            () => {
                setSaved(true);
                setLastSaved({ key, value });
                setTimeout(() => {
                    setSaved(false);
                    if (addedCallback) {
                        addedCallback();
                    }
                }, 1000);
            }
        )
    );

    const batchSaveToMemory = (draft: [key:string, value:string][], addedCallback?: () => void) => {
        AsyncStorage.multiSet(draft).then(
            () => {
                setSaved(true);
                setLastSaved(draft);
                setTimeout(() => {
                    setSaved(false);
                    if (addedCallback) {
                        addedCallback();
                    }
                }, 1000);
            }
        )
    }

    return { saved, saveToMemory, batchSaveToMemory, lastSaved };
}

export default useSaveToMemory;