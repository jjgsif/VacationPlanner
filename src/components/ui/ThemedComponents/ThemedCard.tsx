import { Colors } from "@constants/index";
import { useColorScheme } from "@hooks/index";
import { Card, CardProps } from "react-native-paper";

const ThemedCard = (props: CardProps) => {
    const ColorScheme = useColorScheme();
    const style: CardProps['style'] =
    {
        backgroundColor: Colors[ColorScheme ?? 'light'].cardBackground,
        width: "80%",
        alignSelf: 'center',
        ...(typeof props.style === 'object' ? props.style : {}),
    };
    return <Card {...props as any} style={style}>
        {props.children}
    </Card>
}

export default ThemedCard;