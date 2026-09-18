import { Camera, Mail, MessageCircle, Send } from "lucide-react";

const ICONS = {
  camera: Camera,
  message: MessageCircle,
  send: Send,
  mail: Mail,
};

export default function ChannelIcon({ iconKey, size = 16, className = "" }) {
  const Icon = ICONS[iconKey] || MessageCircle;
  return <Icon size={size} className={className} />;
}
