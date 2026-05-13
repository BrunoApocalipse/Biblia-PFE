import React, {
  memo,
} from "react";

import {
  Pressable,
  Text,
  View,
} from "react-native";

// =====================================
// TYPES
// =====================================

type Props = {
  verse: number;

  text?: string;

  selected?: boolean;

  compact?: boolean;

  onPress?: () => void;

  onLongPress?: () => void;
};

// =====================================
// COMPONENT
// =====================================

function VerseItem({
  verse,
  text,
  selected = false,
  compact = false,
  onPress,
  onLongPress,
}: Props) {
  // =====================================
  // COMPACT MODE
  // =====================================

  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={
          onLongPress
        }
        android_ripple={{
          color:
            "rgba(255,255,255,0.08)",
        }}
        style={({ pressed }) => ({
          width: 70,

          paddingVertical: 16,

          margin: 6,

          borderRadius: 12,

          alignItems:
            "center",

          backgroundColor:
            pressed
              ? "#1A1A1A"
              : "#111",

          opacity:
            pressed
              ? 0.9
              : 1,
        })}
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
  // READING MODE
  // =====================================

  return (
    <Pressable
      onPress={onPress}
      onLongPress={
        onLongPress
      }
      delayLongPress={180}
      android_ripple={{
        color:
          "rgba(255,255,255,0.05)",
      }}
      style={({ pressed }) => ({
        paddingVertical: 14,

        paddingHorizontal: 14,

        borderRadius: 14,

        marginBottom: 6,

        backgroundColor:
          selected
            ? "#1E1E1E"
            : pressed
            ? "#161616"
            : "#111",

        opacity:
          pressed
            ? 0.96
            : 1,
      })}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {/* VERSE NUMBER */}
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

        {/* VERSE TEXT */}
        <Text
          style={{
            flex: 1,

            color: "#fff",

            fontSize: 16,

            lineHeight: 30,
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

// =====================================
// EXPORT
// =====================================

export default memo(
  VerseItem
);