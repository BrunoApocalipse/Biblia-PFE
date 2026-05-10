import { useRouter } from 'expo-router';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/theme/colors';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AppBottomSheet({ visible, onClose }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="fade">
      
      {/* BACKDROP */}
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-start', // 🔥 agora vem do topo
        }}
        onPress={onClose}
      >
        
        {/* SHEET */}
        <TouchableOpacity activeOpacity={1}>
          <View
            style={{
              backgroundColor: colors.surface || '#111',
              paddingTop: insets.top + 10, // 🔥 respeita status bar
              paddingHorizontal: 20,
              paddingBottom: 20,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              gap: 16,
            }}
          >
            
            {/* TÍTULO */}
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              Opções
            </Text>

            {/* FONTE */}
            <TouchableOpacity
              onPress={() => {
                onClose();
                router.push('/(drawer)/settings');
              }}
            >
              <Text style={{ color: '#fff' }}>Alterar fonte</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>

      </TouchableOpacity>
    </Modal>
  );
}