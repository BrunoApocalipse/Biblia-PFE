import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width;

type CarouselProps = {
  data: any[];
  renderItem: any;
  autoPlay?: boolean;
  interval?: number;
};

export default function Carousel({
  data,
  renderItem,
  autoPlay = true,
  interval = 4000,
}: CarouselProps) {
  const ref = useRef<FlatList>(null);

  const [index, setIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // AUTO PLAY ESTÁVEL
  useEffect(() => {
    if (!autoPlay || !data?.length) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (isInteracting) return;

      setIndex((prev) => {
        const next = (prev + 1) % data.length;

        ref.current?.scrollToIndex({
          index: next,
          animated: true,
        });

        return next;
      });
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data, autoPlay, isInteracting, interval]);

  const onScrollBeginDrag = () => {
    setIsInteracting(true);
    if (resumeRef.current) clearTimeout(resumeRef.current);
  };

  const onScrollEndDrag = () => {
    resumeRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  const onMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const newIndex = Math.round(
      e.nativeEvent.contentOffset.x / width
    );
    setIndex(newIndex);
  };

  return (
    <>
      <FlatList
        ref={ref}
        data={data}
        horizontal
        pagingEnabled
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => item.id ?? String(i)}
        getItemLayout={(_, i) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * i,
          index: i,
        })}
        renderItem={renderItem}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />

      <CarouselDots data={data} index={index} />
    </>
  );
}

function CarouselDots({
  data,
  index,
}: {
  data: any[];
  index: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      {data.map((_, i) => (
        <View
          key={i}
          style={{
            width: i === index ? 12 : 6,
            height: 6,
            borderRadius: 3,
            marginHorizontal: 3,
            backgroundColor: i === index ? "#fff" : "#555",
          }}
        />
      ))}
    </View>
  );
}