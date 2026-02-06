import { IconButton } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <IconButton
      aria-label="Go back"
      icon={<ArrowLeft size={20} />}
      variant="ghost"
      onClick={() => router.back()}
      borderRadius={"full"}
      _hover={{
        bg: "brand.500",
        border: "none",
        outline: "none",
      }}
      w={"48px"}
      h={"48px"}
      bg="brand.500"
      color="white"
    />
  );
};

export default BackButton;
