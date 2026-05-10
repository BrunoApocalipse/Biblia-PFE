import { Pressable, Text } from "react-native";

type Props = {
  name: string;
  abbrev: string;
  onPress: () => void;
};

export default function BookItem({
  name,
  abbrev,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        marginBottom: 8,
        backgroundColor: "#111",
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          color: "#777",
          fontSize: 12,
          marginTop: 2,
        }}
      >
        {abbrev}
      </Text>
    </Pressable>
  );
}