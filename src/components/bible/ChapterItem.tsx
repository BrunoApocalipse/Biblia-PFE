import { Pressable, Text } from "react-native";

type Props = {
  chapter: number;
  onPress: () => void;
};

export default function ChapterItem({
  chapter,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 70,
        paddingVertical: 16,
        margin: 6,
        backgroundColor: "#111",
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {chapter}
      </Text>
    </Pressable>
  );
}