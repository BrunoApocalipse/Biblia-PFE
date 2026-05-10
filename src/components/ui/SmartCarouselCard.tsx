import { Dimensions, Pressable, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function SmartCarouselCard({
  title,
  subtitle,
  backgroundText,
  onPress,
}: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width,
        height: height * 0.40, // 🔥 AQUI O TAMANHO MAIOR VERTICAL
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      {/* BACKGROUND TEXT (VERSO / NOTE / ETC) */}
      {backgroundText && (
        <Text
          numberOfLines={4}
          style={{
            position: "absolute",
            opacity: 0.08,
            fontSize: 26,
            color: "#fff",
            paddingHorizontal: 20,
          }}
        >
          {backgroundText}
        </Text>
      )}

      {/* CARD PRINCIPAL */}
      <View
        style={{
          backgroundColor: "#111",
          borderRadius: 24,
          padding: 10,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>
          {title}
        </Text>

        {subtitle && (
          <Text
            style={{
              color: "#aaa",
              marginTop: 10,
              fontSize: 14,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
    </Pressable>
  );
}