import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const useSaveToMemory = () => {
    const [saved, setSaved] = useState(false);
    const [lastSaved, setLastSaved] = useState<{ key?: string, value?: string }>({ key: undefined, value: undefined });

    const saveToMemory = (key: string, value: string) => (
        AsyncStorage.setItem(key, value).then(
            () => {
                setSaved(true);
                setLastSaved({ key, value });
                setTimeout(() => setSaved(false), 1000);
            }
        )
    );

    return { saved, saveToMemory, lastSaved };
}

export default useSaveToMemory;