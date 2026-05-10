import { ReactNode } from "react";
import { View } from "react-native";

import { colors } from "@/constants/theme/colors";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
    >
      {children}
    </View>
  );
}
