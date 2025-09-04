import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from "@react-native-async-storage/async-storage/lib/typescript/types";
import { useAppDispatch } from "@store/index";
import { setSlice } from '@store/slices/VacationCountdown';
import { useState } from "react";

const keyActionMap: { [index: string]: Function} = {
    countdown: setSlice
}

const createActions = ([key, value]: KeyValuePair, dispatch: ReturnType<typeof useAppDispatch>) => {
    if (keyActionMap[key] && value) {
        const objectValue = JSON.parse(value);
        dispatch(keyActionMap[key](objectValue))
    }
}

const useLoadFromMemory = (values: string[]): boolean => {
    const [ready, setReady] = useState(false);

    const dispatch = useAppDispatch();

    AsyncStorage.multiGet(values).then(
        (arr) => {
            arr.forEach(
                (v) => createActions(v, dispatch)
            );
            setReady(true);
        }
    );

    return ready;
}

export default useLoadFromMemory;