import { Colors } from "@constants/index";
import { useColorScheme } from "@hooks/index";
import { ReactNode } from "react";
import { Text, TextStyle } from "react-native";

interface Props {
    children: ReactNode,
    style?: TextStyle
}

const ThemedText = ({children, style}: Props) => {
    const ColorScheme = useColorScheme();

    return (<Text style={{color: Colors[ColorScheme ?? 'light'].text,textAlign: 'center', ...style}}>
        {children}
    </Text>)
}

export default ThemedText;