import { useUserInfoContext } from "@/context/users/userInfoContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogOut = async () => {
  const res = await axios.post( `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/logout`, {}, { withCredentials: true }
  );
  return res.data;
};

export const useLogOut = () => {
    const CurentPath = usePathname()
    const router = useRouter()
    const { ClientLogout } = useUserInfoContext()
  return useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      ClientLogout();
      toast.success("Logged out successfully");
      if(CurentPath == '/global/user/portfolio') {
        router.push('/global/home');
      }
    },
    onError: (err) => {
      toast.error("Error logging out");
    },
  });
};
