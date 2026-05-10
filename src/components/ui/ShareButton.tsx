import { Ionicons } from '@expo/vector-icons';
import { Share, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  message: string;
};

export default function ShareButton({ title, message }: Props) {
  const onShare = async () => {
    try {
      await Share.share({
        title,
        message,
      });
    } catch (error) {
      console.log('Erro ao compartilhar:', error);
    }
  };

  return (
    <TouchableOpacity onPress={onShare} style={{ padding: 8 }}>
      <Ionicons name="share-social-outline" size={20} color="#fff" />
    </TouchableOpacity>
  );
}