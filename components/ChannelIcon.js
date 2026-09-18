import { Camera, Mail, MessageCircle, Phone } from "lucide-react";

const ICONS = {
  camera: Camera,
  phone: Phone,
  mail: Mail,
  message: MessageCircle,
};

export default function ChannelIcon({ iconKey, size = 16, className = "" }) {
  const Icon = ICONS[iconKey] || MessageCircle;
  return <Icon size={size} className={className} />;
}
