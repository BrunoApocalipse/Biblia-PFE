import React, { memo } from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";

type Props = {
  verse: number;
  text?: string;
  selected?: boolean;
  compact?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

function VerseItem({
  verse,
  text,
  selected,
  compact,
  onPress,
  onLongPress,
}: Props) {
  // =====================================
  // GRID DE VERSÍCULOS
  // =====================================

  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={
          onLongPress
        }
        style={{
          width: 70,
          paddingVertical: 16,
          margin: 6,
          backgroundColor:
            "#111",
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
          {verse}
        </Text>
      </Pressable>
    );
  }

  // =====================================
  // LEITURA
  // =====================================

  return (
    <Pressable
      onPress={onPress}
      onLongPress={
        onLongPress
      }
      style={{
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        marginBottom: 6,
        backgroundColor:
          selected
            ? "#1E1E1E"
            : "#111",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: selected
              ? "#fff"
              : "#666",

            fontSize: 12,

            marginRight: 8,

            marginTop: 2,

            fontWeight:
              selected
                ? "700"
                : "400",
          }}
        >
          {verse}
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            lineHeight: 28,
            flex: 1,
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(VerseItem);