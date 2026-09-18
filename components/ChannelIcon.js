import { Camera, Mail, MessageCircle, Phone, Zap } from "lucide-react";

const ICONS = {
  camera: Camera,
  phone: Phone,
  zap: Zap,
  mail: Mail,
  message: MessageCircle,
};

export default function ChannelIcon({ iconKey, size = 16, className = "" }) {
  const Icon = ICONS[iconKey] || MessageCircle;
  return <Icon size={size} className={className} />;
}
