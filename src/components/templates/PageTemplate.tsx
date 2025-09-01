import { Colors } from "@constants/index";
import { StyleProp, useColorScheme, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    content: React.ReactNode;
    containerStyles?: StyleProp<ViewStyle>
    headerShown?: boolean;
    center?: boolean
}


const PageTemplate = ({ content, headerShown, containerStyles, center }: Props) => {

    const ColorScheme = useColorScheme();

    const styles: StyleProp<ViewStyle> = typeof containerStyles == 'object' ?
        {
            backgroundColor: Colors[ColorScheme ?? 'light'].background,
            ...containerStyles,
            height: "100%",
        } :
        {
            backgroundColor: Colors[ColorScheme ?? 'light'].background,
            height: "100%",
        };

    return (!headerShown ?
        <SafeAreaView style={[styles, center ? {display: 'flex', alignContent: 'center', justifyContent: 'center'} : null]}>
            {content}
        </SafeAreaView> :
        <View style={[styles, center ? {display: 'flex', alignContent: 'center', justifyContent: 'center'} : null]}>
            {content}
        </View>
    );
}

export default PageTemplate;