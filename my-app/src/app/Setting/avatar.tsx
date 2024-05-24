import { Upload } from "lucide-react";
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileAvatar() {
  const [profilePicture, setProfilePicture] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleAvatarClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <button className="w-20 h-20 flex flex-col space-y-1.5 relative group">
      <Avatar
        className="w-20 h-20 cursor-pointer group-hover:opacity-75 transition-opacity duration-100"
        onClick={handleAvatarClick}
      >
        <AvatarImage src={profilePicture} />
        <AvatarFallback>CN</AvatarFallback>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          <Upload color="white" />
        </div>
      </Avatar>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </button>
  );
}
